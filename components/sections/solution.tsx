import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, Calendar, ShoppingCart, BarChart } from "lucide-react";

export function SolutionSection() {
  const agents = [
    {
      icon: Microscope,
      title: "AI Skin Analysis Specialist",
      color: "beauty-rose",
      features: [
        "Instant skin assessment using computer vision - identifies skin type, concerns, and treatment needs in seconds",
        "Personalized treatment plans based on client's unique skin profile and improvement goals",
        "Progress tracking with before/after analysis showing measurable results to clients",
        "Product recommendations perfectly matched to skin analysis and treatment outcomes",
      ],
    },
    {
      icon: Calendar,
      title: "AI Appointment Optimizer",
      color: "ai-purple",
      features: [
        "Smart scheduling reduces no-shows by 40% through predictive client behavior analysis",
        "Dynamic staff allocation matches the right specialist to each client's needs automatically",
        "Revenue optimization fills gaps with waitlist clients and suggests optimal service packages",
        "Automated communications with personalized reminders and re-booking suggestions",
      ],
    },
    {
      icon: ShoppingCart,
      title: "AI Beauty Commerce Engine",
      color: "success-green",
      features: [
        "Virtual try-on technology lets clients test makeup, hair colors, and treatments before buying",
        "Predictive inventory automatically reorders products before you run out, reducing waste by 60%",
        "Personalized product discovery recommends items based on skin analysis, purchase history, and treatment plans",
        "Subscription box curation creates custom beauty boxes tailored to each client's evolving needs",
      ],
    },
    {
      icon: BarChart,
      title: "AI Business Intelligence",
      color: "skin-beige",
      features: [
        "Revenue forecasting with 90% accuracy for better financial planning and growth strategies",
        "Treatment effectiveness tracking showing which services deliver the best client outcomes",
        "Market trend analysis identifies emerging beauty trends before your competition",
        "Automated reporting eliminates manual data entry and provides actionable insights",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your AI Beauty Team That Never Sleeps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent agents work 24/7 to revolutionize your beauty business:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-${agent.color}/20 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${agent.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{agent.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {agent.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-success-green text-xl flex-shrink-0">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
