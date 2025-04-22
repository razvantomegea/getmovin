import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons"

type FooterProps = {
  onSectionClick?: (e: React.MouseEvent<HTMLAnchorElement>, section: string) => void
  animate?: boolean
}

export function Footer({ onSectionClick, animate = false }: FooterProps) {
  const navItems = [
    { href: "/#features", label: "Features", section: "features" },
    // { href: "/#testimonials", label: "Testimonials", section: "testimonials" },
    { href: "/#pricing", label: "Pricing", section: "pricing" },
    { href: "/#download", label: "Download", section: "download" },
    { href: "/lightpaper", label: "Lightpaper", section: null },
  ]

  const Container = animate ? motion.div : "div"

  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <Container
        className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6"
        {...(animate
          ? {
              initial: { y: 50, opacity: 0 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true },
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }
          : {})}
      >
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Movin Logo" width={32} height={32} className="rounded-md" />
          <span className="text-xl font-bold text-[#0095ff]">Movin</span>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-[#0095ff]"
              onClick={item.section && onSectionClick ? (e) => onSectionClick(e, item.section) : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="https://x.com/lifestylemanrt" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5 text-[#0095ff]" />
            <span className="sr-only">X</span>
          </Link>
          <Link href="https://github.com/razvantomegea" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="h-5 w-5 text-[#0095ff]" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://t.me/getmovinai" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} className="h-5 w-5 text-[#0095ff]" />
            <span className="sr-only">Telegram</span>
          </Link>
        </div>
      </Container>
      
      <div className="container mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Movin. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
} 