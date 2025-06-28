'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowLeft, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { Footer } from '@/app/components/Footer';

export default function LightpaperPage() {
  const sections = [
    { id: 'overview', title: 'Project Overview' },
    { id: 'problem', title: 'Problem & Solution' },
    { id: 'features', title: 'Features & Benefits' },
    { id: 'pricing', title: 'Pricing' },
    { id: 'tokenomics', title: 'Tokenomics' },
    { id: 'technical', title: 'Smart Contract Architecture' },
    { id: 'roadmap', title: 'Roadmap' },
    { id: 'team', title: 'Team' },
    { id: 'contact', title: 'Get Involved' },
  ];

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
    hidden: { x: -50, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const scrollToSection = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if there's a hash in the URL when the page loads
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from the hash
        const id = hash.substring(1);

        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    }
  }, []);

  // Add a debug check to verify section IDs

  useEffect(() => {
    // Debug check to verify all section IDs exist
    if (process.env.NODE_ENV === 'development') {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) {
          console.warn(`Section with ID "${section.id}" not found in the DOM`);
        }
      });
    }
  }, [sections]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Movin Logo"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="text-xl font-bold text-[#0095ff]">Movin</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden [@media(min-width:1100px)]:flex gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/lightpaper/#${section.id}`}
                  className="text-sm font-medium transition-colors hover:text-[#0095ff]"
                  onClick={(e) => scrollToSection(e, section.id)}
                >
                  {section.title}
                </Link>
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
              <Link href="/">
                <Button size="sm" className="gap-1.5">
                  <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="[@media(min-width:1100px)]:hidden">
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
            className="[@media(min-width:1100px)]:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 px-4 space-y-4 bg-background border-t">
              {sections.map((section) => (
                <div key={section.id} className="py-2">
                  <Link
                    href={`/lightpaper/#${section.id}`}
                    className="block text-base font-medium transition-colors hover:text-[#0095ff]"
                    onClick={(e) => {
                      scrollToSection(e, section.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {section.title}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1 overflow-x-hidden">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f0f9ff] dark:bg-[#0095ff]/5">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                Official Documentation
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Movin Lightpaper
              </h1>
              <p className="max-w-[1100px] text-muted-foreground md:text-xl">
                The comprehensive guide to our move-to-earn ecosystem on Base
              </p>
            </motion.div>
          </div>
        </section>

        <section id="overview" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  01
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Project Overview
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-4">
                <p className="text-muted-foreground md:text-lg">
                  Movin is a revolutionary move-to-earn application built on the Base Layer-2 chain
                  of Ethereum that rewards users for their physical activity. Our mission is to
                  promote healthier lifestyles by incentivizing regular exercise through
                  cryptocurrency rewards.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  By converting steps and metabolic equivalent of task (METs) into MVN tokens, we
                  create a sustainable ecosystem where fitness and financial rewards go hand in
                  hand. Our vision is to build a global community of health-conscious individuals
                  who are motivated to stay active and earn rewards simultaneously.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="problem" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  02
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Problem & Solution
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">The Problem</h3>
                  <p className="text-muted-foreground md:text-lg">
                    Despite knowing the benefits of regular physical activity, many people struggle
                    to maintain consistent exercise habits. Traditional fitness apps lack compelling
                    incentives to keep users engaged long-term, leading to high dropout rates and
                    abandoned fitness goals.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Our Solution</h3>
                  <p className="text-muted-foreground md:text-lg">
                    Movin transforms the fitness experience by introducing tangible, financial
                    rewards for physical activity. By leveraging blockchain technology, we create a
                    transparent, secure system where users earn MVN tokens for their steps and
                    metabolic activity. This creates a powerful incentive loop that encourages
                    consistent exercise habits.
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    Our app includes sophisticated verification mechanisms to ensure rewards are
                    earned through genuine physical activity, maintaining the integrity of our
                    ecosystem while promoting healthier lifestyles.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  03
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Features & Benefits
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Step Tracking & Rewards</h3>
                    <p className="text-muted-foreground">
                      Earn MVN tokens for your daily steps—any positive number of steps is rewarded,
                      up to a maximum of 30,000 steps per day. Rate limited to 300 steps per minute
                      to ensure fair play.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Staking Rewards</h3>
                    <p className="text-muted-foreground">
                      Stake and lock your MVN tokens for up to 24 months to earn 24% APY. Lock
                      periods of 1, 3, 6, 12, and 24 months are available, each with corresponding
                      multipliers.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Premium Integration</h3>
                    <p className="text-muted-foreground">
                      Premium users can track METs (Metabolic Equivalent of Task) with any positive
                      METs rewarded, up to a maximum of 500 METs daily, rate limited to 5 METs per
                      minute, for additional rewards. Premium users also benefit from a higher daily
                      METs cap.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Referral Program</h3>
                    <p className="text-muted-foreground">
                      Both referrer and referee receive 1 MVN token upon successful registration.
                      Additionally, referrers earn 1% of referred users' activity rewards
                      automatically when they claim. Referrers can have multiple referees, but each
                      referee can only have one referrer.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Additional Features</h3>
                  <p className="text-muted-foreground md:text-lg">
                    Our comprehensive roadmap (see Roadmap section) outlines the planned release of
                    additional features including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground md:text-lg">
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Enhanced rewards and gamification systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Expanded ecosystem integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Advanced fitness tracking analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Personalized fitness recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>AI based calorie tracking</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  04
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Subscription Plans
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <p className="text-muted-foreground md:text-lg">
                  Movin offers both free and premium subscription options to cater to different user
                  needs. While all users can earn MVN tokens through physical activity, premium
                  subscribers unlock additional features and benefits.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Free Plan</h3>
                      <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-xs text-[#0095ff]">
                        Basic
                      </div>
                    </div>
                    <div className="text-2xl font-bold">0 MVN</div>
                    <p className="text-muted-foreground">/forever</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Basic step tracking (up to 30,000 steps daily)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Earn MVN tokens for activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Staking options up to 12 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Referral program (1 MVN bonus for both parties + 1% rewards)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Import activity from fitness tracker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                        />
                        <span>Contains advertisements</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 rounded-lg border-2 border-[#0095ff] p-6 shadow-md relative">
                    <div className="absolute -top-3 right-4 rounded-full bg-[#0095ff] px-3 py-1 text-xs font-semibold text-white">
                      RECOMMENDED
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Premium Plan</h3>
                      <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-xs text-[#0095ff]">
                        Advanced
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100 MVN/month</div>
                      <div className="text-sm text-muted-foreground">
                        or 1000 MVN/year (save 16%)
                      </div>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Everything in Free plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Premium step tracking (up to 30,000 steps daily)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>
                          <strong>MET tracking</strong> (up to 500 METs daily)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>
                          <strong>Ad-free</strong> experience
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>
                          Exclusive 24-month staking with <strong>24% APY</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Access to maps and route tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>Friend sync for joint exercises (soon)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                        />
                        <span>AI based calorie tracking (soon)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-[#e6f4ff]/50">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Premium subscribers enjoy significantly higher earning
                    potential through the exclusive 24-month staking option with 24% APY, as well as
                    enhanced activity tracking through third-party integrations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="tokenomics" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  05
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Tokenomics
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">MVN Token</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4 shadow-sm">
                      <div className="text-2xl font-bold text-[#0095ff]">1 Trillion</div>
                      <div className="text-sm text-muted-foreground">Maximum Supply</div>
                    </div>
                    <div className="rounded-lg border p-4 shadow-sm">
                      <div className="text-2xl font-bold text-[#0095ff]">11 Billion</div>
                      <div className="text-sm text-muted-foreground">Initial Supply</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground md:text-lg">
                    The MVN token is built on the ERC20 standard with pausable functionality for
                    emergency situations. It supports minting and burning operations, and includes a
                    token locking mechanism allowing users to lock their tokens for a specified
                    duration.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Reward System</h3>
                  <div className="space-y-2 text-muted-foreground md:text-lg">
                    <p>
                      <span className="font-semibold">Step Rewards:</span> 1 MVN token per 10,000
                      steps at launch. Any positive steps are rewarded, up to a daily cap of 30,000
                      steps. Per-minute (300 steps/min) and daily caps remain enforced. Rewards
                      rates decrease by 0.1% daily, compounded.
                    </p>
                    <p>
                      <span className="font-semibold">MET Rewards:</span> Earn MVN tokens from
                      metabolic activity. Any positive METs are rewarded, up to a daily cap of 500
                      METs. Per-minute (5 METs/min) and daily caps remain enforced. Rewards rates
                      decrease by 0.1% daily, compounded.
                    </p>
                    <p>
                      <span className="font-semibold">Reward Rate Decrease:</span> Base reward rates
                      decrease by 0.1% daily, compounded, to maintain long-term sustainability of
                      the token economy.
                    </p>
                    <p>
                      <span className="font-semibold">Rewards Expiration:</span> Activity rewards
                      reset at midnight (00:00 am) daily. Any unclaimed activity rewards from the
                      previous day are lost. Additionally, staking rewards expire after 24 hours
                      since the last rewards were claimed.
                    </p>
                    <p>
                      <span className="font-semibold">Unstaking Fee:</span> A 1% burn fee applies to
                      all unstaking operations. This mechanism helps maintain token scarcity and
                      rewards long-term holders.
                    </p>
                    <p>
                      <span className="font-semibold">Subscription Burning:</span> Premium
                      subscription payments (100 MVN monthly or 1000 MVN yearly) are burned,
                      permanently removing these tokens from circulation to create deflationary
                      pressure and maintain the token's value over time.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Staking</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left">Lock Period</th>
                          <th className="py-2 text-left">Multiplier</th>
                          <th className="py-2 text-left">Availability</th>
                          <th className="py-2 text-left">APY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">1 Month</td>
                          <td className="py-2">1x</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">4%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">3 Months</td>
                          <td className="py-2">3x</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">8%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">6 Months</td>
                          <td className="py-2">6x</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">12%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">12 Months</td>
                          <td className="py-2">12x</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">18%</td>
                        </tr>
                        <tr>
                          <td className="py-2">24 Months</td>
                          <td className="py-2">24x</td>
                          <td className="py-2">Premium Users Only</td>
                          <td className="py-2 font-bold text-[#0095ff]">24%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground md:text-lg">
                    Staking rewards are calculated based on: stake amount × APR × time staked. Users
                    can have multiple stakes with different lock periods and can claim rewards
                    individually or all at once.
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    After a stake's lock period ends, users can choose to restake their tokens into
                    a new lock period without paying the 1% unstaking fee. This encourages long-term
                    participation while providing flexibility to adjust staking strategy when lock
                    periods expire.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Technical Implementation</h3>
                  <p className="text-muted-foreground md:text-lg">
                    MOVINEarn smart contract implements a comprehensive system with security
                    features including ReentrancyGuard protection, pausable functionality, and
                    Ownable2Step for secure ownership management. The contract employs the UUPS
                    pattern for upgradeability with proper storage management.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="technical" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  06
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Smart Contract Architecture
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <p className="text-muted-foreground md:text-lg">
                  The MOVINEarn smart contract implements a sophisticated token-based rewards system
                  with multiple integrated components working together to create a secure and
                  sustainable ecosystem.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Core Components</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                      <h3 className="font-bold">Token System</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>ERC20 standard with pausable functionality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>Supports minting and burning operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>Token locking mechanism for specified durations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>
                            Deflationary design with multiple burning mechanisms: unstaking fee
                            (1%), premium subscription payments
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                      <h3 className="font-bold">Activity System</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>Rate-limited step and MET tracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>Daily reset based on activity timestamp</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                          />
                          <span>Decreasing reward rates to maintain longevity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Technical Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left">Parameter</th>
                          <th className="py-2 text-left">Value</th>
                          <th className="py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">STEPS_THRESHOLD</td>
                          <td className="py-2">N/A</td>
                          <td className="py-2">No minimum steps required for rewards</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">PREMIUM_STEPS_THRESHOLD</td>
                          <td className="py-2">N/A</td>
                          <td className="py-2">
                            No minimum steps required for rewards (premium users)
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">METS_THRESHOLD</td>
                          <td className="py-2">N/A</td>
                          <td className="py-2">No minimum METs required for rewards</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">PREMIUM_METS_THRESHOLD</td>
                          <td className="py-2">N/A</td>
                          <td className="py-2">
                            No minimum METs required for rewards (premium users)
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">MAX_DAILY_STEPS</td>
                          <td className="py-2">30,000</td>
                          <td className="py-2">Maximum daily steps for rewards</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">MAX_DAILY_METS</td>
                          <td className="py-2">500</td>
                          <td className="py-2">Maximum daily METs for rewards</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">MAX_STEPS_PER_MINUTE</td>
                          <td className="py-2">300</td>
                          <td className="py-2">Rate limit for step tracking</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">MAX_METS_PER_MINUTE</td>
                          <td className="py-2">5</td>
                          <td className="py-2">Rate limit for MET tracking</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">UNSTAKE_BURN_FEES_PERCENT</td>
                          <td className="py-2">1%</td>
                          <td className="py-2">Fee applied when unstaking</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">REFERRAL_BONUS_PERCENT</td>
                          <td className="py-2">1%</td>
                          <td className="py-2">Bonus for referrers</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">REFERRAL_REGISTRATION_BONUS</td>
                          <td className="py-2">1 MVN</td>
                          <td className="py-2">
                            Bonus for both referrer and referee upon registration
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">HALVING_DECREASE_PERCENT</td>
                          <td className="py-2">0.1%</td>
                          <td className="py-2">Daily reward rate decrease</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">ACTIVITY_REWARDS_EXPIRATION</td>
                          <td className="py-2">00:00 am</td>
                          <td className="py-2">Daily reset time for activity rewards</td>
                        </tr>
                        <tr>
                          <td className="py-2">STAKING_REWARDS_EXPIRATION</td>
                          <td className="py-2">24 hours</td>
                          <td className="py-2">
                            Time after last claim when staking rewards expire
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Security Features</h3>
                  <ul className="space-y-2 text-muted-foreground md:text-lg">
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>ReentrancyGuard protection on critical functions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Pausable functionality for emergency situations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Ownable2Step for secure ownership management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>Input validation and rate limiting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5"
                      />
                      <span>UUPS pattern for secure contract upgradeability</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  07
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Roadmap</h2>
              </motion.div>
              <motion.div
                variants={item}
                className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-[2px] before:bg-[#0095ff]/20"
              >
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q1-Q2 2025: MVP Launch</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>✓ MVN contracts launch on the Base Layer-2 chain of Ethereum</li>
                    <li>✓ Core step and METs tracking functionality</li>
                    <li>✓ Basic staking mechanisms implementation</li>
                    <li>✓ Import activity from fitness tracker</li>
                    <li>✓ Referral program</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q3-Q4 2025: Social Feed Features</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>✓ Location and route tracking with interactive maps</li>
                    <li>✓ Achievement badges and milestone rewards</li>
                    <li>✓ AI based calorie tracking</li>
                    <li>App launch on Apple Store and Google Play</li>
                    <li>Public token listing on Uniswap, Gate.io, and Base</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q1 2026: Advanced Geolocation Features</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Friend sync for joint exercises and shared rewards</li>
                    <li>Social feed for sharing achievements</li>
                    <li>Enhanced social interactions and activity sharing</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q2 2026: Gamified Experience</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Community challenges with special rewards</li>
                    <li>Goal setting and tracking</li>
                    <li>Group activity tracking and leaderboards</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q3 2026: AI Integration</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>AI based personalized fitness recommendations</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q4 2026: Borrowing</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Ability to borrow MVN tokens from the protocol</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">2027: Partnerships</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Partnerships with fitness brands and organizations</li>
                    <li>MVN token listing on more exchanges</li>
                    <li>More features and integrations</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  08
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Team</h2>
              </motion.div>
              <motion.div variants={item} className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    name: 'Razvan Tomegea',
                    role: 'Founder & Core Developer',
                    bio: 'Blockchain developer and entrepreneur based in Romania. Passionate about fitness and technology, with 11 years of experience.',
                    linkedin: 'https://www.linkedin.com/in/razvantomegea/',
                  },
                  {
                    name: 'AI',
                    role: 'Core Developer Assistant',
                    bio: 'Advanced AI system that helps with development, user assistance, and data analysis to optimize the Movin experience.',
                    avatar: '/images/robot.png',
                  },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
                  >
                    <Image
                      src={member.avatar || '/images/avatar.png'}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-[#0095ff]">{member.role}</p>
                      <p className="mt-2 text-muted-foreground">{member.bio}</p>
                      {member.linkedin && (
                        <div className="mt-3">
                          <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0095ff] hover:underline"
                          >
                            LinkedIn Profile
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-[#e6f4ff] px-3 py-1 text-sm text-[#0095ff] dark:bg-[#0095ff]/10 dark:text-[#0095ff]">
                  09
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Get Involved
                </h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <p className="text-muted-foreground md:text-lg">
                  Join our growing community of fitness enthusiasts and crypto believers. There are
                  many ways to get involved with the Movin ecosystem:
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Use Web App</h3>
                    <p className="text-muted-foreground">
                      The simplest way to join is to use our web app and start earning MVN tokens
                      through your daily activity.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="https://app.getmovin.ai">
                        <Button className="bg-[#0095ff] hover:bg-[#0080e0]">Try Web App</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Invest & Stake</h3>
                    <p className="text-muted-foreground">
                      Acquire MVN tokens and participate in our staking program to earn passive
                      rewards while supporting the ecosystem.
                    </p>
                    <Button
                      onClick={() =>
                        window.open('https://app.uniswap.org/positions/v4/base/40814', '_blank')
                      }
                      className="bg-[#0095ff] hover:bg-[#0080e0]"
                    >
                      Get MVN tokens
                    </Button>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Community</h3>
                    <p className="text-muted-foreground">
                      Join our vibrant community on social media platforms to stay updated and
                      connect with other users.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="https://t.me/getmovinai"
                        className="text-[#0095ff] hover:underline"
                      >
                        Telegram
                      </Link>
                      <Link
                        href="https://discord.gg/qv934WsH"
                        className="text-[#0095ff] hover:underline"
                      >
                        Discord
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Contact Us</h3>
                    <p className="text-muted-foreground">
                      Have questions or partnership inquiries? Reach out to our team directly.
                    </p>
                    <Link
                      href="mailto:contact@getmovin.ai"
                      className="text-[#0095ff] hover:underline"
                    >
                      contact@getmovin.ai
                    </Link>
                  </div>
                </div>
                {/* <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Download & Use</h3>
                    <p className="text-muted-foreground">
                      The simplest way to join is to download our app and start earning MVN tokens through your daily
                      activity.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-[#0095ff] hover:bg-[#0080e0]">App Store</Button>
                      <Button className="bg-[#0095ff] hover:bg-[#0080e0]">Google Play</Button>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Invest & Stake</h3>
                    <p className="text-muted-foreground">
                      Acquire MVN tokens and participate in our staking program to earn passive rewards while supporting
                      the ecosystem.
                    </p>
                    <Button onClick={() => window.open("https://app.uniswap.org/positions/v4/base/40814", "_blank")} className="bg-[#0095ff] hover:bg-[#0080e0]">Get MVN tokens</Button>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Community</h3>
                    <p className="text-muted-foreground">
                      Join our vibrant community on social media platforms to stay updated and connect with other users.
                    </p>
                    <div className="flex gap-4">
                      <Link href="https://t.me/getmovinai" className="text-[#0095ff] hover:underline">
                        Telegram
                      </Link>
                      <Link href="https://discord.gg/qv934WsH" className="text-[#0095ff] hover:underline">
                        Discord
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Contact Us</h3>
                    <p className="text-muted-foreground">
                      Have questions or partnership inquiries? Reach out to our team directly.
                    </p>
                    <Link href="mailto:contact@getmovin.ai" className="text-[#0095ff] hover:underline">
                      contact@getmovin.ai
                    </Link>
                  </div>
                </div> */}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
