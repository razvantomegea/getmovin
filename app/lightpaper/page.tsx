"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { useEffect } from "react"
import { Footer } from "@/app/components/Footer"

export default function LightpaperPage() {
  const sections = [
    { id: "overview", title: "Project Overview" },
    { id: "problem", title: "Problem & Solution" },
    { id: "features", title: "Features & Benefits" },
    { id: "pricing", title: "Pricing" },
    { id: "tokenomics", title: "Tokenomics" },
    { id: "roadmap", title: "Roadmap" },
    { id: "team", title: "Team" },
    { id: "contact", title: "Get Involved" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { x: -50, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  }

  const scrollToSection = useSmoothScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if there's a hash in the URL when the page loads
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        // Remove the # from the hash
        const id = hash.substring(1)

        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const element = document.getElementById(id)
          if (element) {
            const headerHeight = document.querySelector("header")?.offsetHeight || 0
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }
        }, 100)
      }
    }
  }, [])

  // Add a debug check to verify section IDs

  useEffect(() => {
    // Debug check to verify all section IDs exist
    if (process.env.NODE_ENV === "development") {
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (!element) {
          console.warn(`Section with ID "${section.id}" not found in the DOM`)
        }
      })
    }
  }, [sections])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.png" alt="Movin Logo" width={32} height={32} className="rounded-md" />
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
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
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
              transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/">
                <Button size="sm" className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="[@media(min-width:1100px)]:hidden">
              <Button variant="ghost" size="sm" className="p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="[@media(min-width:1100px)]:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
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
                      scrollToSection(e, section.id)
                      setMobileMenuOpen(false)
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Movin Lightpaper</h1>
              <p className="max-w-[1100px] text-muted-foreground md:text-xl">
                The comprehensive guide to our move-to-earn ecosystem on Ethereum
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Project Overview</h2>
              </motion.div>
              <motion.div variants={item} className="space-y-4">
                <p className="text-muted-foreground md:text-lg">
                  Movin is a revolutionary move-to-earn application built on the Ethereum blockchain that rewards users
                  for their physical activity. Our mission is to promote healthier lifestyles by incentivizing regular
                  exercise through cryptocurrency rewards.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  By converting steps and metabolic equivalent of task (METs) into MVN tokens, we create a sustainable
                  ecosystem where fitness and financial rewards go hand in hand. Our vision is to build a global
                  community of health-conscious individuals who are motivated to stay active and earn rewards
                  simultaneously.
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Problem & Solution</h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">The Problem</h3>
                  <p className="text-muted-foreground md:text-lg">
                    Despite knowing the benefits of regular physical activity, many people struggle to maintain
                    consistent exercise habits. Traditional fitness apps lack compelling incentives to keep users
                    engaged long-term, leading to high dropout rates and abandoned fitness goals.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Our Solution</h3>
                  <p className="text-muted-foreground md:text-lg">
                    Movin transforms the fitness experience by introducing tangible, financial rewards for physical
                    activity. By leveraging blockchain technology, we create a transparent, secure system where users
                    earn MVN tokens for their steps and metabolic activity. This creates a powerful incentive loop that
                    encourages consistent exercise habits.
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    Our app includes sophisticated verification mechanisms to ensure rewards are earned through genuine
                    physical activity, maintaining the integrity of our ecosystem while promoting healthier lifestyles.
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Features & Benefits</h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Step Tracking & Rewards</h3>
                    <p className="text-muted-foreground">
                      Earn MVN tokens for your daily steps with fair thresholds and limits to ensure genuine activity.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">MET-Based Rewards</h3>
                    <p className="text-muted-foreground">
                      Earn additional tokens based on your metabolic activity intensity, encouraging more vigorous
                      exercise.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Premium Integration</h3>
                    <p className="text-muted-foreground">
                      Premium users can import activity data from Apple HealthKit and Google Fit for a seamless
                      experience.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <h3 className="text-xl font-bold">Referral Program</h3>
                    <p className="text-muted-foreground">
                      Earn 1% of referred users' activity rewards, creating a network effect for growth.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Coming Soon</h3>
                  <ul className="space-y-2 text-muted-foreground md:text-lg">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                      <span>Location and route tracking with interactive maps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                      <span>Friend sync for joint exercises and shared rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                      <span>Community challenges with special rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                      <span>Social feed to share achievements and rewards</span>
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
                  03.5
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Subscription Plans</h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <p className="text-muted-foreground md:text-lg">
                  Movin offers both free and premium subscription options to cater to different user needs. While all
                  users can earn MVN tokens through physical activity, premium subscribers unlock additional features
                  and benefits.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Free Plan</h3>
                      <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-xs text-[#0095ff]">Basic</div>
                    </div>
                    <div className="text-2xl font-bold">$0</div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Basic step and MET tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Earn MVN tokens for activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Staking options up to 12 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Referral program (1% rewards)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
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
                      <div className="rounded-full bg-[#e6f4ff] px-3 py-1 text-xs text-[#0095ff]">Advanced</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$2.99/month</div>
                      <div className="text-sm text-muted-foreground">or $10.99/year (save 69%)</div>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>All features in the Free plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>
                          <strong>Ad-free</strong> experience
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Import activity from Apple Health & Google Fit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>
                          Exclusive 24-month staking with <strong>24% APY</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Access to maps and route tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-[#0095ff] shrink-0 mt-0.5" />
                        <span>Friend sync for joint exercises</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-[#e6f4ff]/50">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Premium subscribers enjoy significantly higher earning potential through the
                    exclusive 24-month staking option with 24% APY, as well as enhanced activity tracking through
                    third-party integrations.
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
                  04
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tokenomics</h2>
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
                    The MVN token is the core of our ecosystem. It can be burned, paused, and minted as needed to
                    maintain ecosystem health. The token contract includes sophisticated staking mechanisms with various
                    lock periods.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Reward System</h3>
                  <div className="space-y-2 text-muted-foreground md:text-lg">
                    <p>
                      <span className="font-semibold">Step Rewards:</span> 1 MVN token per 10,000 steps at launch, with
                      a minimum threshold of 10,000 steps. Maximum limits of 300 steps per minute and 30,000 steps per
                      day ensure fair play. Rewards decrease by 0.1% per day to maintain token economics.
                    </p>
                    <p>
                      <span className="font-semibold">MET Rewards:</span> Earn MVN tokens from metabolic activity with a
                      threshold of 10 METs, maximum of 5 METs per minute, and 500 METs per day.
                    </p>
                    <p>
                      <span className="font-semibold">Reward Expiry:</span> Unclaimed rewards expire after 30 days of
                      inactivity and are burned, encouraging regular engagement and maintaining token scarcity.
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
                          <th className="py-2 text-left">Availability</th>
                          <th className="py-2 text-left">APY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">1 Month</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">4%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">3 Months</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">8%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">6 Months</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">12%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">12 Months</td>
                          <td className="py-2">All Users</td>
                          <td className="py-2">18%</td>
                        </tr>
                        <tr>
                          <td className="py-2">24 Months</td>
                          <td className="py-2">Premium Users Only</td>
                          <td className="py-2 font-bold text-[#0095ff]">24%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                  05
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Roadmap</h2>
              </motion.div>
              <motion.div
                variants={item}
                className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-[2px] before:bg-[#0095ff]/20"
              >
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q1 2023: Launch</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Initial app release with core step tracking functionality</li>
                    <li>MVN token launch on Ethereum</li>
                    <li>Basic staking mechanisms implementation</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q2 2023: Enhancement</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>MET-based rewards implementation</li>
                    <li>Premium user features including HealthKit and Google Fit integration</li>
                    <li>Referral program launch</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">Q3-Q4 2023: Expansion</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Location and route tracking with interactive maps</li>
                    <li>Friend sync for joint exercises</li>
                    <li>Community challenges implementation</li>
                  </ul>
                </div>
                <div className="relative before:absolute before:left-[-29px] before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-[#0095ff]">
                  <h3 className="text-xl font-bold">2024: Social & Ecosystem</h3>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>Social feed for sharing achievements</li>
                    <li>Expanded token utility within the ecosystem</li>
                    <li>Partnerships with fitness brands and services</li>
                    <li>Advanced gamification elements</li>
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
                  06
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Team</h2>
              </motion.div>
              <motion.div variants={item} className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    name: "Razvan Tomegea",
                    role: "Founder & CEO",
                    bio: "With 10+ years experience in software engineering and fitness industry",
                  },
                ].map((member, i) => (
                  <div key={i} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                    <Image src="/images/avatar.png" alt={member.name} width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-[#0095ff]">{member.role}</p>
                      <p className="mt-2 text-muted-foreground">{member.bio}</p>
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
                  07
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Involved</h2>
              </motion.div>
              <motion.div variants={item} className="space-y-8">
                <p className="text-muted-foreground md:text-lg">
                  Join our growing community of fitness enthusiasts and crypto believers. There are many ways to get
                  involved with the Movin ecosystem:
                </p>
                <div className="grid gap-6 md:grid-cols-2">
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
                    <Button className="bg-[#0095ff] hover:bg-[#0080e0]">Learn About Staking</Button>
                  </div>
                  <div className="space-y-4 rounded-lg border p-6 shadow-sm">
                    <h3 className="text-xl font-bold">Community</h3>
                    <p className="text-muted-foreground">
                      Join our vibrant community on social media platforms to stay updated and connect with other users.
                    </p>
                    <div className="flex gap-4">
                      <Link href="#" className="text-[#0095ff] hover:underline">
                        Twitter
                      </Link>
                      <Link href="#" className="text-[#0095ff] hover:underline">
                        Discord
                      </Link>
                      <Link href="#" className="text-[#0095ff] hover:underline">
                        Telegram
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
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
