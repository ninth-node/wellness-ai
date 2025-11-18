import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Users, Package } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-beauty-rose/10 via-white to-ai-purple/10 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-beauty-rose via-ai-purple to-beauty-rose bg-clip-text text-transparent">
            The AI That Reads Skin Better Than Dermatologists
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mb-12 leading-relaxed">
            Transform your salon or spa with AI that predicts skin issues, automates perfect product matches,
            and runs itself while you focus on what matters - beautiful results for every client.
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-6xl">
            <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-beauty-rose/20">
              <div className="flex items-center justify-center w-12 h-12 bg-beauty-rose/20 rounded-full mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-beauty-rose" />
              </div>
              <h3 className="text-3xl font-bold text-ai-purple mb-2">40%</h3>
              <p className="text-sm text-gray-600">reduction in no-shows with predictive appointment intelligence</p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-success-green/20">
              <div className="flex items-center justify-center w-12 h-12 bg-success-green/20 rounded-full mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-success-green" />
              </div>
              <h3 className="text-3xl font-bold text-ai-purple mb-2">25%</h3>
              <p className="text-sm text-gray-600">revenue increase through AI-optimized pricing and smart product sales</p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-ai-purple/20">
              <div className="flex items-center justify-center w-12 h-12 bg-ai-purple/20 rounded-full mb-4 mx-auto">
                <Users className="w-6 h-6 text-ai-purple" />
              </div>
              <h3 className="text-3xl font-bold text-ai-purple mb-2">90%</h3>
              <p className="text-sm text-gray-600">client satisfaction with personalized treatments and AR try-ons</p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-beauty-rose/20">
              <div className="flex items-center justify-center w-12 h-12 bg-beauty-rose/20 rounded-full mb-4 mx-auto">
                <Package className="w-6 h-6 text-beauty-rose" />
              </div>
              <h3 className="text-3xl font-bold text-ai-purple mb-2">60%</h3>
              <p className="text-sm text-gray-600">less inventory waste via demand forecasting and auto-reordering</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="xl" className="bg-ai-purple hover:bg-ai-purple/90 text-white font-semibold shadow-xl">
              Transform Your Business
            </Button>
            <Button size="xl" variant="outline" className="border-2 border-ai-purple text-ai-purple hover:bg-ai-purple/10 font-semibold">
              See AI Skin Analysis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
