"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from booking software I already use?",
      answer: "Traditional beauty software manages appointments reactively. Our AI platform predicts and prevents problems while optimizing every aspect of your business. Instead of just scheduling, you get predictive no-show reduction, intelligent upselling, personalized treatments, and automated inventory management.",
    },
    {
      question: "Will this work with my existing beauty equipment and suppliers?",
      answer: "Yes! We integrate with major skin analysis equipment (VISIA, Observ), beauty suppliers (L'Oréal Professional, Schwarzkopf, etc.), and payment systems. Our team handles all integrations during the setup process.",
    },
    {
      question: "How quickly will I see results?",
      answer: "Most beauty businesses see immediate improvements: Week 1: Faster client check-ins and automated skin analysis | Week 2: Noticeable reduction in no-shows and improved scheduling efficiency | Month 1: 20-30% increase in product sales and treatment uptake | Month 3: Significant revenue growth and operational streamlining",
    },
    {
      question: "Is client data secure and compliant with beauty industry regulations?",
      answer: "Absolutely. We exceed beauty industry security standards with HIPAA compliance (for medical spas), SOC 2 Type II certification, and bank-level encryption. Client photos and personal data are more secure with us than with traditional systems.",
    },
    {
      question: "What if my staff aren't comfortable with technology?",
      answer: "Our interface is designed to enhance, not replace, beauty expertise. The AI provides insights and suggestions while professionals make all treatment decisions. We include comprehensive training that gets your team confident and productive quickly.",
    },
    {
      question: "Can the AI really analyze skin as well as a professional?",
      answer: "Our AI complements professional expertise with consistent, objective analysis. It detects patterns and changes that might be subtle to the human eye, while professionals interpret results and customize treatments. Together, they achieve better outcomes than either alone.",
    },
    {
      question: "How does virtual try-on work, and do clients like it?",
      answer: "Clients use their phone camera to see how products will look before purchasing. It uses advanced AR technology to accurately show makeup applications, hair colors, and treatment results. 89% of clients report it increases their confidence in product purchases.",
    },
    {
      question: "What happens if my internet goes down?",
      answer: "The system works offline for essential functions like appointment check-ins and basic client management. When connectivity returns, all data syncs automatically. We also provide mobile hotspot backup options for critical operations.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Common Questions from Beauty Business Owners
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-ai-purple/50 transition-colors"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-ai-purple flex-shrink-0 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
