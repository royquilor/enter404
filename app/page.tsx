import HeroSection from "@/components/hero-section";

export default function Home() {
  // `HeroSection` already renders the page `<main id="main-content">`.
  // Keeping a single `<main>` avoids duplicate IDs and nested landmark issues.
  return <HeroSection />;
}

