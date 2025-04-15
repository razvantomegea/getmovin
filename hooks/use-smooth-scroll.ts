"use client"

import type React from "react"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    // Remove the # from the id if it exists
    const targetId = id.startsWith("#") ? id.substring(1) : id

    const element = document.getElementById(targetId)

    if (element) {
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      // Get the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top

      // Calculate the scroll position
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20

      // Scroll with a smoother animation
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update the URL without refreshing the page
      window.history.pushState({}, "", `#${targetId}`)
    }
  }, [])

  return scrollToSection
}
