'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRunning,
  faCoins,
  faUsersRectangle,
  faStar,
  faCheck,
  faTimes,
  faDownload,
  faArrowRight,
  faChevronRight,
  faBars,
  faXmark,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { Footer } from '@/app/components/Footer';
import { NewsletterSubscription } from '@/components/ui/newsletter-subscription';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: downloadRef, inView: downloadInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToSection = useSmoothScroll();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <motion.div variants={logoVariants} initial="hidden" animate="visible">
              <Image
                src="/images/logo.png"
                alt="Movin Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-[#0095ff]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Movin
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {['Features', 'Pricing', 'Download', 'Blog', 'Lightpaper'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
                whileHover={{ y: -2 }}
              >
                {item === 'Lightpaper' ? (
                  <Link
                    href="/lightpaper"
                    className="text-sm font-medium transition-colors hover:text-[#0095ff]"
                  >
                    {item}
                  </Link>
                ) : item === 'Blog' ? (
                  <Link
                    href="/blog"
                    className="text-sm font-medium transition-colors hover:text-[#0095ff]"
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium transition-colors hover:text-[#0095ff]"
                    onClick={(e) => scrollToSection(e, item.toLowerCase())}
                  >
                    {item}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="https://app.getmovin.ai">
                <Button size="sm" className="bg-[#0095ff] hover:bg-[#0080e0]">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 px-4 space-y-4 bg-background border-t">
              {['Features', 'Pricing', 'Download', 'Blog', 'Lightpaper'].map((item) => (
                <div key={item} className="py-2">
                  {item === 'Lightpaper' ? (
                    <Link
                      href="/lightpaper"
                      className="block text-base font-medium transition-colors hover:text-[#0095ff]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ) : item === 'Blog' ? (
                    <Link
                      href="/blog"
                      className="block text-base font-medium transition-colors hover:text-[#0095ff]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ) : (
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="block text-base font-medium transition-colors hover:text-[#0095ff]"
                      onClick={(e) => {
                        scrollToSection(e, item.toLowerCase());
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]"
                >
                  Track your lifestyle in less than 1 minute
                </motion.div>
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.8 }}
                    >
                      Movin – Your Effort Counts
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    Track your meals, workouts, and activities in a blink of an eye, while earning
                    MVN tokens for every healthy habit achievement, everything powered by AI.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0, type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="https://app.getmovin.ai">
                      <Button size="lg" className="gap-1.5 bg-[#0095ff] hover:bg-[#0080e0]">
                        Start Earning <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-1.5 border-[#0095ff] text-[#0095ff]"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(e as any, 'features');
                      }}
                    >
                      Learn More <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
                {/* <motion.div
                  className="flex items-center gap-4 text-sm"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-[#0095ff] fill-[#0095ff]" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium">4.9/5</span> from over 2,000 reviews
                  </div>
                </motion.div> */}
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.7,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
              >
                <motion.div
                  className="relative h-[600px] w-[280px] overflow-hidden rounded-[40px] border-[8px] border-muted bg-background shadow-xl"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Image
                    src="/images/header-img.png"
                    alt="App Interface"
                    width={234}
                    height={484}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          ref={featuresRef}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={featuresInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  AI-Powered Quick Tracking
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Track Everything in Under 1 Minute
                </h2>
                <p className="mx-auto max-w-[1100px] text-muted-foreground md:text-xl/relaxed">
                  Log meals, workouts, and steps in less than 60 seconds. Tap once to record your
                  workout or steps—activity tracking takes less than a minute. Earn 1 MVN per 1,000
                  steps; stake tokens up to 24 months for 24% APY. Referral bonuses, social sharing
                  and more.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: 'AI Meal & Workout Tracking',
                  description:
                    'Our AI meal tracker logs your meals in < 1 minute—just snap a photo or enter a quick text description. Auto-generate personalized meal & workout plans.',
                  icon: <FontAwesomeIcon icon={faRunning} className="h-8 w-8 text-[#0095ff]" />,
                },
                {
                  title: 'Rewards & Staking',
                  description:
                    'Earn MVN tokens for your steps, METs and nutrition score. Stake tokens up to 24 months for 24% APY. Refer and earn.',
                  icon: <FontAwesomeIcon icon={faCoins} className="h-8 w-8 text-[#0095ff]" />,
                },
                {
                  title: 'Sharing and Competing',
                  description:
                    'Share your progress with friends, compete, and join a team with a partner to earn even more tokens.',
                  icon: (
                    <FontAwesomeIcon icon={faUsersRectangle} className="h-8 w-8 text-[#0095ff]" />
                  ),
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm min-h-[280px]"
                  initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={
                    featuresInView
                      ? { x: 0, opacity: 1 }
                      : { x: i % 2 === 0 ? -100 : 100, opacity: 0 }
                  }
                  transition={{
                    delay: i * 0.2,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 149, 255, 0.1)' }}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f4ff] dark:bg-[#0095ff]/10"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
                <p className="mx-auto max-w-[1100px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied users who are earning while staying fit
                </p>
              </div>
            </div>

            <div className="mt-12 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 px-4 -mx-4 md:px-0 md:mx-0">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="snap-center shrink-0 scroll-mx-4 first:pl-4 last:pr-4 w-[85%] md:w-full max-w-md rounded-xl border bg-background p-6 shadow-sm"
                  initial={{ x: 100 * i, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * i, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 149, 255, 0.1)" }}
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=User${i}`}
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="grid gap-1">
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Fitness Enthusiast</p>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <FontAwesomeIcon key={j} icon={faStar} className="h-4 w-4 fill-[#0095ff] text-[#0095ff]" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "I've been using Movin for 3 months and have earned over 1000 MVN tokens just by maintaining my regular
                    running routine. The app is intuitive and the rewards are real!"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Choose Your Plan
                </h2>
                <p className="mx-auto max-w-[1100px] text-muted-foreground md:text-xl/relaxed">
                  Unlock premium features to maximize your earnings and fitness journey
                </p>
              </div>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <motion.div
                className="relative flex flex-col rounded-xl border p-6 shadow-sm"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 149, 255, 0.1)' }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff]">
                    Basic
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">0 MVN</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
                <ul className="mb-8 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Basic step tracking (up to 30,000 steps daily)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Earn MVN tokens for activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Staking up to 12 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Referral program (1 MVN bonus for both parties + 1% rewards)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Import from fitness tracker</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                    />
                    <span>Contains ads</span>
                  </li>
                </ul>
                <Button className="mt-auto w-full bg-[#0095ff] hover:bg-[#0080e0]">
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                className="relative flex flex-col rounded-xl border-2 border-[#0095ff] p-6 shadow-lg"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 149, 255, 0.2)' }}
              >
                <div className="absolute -top-4 right-4 rounded-full bg-[#0095ff] px-3 py-1 text-xs font-semibold text-white">
                  RECOMMENDED
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff]">
                    Advanced
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">100 MVN</span>
                  <span className="text-muted-foreground">/month</span>
                  <p className="text-sm text-muted-foreground">or 1000 MVN/year (save 16%)</p>
                </div>
                <ul className="mb-8 space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Everything in Free plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Premium step tracking (up to 30,000 steps daily)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>MET tracking</strong> (up to 500 METs daily) and advanced fitness
                      metrics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Ad-free</strong> experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>24% APY</strong> staking for 2 years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Access to maps & route tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Friend sync for joint exercises (soon)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Nutrition score rewards for meal tracking with photo proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>AI-powered meal & workout planners (Q4 2025)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Meal tracking with natural language & camera AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                    />
                    <span>Workout tracking with progress</span>
                  </li>
                </ul>
                <Link href="https://app.getmovin.ai">
                  <Button className="mt-auto w-full bg-[#0095ff] hover:bg-[#0080e0]">
                    Upgrade Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Browser App Section */}
        <section
          id="download"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f9ff] dark:bg-[#0095ff]/5"
          ref={downloadRef}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                    Try Web App
                  </div>
                  <Link href="https://app.getmovin.ai">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Start Earning Today
                    </h2>
                  </Link>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Experience Movin in your browser and transform your daily movement into
                    cryptocurrency rewards. Mobile apps coming soon!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="https://app.getmovin.ai" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="w-full gap-1.5 min-[400px]:w-auto bg-[#0095ff] hover:bg-[#0080e0]"
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
                      Try Web App
                    </Button>
                  </Link>
                  <Link href="#features" onClick={(e) => scrollToSection(e as any, 'features')}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-1.5 min-[400px]:w-auto border-[#0095ff] text-[#0095ff]"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4 text-[#0095ff]" />
                  <span className="text-muted-foreground">
                    Works on any device with a modern browser
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <div className="relative h-[600px] w-[280px] overflow-hidden rounded-[40px] border-[8px] border-muted bg-background shadow-xl">
                  <Image
                    src="/images/download-img.png"
                    alt="App Stats Screen"
                    width={234}
                    height={484}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#f8fcff] to-[#e6f4ff] dark:from-[#0a0a0a] dark:to-[#0095ff]/5">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <NewsletterSubscription
                title="Join the Movin Community"
                description="Stay ahead of the curve with exclusive insights, product updates, and the latest developments in fitness technology and web3 innovation. Plus, be the first to know about new features and community events!"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer onSectionClick={scrollToSection} animate={true} />
    </div>
  );
}
