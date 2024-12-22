import { Button } from "@/components/ui/button";
import { URL_PATHS } from "@/lib/helperVariables";
import {
  ArrowRight,
  BarChart,
  Calendar,
  ChevronRight,
  Layout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import TrustedPartnersCarousel from "@/components/trustedPartnersCarousel";
import faqs from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    id: "1",
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    id: "2",
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    id: "3",
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center gap-2">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 fle flex-col">
          Simplify Your Workflow <br /> Empower Your Team <br />
          <span className="flex mx-auto gap-4 sm:gap-5 items-center justify-center">
            with{" "}
            <Image
              src={"/assets/xcrumb_name.png"}
              alt="XCRUMB"
              width={400}
              height={80}
              className="h-12 sm:h-20 w-auto object-contain"
            />
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Effortlessly manage tasks, track tickets, and collaborate with your
          team — all in one intuitive platform. With Xcrumb, you can focus on
          what truly matters: delivering results.
        </p>
        <div className="flex justify-center gap-2 items-center">
          <Link href={`/${URL_PATHS.ONBOARDING}`}>
            <Button size="lg">
              <span>Get Started</span>
              <ChevronRight size={15} />
            </Button>
          </Link>
          <Link href={`#features`}>
            <Button size="lg" variant="outline">
              <span>Learn More</span>
              <ChevronRight size={15} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feat) => {
              return (
                <Card key={feat.id} className="bg-gray-800">
                  <CardContent className="pt-6">
                    <feat.icon className="h-12 w-12 mb-4 text-blue-300" />
                    <h4 className="text-xl font-semibold mb-2">{feat.title}</h4>
                    <p className="text-gray-300">{feat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Trusted By Industry Leaders
          </h3>
          <TrustedPartnersCarousel />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h3>
          {faqs.map((faq, index) => {
            return (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </section>

      {/* Call to Action  */}
      <section className="py-20 px-5 text-center">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Ready to Transform Your Workflow
          </h3>
          <p className="mb-12 text-xl">
            Join thousands of teams already using XCRUMB to streamline their
            projects and boost productivity.
          </p>
          <Link href={`/${URL_PATHS.ONBOARDING}`}>
            <Button className="animate-bounce">
              Get Started for Free
              <ArrowRight size={18} className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
