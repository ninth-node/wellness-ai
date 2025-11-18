import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Brain, Glasses, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Eye,
      title: "Computer Vision Skin Analysis",
      items: [
        "Medical-grade accuracy analyzing skin type, hydration, pigmentation, texture, and problem areas",
        "Real-time progress tracking with photo analysis showing treatment effectiveness over time",
        "Genetic skin profiling integration for long-term skin health optimization",
        "Environmental correlation tracking how weather, pollution, and lifestyle affect skin",
      ],
    },
    {
      icon: Brain,
      title: "Predictive Client Intelligence",
      items: [
        "Behavior pattern recognition predicting no-shows, preferred appointment times, and service preferences",
        "Lifetime value optimization identifying high-value clients and customizing their experience",
        "Churn prevention automated interventions when clients show signs of leaving",
        "Social influence mapping understanding how clients discover and choose your services",
      ],
    },
    {
      icon: Glasses,
      title: "AR/VR Beauty Innovation",
      items: [
        "Virtual makeup try-on with 95% accuracy for color matching and application preview",
        "Hair transformation preview showing color, cut, and style changes before commitment",
        "Treatment result visualization showing expected outcomes from facials, peels, and procedures",
        "3D skin mapping for precise treatment planning and progress documentation",
      ],
    },
    {
      icon: Zap,
      title: "Autonomous Operations",
      items: [
        "Self-optimizing schedules that learn and improve appointment efficiency over time",
        "Intelligent inventory management predicting seasonal demands and trending products",
        "Dynamic pricing engine optimizing service and product prices for maximum profitability",
        "Automated client nurturing with personalized follow-up sequences and care recommendations",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Capabilities Your Competition Doesn't Have
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary features powered by cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-ai-purple/20 to-beauty-rose/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-ai-purple" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-ai-purple text-lg flex-shrink-0">•</span>
                        <span className="text-gray-700">{item}</span>
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
