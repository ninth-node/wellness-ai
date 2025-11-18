import { Card, CardContent } from "@/components/ui/card";
import { Quote, Award, Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The AI skin analysis changed everything. I can show clients exactly what their skin needs and track their progress with photos. My treatment success rate improved 40% and clients are amazed by the results.",
      author: "Sarah Chen",
      role: "Master Esthetician at Radiance Spa",
    },
    {
      quote: "Our product sales increased 60% in three months. The AI knows exactly what each client needs and when they need it. Clients love the virtual try-on feature - it's like magic.",
      author: "Maria Rodriguez",
      role: "Owner of Bella Beauty Lounge",
    },
    {
      quote: "No-shows dropped from 25% to 8%. The AI predicts which clients might cancel and automatically reaches out with the perfect message to keep them engaged. Our schedule is finally full.",
      author: "Jennifer Park",
      role: "Studio Manager at Elite Wellness Center",
    },
    {
      quote: "The inventory management is incredible. We never run out of popular products anymore, and we're not stuck with dead stock. The AI predicted our summer skincare demand perfectly.",
      author: "David Kim",
      role: "Operations Director at Luxury Spa Group",
    },
  ];

  const metrics = [
    { value: "92%", label: "Client Satisfaction Improvement", sublabel: "with AI-powered personalized treatments" },
    { value: "$38K", label: "Average Annual Revenue Increase", sublabel: "per location through optimization" },
    { value: "2.5x", label: "Faster Treatment Planning", sublabel: "with AI skin analysis and recommendations" },
    { value: "95%", label: "Accuracy Rate", sublabel: "in product recommendations and treatment outcomes" },
  ];

  const awards = [
    "Beauty Innovation Award 2025 - Professional Beauty Association",
    "Best Beauty Tech Platform - Spa Executive Magazine",
    "Technology Excellence Award - International Spa Association",
    "AI Innovation Leader - Beauty Independent Magazine",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-beauty-rose/10 to-ai-purple/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Beauty Industry Leaders
          </h2>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-ai-purple mb-2">{metric.value}</div>
              <div className="text-lg font-semibold mb-1">{metric.label}</div>
              <div className="text-sm text-gray-600">{metric.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-beauty-rose/40 mb-4" />
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-ai-purple">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Recognition */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8 text-ai-purple" />
            <h3 className="text-2xl font-bold">Industry Recognition</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-ai-purple/5 rounded-lg">
                <Award className="w-6 h-6 text-ai-purple flex-shrink-0" />
                <span className="font-medium text-gray-700">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
