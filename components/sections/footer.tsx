import { Sparkles } from "lucide-react";

export function Footer() {
  const sections = [
    {
      title: "Platform Features",
      links: ["AI Skin Analysis", "Predictive Scheduling", "Beauty E-Commerce", "AR Virtual Try-On", "Business Intelligence"],
    },
    {
      title: "Beauty Resources",
      links: ["Skin Analysis Research", "Beauty Trend Reports", "Treatment Effectiveness Studies", "ROI Case Studies", "Industry Compliance Guides"],
    },
    {
      title: "Support & Training",
      links: ["24/7 Technical Support", "Beauty Industry Specialists", "AI Training Academy", "Professional Community", "Implementation Services"],
    },
    {
      title: "Legal & Compliance",
      links: ["Privacy Policy", "Terms of Service", "Beauty Industry Compliance", "HIPAA Compliance", "Security Certifications"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-beauty-rose to-ai-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">BeautyAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing the beauty industry through artificial intelligence
            </p>
          </div>

          {/* Links */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 BeautyAI Platform. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
