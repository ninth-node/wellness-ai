import { Calendar, Search, Package, DollarSign, Clock, Smartphone } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Calendar,
      title: "No-show nightmare",
      description: "20-30% of appointments cancelled last minute, killing your revenue",
    },
    {
      icon: Search,
      title: "Guessing game treatments",
      description: "recommending services without knowing what really works for each client",
    },
    {
      icon: Package,
      title: "Inventory chaos",
      description: "either running out of popular products or drowning in dead stock",
    },
    {
      icon: DollarSign,
      title: "Price competition",
      description: "online beauty giants stealing your product sales with better convenience",
    },
    {
      icon: Clock,
      title: "Scheduling headaches",
      description: "double bookings, staff conflicts, and unhappy clients",
    },
    {
      icon: Smartphone,
      title: "Tech overwhelm",
      description: "juggling 5+ different apps that don't talk to each other",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Beauty Business Is Harder Than Ever</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You're fighting an uphill battle every day:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-ai-purple">
            What if your salon could predict problems and solve them automatically?
          </h3>
        </div>
      </div>
    </section>
  );
}
