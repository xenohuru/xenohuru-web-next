import { AlertCircle, Shield, Eye, MapPin, Lightbulb, Users } from 'lucide-react';

export const metadata = {
  title: 'Privacy & Disclaimer | Xenohuru',
  description: 'Information about data privacy, accuracy disclaimers, and travel safety for using Xenohuru.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] pt-20">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-b border-[#30363d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-[#1a7a4a] mx-auto mb-4" />
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Privacy & Disclaimer
          </h1>
          <p className="text-xl text-[#8b949e]">
            Information about your data and important travel safety information
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Data Accuracy Disclaimer */}
          <div className="bg-[#161b22] rounded-lg border border-[#e8a045]/30 p-8">
            <div className="flex gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-[#e8a045] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Accuracy Disclaimer</h2>
                <div className="space-y-3 text-[#8b949e]">
                  <p>
                    Xenohuru provides information about Tanzania's attractions, regions, and travel-related services. While we strive to maintain accurate and up-to-date information, we cannot guarantee the complete accuracy of all data on our platform.
                  </p>
                  <p>
                    <strong>Weather data:</strong> Weather forecasts are predictions and may change rapidly. Always check official weather services before traveling.
                  </p>
                  <p>
                    <strong>Attraction information:</strong> Opening hours, entrance fees, and availability may change without notice. We recommend contacting attractions directly before planning your visit.
                  </p>
                  <p>
                    <strong>Reviews and ratings:</strong> User reviews represent individual experiences and may not reflect current conditions.
                  </p>
                  <p>
                    <strong>Operational details:</strong> Transport costs, guide availability, and services may vary based on seasons and demand.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Safety Information */}
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-8">
            <div className="flex gap-4 mb-4">
              <MapPin className="w-6 h-6 text-[#1a7a4a] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Travel Safety & Planning</h2>
                <div className="space-y-4 text-[#8b949e]">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Before You Travel:</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Verify visa requirements for Tanzania</li>
                      <li>Check travel insurance coverage</li>
                      <li>Consult official travel advisories for your country</li>
                      <li>Get necessary vaccinations and health advice from a doctor</li>
                      <li>Confirm operational status with official tourism operators</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Contacting Operators:</h3>
                    <p>
                      For specific attractions, remote locations, and hidden gems, we recommend contacting official tour operators or guides directly. They can provide:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                      <li>Current accessibility and safety information</li>
                      <li>Personalized travel guidance based on your interests</li>
                      <li>Budget-appropriate options and transport arrangements</li>
                      <li>Insurance recommendations and requirements</li>
                      <li>Emergency contact information and support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-8">
            <div className="flex gap-4 mb-4">
              <Eye className="w-6 h-6 text-[#1a7a4a] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Your Privacy</h2>
                <div className="space-y-3 text-[#8b949e]">
                  <p>
                    <strong>Information We Collect:</strong> Xenohuru collects minimal personal information. When you submit reviews, we collect your name, email, country, and review content. This information is used solely to display your feedback on the platform.
                  </p>
                  <p>
                    <strong>No Authentication Required:</strong> You don't need to create an account to browse our platform. Reviews are anonymous apart from your public profile information.
                  </p>
                  <p>
                    <strong>Data Usage:</strong> We do not sell or share your personal information with third parties. Your data is used only to enhance the platform experience.
                  </p>
                  <p>
                    <strong>Cookies:</strong> We use minimal cookies for analytics and user experience improvements. You can control cookie settings in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Mode */}
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-8">
            <div className="flex gap-4 mb-4">
              <Lightbulb className="w-6 h-6 text-[#1a7a4a] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Offline Access</h2>
                <div className="space-y-3 text-[#8b949e]">
                  <p>
                    Xenohuru is designed to work offline where possible. Your browser may cache previously visited pages and data for viewing when internet connectivity is limited.
                  </p>
                  <p>
                    Real-time data (weather forecasts, current reviews) will require internet connectivity. If data fails to load, check your connection and refresh the page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Feedback */}
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-8">
            <div className="flex gap-4 mb-4">
              <Users className="w-6 h-6 text-[#1a7a4a] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Questions or Corrections?</h2>
                <div className="space-y-3 text-[#8b949e]">
                  <p>
                    If you notice inaccurate information or have concerns about any content, please reach out to us:
                  </p>
                  <div className="space-y-2 mt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center px-4 py-2 bg-[#1a7a4a] text-white rounded-lg hover:bg-[#1a7a4a]/90 transition-colors font-medium"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Notice */}
          <div className="bg-[#1a7a4a]/10 border-l-4 border-[#1a7a4a] rounded p-6">
            <p className="text-[#8b949e] text-sm">
              <strong>Last Updated:</strong> March 22, 2026
            </p>
            <p className="text-[#8b949e] text-sm mt-2">
              By using Xenohuru, you acknowledge that you have read and understood this Privacy & Disclaimer policy. Xenohuru is provided "as-is" without warranties of any kind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
