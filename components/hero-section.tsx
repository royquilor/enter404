import Image from "next/image";
import Link from "next/link";

import EmailForm from "@/components/email-form";
import { LandingEntry, LandingSection } from "@/components/landing-section";
import { LogoLabel } from "@/components/logo-label";
import { experiments } from "@/lib/experiments";
import { projects } from "@/lib/projects";

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/royquilor",
    ariaLabel: "Roy Quilor on X (opens in new tab)",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@404roy",
    ariaLabel: "YouTube channel (opens in new tab)",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/royquilor",
    ariaLabel: "Roy Quilor on LinkedIn (opens in new tab)",
  },
] as const;

export default function HeroSection() {
  const featuredExperiment = experiments[0];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full min-w-0 flex-col items-center gap-5 px-5 pb-16 pt-[max(6.25rem,env(safe-area-inset-top))]"
      >
        <div className="flex w-full min-w-0 max-w-[676px] flex-col gap-[100px]">
          {/* Intro row: logo label + profile */}
          <section className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <Link
              href="/"
              className="font-display w-full shrink-0 text-sm uppercase leading-5 text-muted-foreground transition-[color] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground sm:w-[212px] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
              aria-label="Go to Enter404 home"
            >
              <LogoLabel />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-[2.5rem]">
                <Image
                  src="/images/profile-2.png"
                  alt="Roy Quilor"
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority
                />
              </div>

              <p className="text-base font-medium leading-4 text-foreground">Roy Quilor - UK</p>

              <div className="text-base leading-5 text-foreground">
                <p>Designer for 10+ years. Not sure I&apos;ll survive AI.</p>
                <p className="mt-0">
                  Built 2 products. Zero users.
                  <br />
                  Now building distribution tools to find out.
                </p>
                <p className="mt-0">Starting with research.</p>
              </div>
            </div>
          </section>

          <LandingSection label="IDEAs">
            <div className="flex flex-col gap-4">
              <p className="text-base leading-5 text-foreground">
                Ahrefs is too expensive. Its built for agencies and not solo builders.
              </p>
              <p className="text-base leading-5 text-foreground">
                Get the weekly idea — one validated idea, real Reddit signal, real search demand.
              </p>
              <EmailForm />
            </div>
          </LandingSection>

          <LandingSection label="PROJECTS">
            <div className="flex flex-col gap-6">
              {projects.map((project) => (
                <LandingEntry
                  key={project.name}
                  title={project.name}
                  description={project.description}
                  href={project.url}
                />
              ))}
            </div>
          </LandingSection>

          {featuredExperiment && (
            <LandingSection label="Experiments">
              <LandingEntry
                title={featuredExperiment.title}
                description={featuredExperiment.description}
                href={`/experiments/${featuredExperiment.slug}`}
              />
            </LandingSection>
          )}

          <LandingSection label="SOCIAL">
            <div className="flex flex-col gap-2 text-base leading-5 text-muted-foreground">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit transition-[color] duration-150 ease-[var(--ease-out-strong)] hover:text-foreground rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </LandingSection>
        </div>
      </main>
    </div>
  );
}
