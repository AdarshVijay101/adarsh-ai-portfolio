import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { WhyHireMe } from "@/components/why-hire-me"
import { QuoteAgentSwiper } from "@/components/home/QuoteAgentSwiper";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-12">
      <Hero />
      <FeaturedProjects />
      <WhyHireMe />
    </div>
  )
}
