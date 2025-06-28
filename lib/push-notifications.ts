// Push notification service for web browsers
// This provides the foundation for web push notifications

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  // Check if push notifications are supported
  public isSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  // Get current permission status
  public getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }

  // Request permission for notifications
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error('Push notifications are not supported in this browser');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Register service worker
  public async registerServiceWorker(): Promise<ServiceWorkerRegistration> {
    if (!this.isSupported()) {
      throw new Error('Service workers are not supported in this browser');
    }

    if (!this.registration) {
      this.registration = await navigator.serviceWorker.register('/sw.js');
    }

    return this.registration;
  }

  // Subscribe to push notifications
  public async subscribe(vapidPublicKey: string): Promise<PushSubscription> {
    if (!this.isSupported()) {
      throw new Error('Push notifications are not supported');
    }

    // Ensure we have permission
    const permission = await this.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Push notification permission not granted');
    }

    // Register service worker
    const registration = await this.registerServiceWorker();

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
    });

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: this.arrayBufferToBase64(subscription.getKey('p256dh')!),
        auth: this.arrayBufferToBase64(subscription.getKey('auth')!),
      },
    };
  }

  // Unsubscribe from push notifications
  public async unsubscribe(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    const subscription = await this.registration.pushManager.getSubscription();
    if (subscription) {
      return await subscription.unsubscribe();
    }

    return false;
  }

  // Get current subscription
  public async getSubscription(): Promise<PushSubscription | null> {
    if (!this.registration) {
      return null;
    }

    const subscription = await this.registration.pushManager.getSubscription();
    if (!subscription) {
      return null;
    }

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: this.arrayBufferToBase64(subscription.getKey('p256dh')!),
        auth: this.arrayBufferToBase64(subscription.getKey('auth')!),
      },
    };
  }

  // Helper functions
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return window.btoa(binary);
  }
}

// Hook for React components
export function usePushNotifications() {
  const pushService = PushNotificationService.getInstance();

  return {
    isSupported: pushService.isSupported(),
    getPermissionStatus: () => pushService.getPermissionStatus(),
    requestPermission: () => pushService.requestPermission(),
    subscribe: (vapidKey: string) => pushService.subscribe(vapidKey),
    unsubscribe: () => pushService.unsubscribe(),
    getSubscription: () => pushService.getSubscription(),
  };
}
