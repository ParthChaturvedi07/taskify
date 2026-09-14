import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative text-white">
      <Navbar />

      <section className="relative w-full max-w-4xl mx-auto px-6 py-32 md:py-40 flex-1 z-10">
        <h1 className="font-pixel text-4xl md:text-6xl font-bold uppercase mb-4 text-white">
          Privacy Policy
        </h1>
        <p className="font-chakra text-lg text-white/60 mb-12">
          We believe in full transparency about how your data is handled. Read carefully — your privacy matters to us.<br/>
          <span className="text-white/40">Last Updated: May 15, 2026</span>
        </p>

        <div className="prose prose-invert max-w-none font-chakra text-white/80 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white/60">
              <li><a href="#s1" className="hover:text-white transition-colors">01 · Introduction</a></li>
              <li><a href="#s2" className="hover:text-white transition-colors">02 · Eligibility</a></li>
              <li><a href="#s3" className="hover:text-white transition-colors">03 · Information We Collect</a></li>
              <li><a href="#s4" className="hover:text-white transition-colors">04 · How We Use It</a></li>
              <li><a href="#s5" className="hover:text-white transition-colors">05 · Storage & Security</a></li>
              <li><a href="#s6" className="hover:text-white transition-colors">06 · Sharing</a></li>
              <li><a href="#s7" className="hover:text-white transition-colors">07 · Refund Policy</a></li>
              <li><a href="#s8" className="hover:text-white transition-colors">08 · Your Rights</a></li>
              <li><a href="#s9" className="hover:text-white transition-colors">09 · VPNs & Misuse</a></li>
              <li><a href="#s10" className="hover:text-white transition-colors">10 · Communications</a></li>
              <li><a href="#s11" className="hover:text-white transition-colors">11 · Data Retention</a></li>
              <li><a href="#s12" className="hover:text-white transition-colors">12 · Children's Privacy</a></li>
              <li><a href="#s13" className="hover:text-white transition-colors">13 · Policy Changes</a></li>
              <li><a href="#s14" className="hover:text-white transition-colors">14 · Delete Your Data</a></li>
              <li><a href="#s15" className="hover:text-white transition-colors">15 · Contact Us</a></li>
            </ul>
          </section>

          <section id="s1">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">01</span> Introduction
            </h2>
            <p className="leading-relaxed mb-4">
              TaskifyGames ("Company", "we", "us", or "our") respects the privacy of our users ("user", "you") and is committed to protecting it through this Privacy Policy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application and website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Platform").
            </p>
            <p className="leading-relaxed">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Platform.
            </p>
          </section>

          <section id="s2">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">02</span> Eligibility
            </h2>
            <p className="leading-relaxed">
              You must be at least 13 years old to use the Platform. By using the Platform, you affirm that you are over the age of 13. If you are under 13, please do not use our services or provide any personal information.
            </p>
          </section>

          <section id="s3">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">03</span> Information We Collect
            </h2>
            <p className="leading-relaxed mb-4">We may collect information about you in various ways. The information we may collect includes:</p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-2">Personal Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Device information (device ID, OS)</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-2">Usage Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>App activity (tasks, offers)</li>
              <li>IP address</li>
              <li>Interactions with third-party ads</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-2">Third-Party Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Firebase & Google Analytics</li>
              <li>Meta Ads & Google Ads</li>
              <li>Applovin, GrowDeck, Pubscale</li>
            </ul>
            <p className="leading-relaxed">These third parties may collect and store data for the purpose of analysis, targeted advertising, and performance tracking.</p>
          </section>

          <section id="s4">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">04</span> How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and manage our services</li>
              <li>Personalise your user experience</li>
              <li>Show relevant content and promotions</li>
              <li>Improve our app and services</li>
              <li>Monitor and analyse trends and usage</li>
              <li>Communicate with users via email (support and updates)</li>
              <li>Detect and prevent misuse (including VPN or automated tool use)</li>
            </ul>
          </section>

          <section id="s5">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">05</span> Storage and Security of Information
            </h2>
            <p className="leading-relaxed">
              Your data is securely stored using Google Cloud infrastructure. We implement reasonable technical and organisational measures to protect the personal information we process.
            </p>
          </section>

          <section id="s6">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">06</span> Sharing of Your Information
            </h2>
            <p className="leading-relaxed mb-4">We do not sell, rent, or trade your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trusted third-party partners — Applovin, AdMob, Meta Ads, GrowDeck, and Pubscale (for interactive experiences and content)</li>
              <li>Service providers involved in analytics and ads</li>
              <li>Law enforcement or government agencies, if required by law</li>
            </ul>
          </section>

          <section id="s7">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">07</span> Refund Policy
            </h2>
            <p className="leading-relaxed mb-4">Refunds are only granted under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The user experiences a technical issue that prevents them from receiving their earned reward.</li>
              <li>No refund is granted if the user provides invalid data or manipulates the app through VPN, proxy, or fraud.</li>
            </ul>
            <p className="leading-relaxed">For refund inquiries, contact: <strong>admin@taskifygames.com</strong></p>
          </section>

          <section id="s8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">08</span> User Rights and Data Access
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access the information we have about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to certain types of data processing</li>
            </ul>
            <p className="leading-relaxed">To exercise any of these rights, contact: <strong>admin@taskifygames.com</strong></p>
          </section>

          <section id="s9">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">09</span> Use of VPNs, Fraud, and Misuse
            </h2>
            <p className="leading-relaxed">
              Accounts found using VPNs, proxies, bots, or manipulating data will be permanently suspended and restricted from all app features.
            </p>
          </section>

          <section id="s10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">10</span> Communications
            </h2>
            <p className="leading-relaxed">
              By using the Platform, you consent to receiving electronic communications from us. This includes emails related to account updates, promotions, technical issues, and service improvements.
            </p>
          </section>

          <section id="s11">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">11</span> Retention of Data
            </h2>
            <p className="leading-relaxed">
              We retain user data only for as long as necessary to provide our services or comply with legal obligations.
            </p>
          </section>

          <section id="s12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">12</span> Children's Privacy
            </h2>
            <p className="leading-relaxed">
              Our platform is not intended for users under 13. We do not knowingly collect data from children under the age of 13.
            </p>
          </section>

          <section id="s13">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">13</span> Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be reflected by a revised "Effective Date" at the top. Continued use of the Platform after such changes constitutes your consent to the updated policy.
            </p>
          </section>

          <section id="s14">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">14</span> Delete Your Personal Data
            </h2>
            <p className="leading-relaxed mb-4">
              You have the right to request the deletion of your personal data that we have collected and stored.
            </p>
            <p className="leading-relaxed mb-4">
              If you want to delete your account, you can go to your profile inside the app and request account deletion, or you can contact us directly at <strong>admin@taskifygames.com</strong>. We will respond in accordance with applicable laws.
            </p>
            <p className="leading-relaxed mb-4">
              If your account was deleted by mistake, we provide a 90-day self-recovery period from the deletion date. During this period, you can try to restore your account through our <a href="https://taskifygames.com/recover-account" className="text-[#a466ff] hover:underline">account recovery page</a>.
            </p>
            <p className="leading-relaxed mb-4">Please be aware that in some cases, we may be required to retain certain information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To comply with a legal obligation</li>
              <li>To resolve disputes</li>
              <li>To enforce our agreements</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
            <p className="leading-relaxed">
              Once the need for retaining such data no longer exists, we will proceed with secure deletion or anonymisation in accordance with our data retention policies.
            </p>
          </section>

          <section id="s15">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">15</span> Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy, you may contact us at:<br/><br/>
              <strong>TaskifyGames</strong><br/>
              Azamgarh, Uttar Pradesh, India<br/>
              admin@taskifygames.com
            </p>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
