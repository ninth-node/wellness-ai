import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter Plan",
      price: "$299",
      period: "month",
      description: "Perfect for single-location salons and independent practitioners",
      features: [
        "Up to 500 active clients",
        "AI skin analysis and basic recommendations",
        "Smart appointment scheduling",
        "Basic beauty product e-commerce (up to 200 products)",
        "Mobile app for staff and clients",
        "Email support and online training",
      ],
      highlighted: false,
    },
    {
      name: "Professional Plan",
      price: "$599",
      period: "month",
      description: "Ideal for multi-location spas and full-service beauty centers",
      features: [
        "Up to 2,500 active clients",
        "Full AI agent suite with predictive analytics",
        "Advanced AR try-on and virtual consultations",
        "Comprehensive beauty e-commerce (unlimited products)",
        "Wearable device integration",
        "Priority support with dedicated success manager",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      period: "pricing",
      description: "For beauty chains and franchise operations",
      features: [
        "Unlimited clients and locations",
        "Custom AI model training for your specific services",
        "White-label platform with your branding",
        "Advanced integrations and custom development",
        "24/7 premium support with on-site training",
        "Revenue sharing opportunities",
      ],
      highlighted: false,
    },
  ];

  const allPlansInclude = [
    "30-day free trial with full feature access and data migration",
    "Professional setup including staff training and customization",
    "Beauty industry compliance meeting all regulatory requirements",
    "99.9% uptime guarantee with redundant systems and monitoring",
    "Cancel anytime with complete data export capabilities",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-ai-purple/5 to-beauty-rose/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transparent Pricing for Every Beauty Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business size and growth goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`${
                plan.highlighted
                  ? "border-ai-purple border-2 shadow-2xl scale-105"
                  : "border-gray-200"
              } relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ai-purple text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-ai-purple hover:bg-ai-purple/90"
                      : "bg-beauty-rose hover:bg-beauty-rose/90"
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">All plans include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allPlansInclude.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-ai-purple mb-2">
            Average beauty business sees $38K+ annual revenue increase and $25K in cost savings within first year
          </p>
          <p className="text-gray-600">Investment Payback Period: Typically 3-4 months through increased bookings and reduced waste</p>
        </div>
      </div>
    </section>
  );
}
