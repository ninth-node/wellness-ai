import { Button } from "@/components/ui/button";
import { Rocket, Video, Calculator, Phone, Mail, MessageCircle, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-ai-purple via-beauty-rose to-ai-purple text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Revolutionize Your Beauty Business?
          </h2>
          <p className="text-2xl mb-4 text-white/90">Join the AI Beauty Revolution</p>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Be among the first beauty professionals to harness the power of true artificial intelligence.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Free 30-Day Trial</h3>
            <p className="text-sm text-white/80">Experience the full AI platform with real client data</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Video className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Personal Beauty Demo</h3>
            <p className="text-sm text-white/80">See skin analysis, AR try-on, and smart scheduling in action</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Calculator className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Custom Setup</h3>
            <p className="text-sm text-white/80">Tailored configuration for your specific beauty services</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Revenue Guarantee</h3>
            <p className="text-sm text-white/80">See measurable improvements in 30 days or your money back</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="xl" className="bg-white text-ai-purple hover:bg-gray-100 font-semibold text-lg">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Your Beauty Demo
          </Button>
          <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg">
            Start Free Trial
          </Button>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
            <Mail className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm text-white/70">Email</div>
              <div className="font-semibold">hello@beautyai-platform.com</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
            <Phone className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm text-white/70">Phone</div>
              <div className="font-semibold">(555) BEAUTY-AI</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur rounded-lg p-4">
            <MessageCircle className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm text-white/70">Live Chat</div>
              <div className="font-semibold">Available 24/7</div>
            </div>
          </div>
        </div>

        {/* Limited Time Offer */}
        <div className="bg-white/20 backdrop-blur border-2 border-white/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Limited-Time Launch Offer</h3>
          <p className="text-xl">
            First 50 beauty businesses get <span className="font-bold text-success-green">50% off first year</span> + free AR try-on setup{" "}
            <span className="font-bold">($5,000 value)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
