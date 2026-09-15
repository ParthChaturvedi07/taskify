import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DotGrid } from "@/components/ui/DotGrid";
import { GridBackground } from "@/components/ui/GridBackground";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative text-white">
      <Navbar />
      <GridBackground/>
      <DotGrid/>

       <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-15%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <section className=" relative w-full max-w-4xl mx-auto px-6 py-32 md:py-40 flex-1 z-10">
        <h1 className="font-pixel text-4xl md:text-6xl font-bold uppercase mb-4 text-white">
          Terms & Conditions
        </h1>
        <p className="font-chakra text-lg text-white/60 mb-12">
          By using TaskifyGames, you agree to these terms. Please read them fully — they govern your rights and responsibilities on our platform.<br/>
          <span className="text-white/40">Last Updated: May 15, 2026</span>
        </p>

        <div className="prose prose-invert max-w-none font-chakra text-white/80 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white/60">
              <li><a href="#t1" className="hover:text-white transition-colors">01 · Agreement to Terms</a></li>
              <li><a href="#t2" className="hover:text-white transition-colors">02 · Intellectual Property</a></li>
              <li><a href="#t3" className="hover:text-white transition-colors">03 · User Representations</a></li>
              <li><a href="#t4" className="hover:text-white transition-colors">04 · User Registration</a></li>
              <li><a href="#t5" className="hover:text-white transition-colors">05 · Prohibited Activities</a></li>
              <li><a href="#t6" className="hover:text-white transition-colors">06 · User Contributions</a></li>
              <li><a href="#t7" className="hover:text-white transition-colors">07 · Contribution License</a></li>
              <li><a href="#t8" className="hover:text-white transition-colors">08 · Review Guidelines</a></li>
              <li><a href="#t9" className="hover:text-white transition-colors">09 · App License</a></li>
              <li><a href="#t10" className="hover:text-white transition-colors">10 · Submissions</a></li>
              <li><a href="#t11" className="hover:text-white transition-colors">11 · Advertisers</a></li>
              <li><a href="#t12" className="hover:text-white transition-colors">12 · Site Management</a></li>
              <li><a href="#t13" className="hover:text-white transition-colors">13 · Privacy Policy</a></li>
              <li><a href="#t14" className="hover:text-white transition-colors">14 · Termination</a></li>
              <li><a href="#t15" className="hover:text-white transition-colors">15 · Modifications</a></li>
              <li><a href="#t16" className="hover:text-white transition-colors">16 · Governing Law</a></li>
              <li><a href="#t17" className="hover:text-white transition-colors">17 · Dispute Resolution</a></li>
              <li><a href="#t18" className="hover:text-white transition-colors">18–25 · Miscellaneous</a></li>
            </ul>
          </section>

          <section className="bg-white/5 p-6 rounded-2xl border border-white/10 my-8">
            <p className="font-bold text-white uppercase text-center m-0 tracking-widest text-sm">
              IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST DISCONTINUE USE IMMEDIATELY.
            </p>
          </section>

          <section id="t1">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">01</span> Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you, whether personally or on behalf of an entity (&quot;you&quot;) and TaskifyGames (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of the TaskifyGames mobile application, website, and associated services. You agree that by accessing the Services, you have read, understood, and agree to be bound by all of these Terms.
            </p>
          </section>

          <section id="t2">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">02</span> Intellectual Property Rights
            </h2>
            <p className="leading-relaxed">
              All source code, databases, software, website designs, audio, video, text, photographs, and graphics on the Services (&quot;Content&quot;) and the trademarks, service marks, and logos contained therein are owned or licensed by us and are protected by copyright and trademark laws. You may not use, copy, reproduce, aggregate, republish, upload, post, publicly display, encode, translate, transmit, distribute, sell, license, or exploit any Content without our express written permission.
            </p>
          </section>

          <section id="t3">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">03</span> User Representations
            </h2>
            <p className="leading-relaxed mb-4">By using the Services, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 13 years of age.</li>
              <li>You are not using VPNs, proxies, or engaging in fraudulent behavior.</li>
              <li>You have the legal capacity and agree to comply with these Terms.</li>
              <li>All information you provide is accurate and complete.</li>
            </ul>
          </section>

          <section id="t4">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">04</span> User Registration
            </h2>
            <p className="leading-relaxed">
              You may be required to register an account to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password.
            </p>
          </section>

          <section id="t5">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">05</span> Prohibited Activities
            </h2>
            <p className="leading-relaxed mb-4">You may not access or use the Services for any purpose other than that for which we make the Services available. Prohibited activities include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Systematic data scraping</li>
              <li>Using bots or automation</li>
              <li>Attempting to manipulate game mechanics, offers, or rewards</li>
              <li>Using VPNs, proxies, or emulators to fake location or device identity</li>
            </ul>
          </section>

          <section id="t6">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">06</span> User Generated Contributions
            </h2>
            <p className="leading-relaxed">
              Our services do not currently allow for user-generated content. Any unauthorised contributions will be removed, and the user may face account termination.
            </p>
          </section>

          <section id="t7">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">07</span> Contribution License
            </h2>
            <p className="leading-relaxed">
              Since users cannot post content, this clause is not applicable at this time.
            </p>
          </section>

          <section id="t8">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">08</span> Guidelines for Reviews
            </h2>
            <p className="leading-relaxed">
              If you post reviews of our Services on external platforms, you must ensure that the review is based on your actual experience and does not include offensive, misleading, or unlawful content.
            </p>
          </section>

          <section id="t9">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">09</span> Mobile Application License
            </h2>
            <p className="leading-relaxed mb-4">
              <strong>Use License</strong> — We grant you a revocable, non-exclusive, non-transferable, limited license to install and use the app on wireless electronic devices owned or controlled by you.
            </p>
            <p className="leading-relaxed">
              <strong>Apple and Android Devices</strong> — These Terms also apply to any mobile application access through the Apple App Store or Google Play Store. You must comply with their respective terms and policies in addition to ours.
            </p>
          </section>

          <section id="t10">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">10</span> Submissions
            </h2>
            <p className="leading-relaxed">
              Any suggestions, feedback, or ideas you provide become our property and may be used for any purpose. We are not obligated to provide any response or acknowledgment.
            </p>
          </section>

          <section id="t11">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">11</span> Advertisers
            </h2>
            <p className="leading-relaxed mb-4">
              We allow advertising through third-party platforms including AppLovin, GrowDeck, Pubscale, and others. These advertisers may collect data such as device identifiers, ad interactions, and usage metrics to serve personalised ads, prevent fraud, and analyse performance.
            </p>
            <p className="leading-relaxed">
              We do not control the content of third-party ads and are not responsible for their accuracy, legality, or functionality. Your interactions with any third-party advertiser are solely between you and the advertiser.
            </p>
          </section>

          <section id="t12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">12</span> Site Management
            </h2>
            <p className="leading-relaxed mb-4">We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Monitor the Services for violations of these Terms</li>
              <li>Take legal action against anyone who violates the law or these Terms</li>
              <li>Restrict access to, or disable, any portion of the Services</li>
            </ul>
          </section>

          <section id="t13">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">13</span> Privacy Policy
            </h2>
            <p className="leading-relaxed mb-4">
              Your use of our Services is also governed by our <a href="/privacy" className="text-[#a466ff] hover:underline">Privacy Policy</a>. This includes our use of Firebase and Google Analytics, and our data storage on Google Cloud. By using our Services, you consent to data collection and usage as described in the Privacy Policy.
            </p>
            <p className="leading-relaxed">
              This includes consent to the use of third-party advertising platforms such as AppLovin, which may use device and usage data for personalised advertising.
            </p>
          </section>

          <section id="t14">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">14</span> Term and Termination
            </h2>
            <p className="leading-relaxed">
              These Terms remain in full force while you use our Services. We may terminate or suspend your account at any time, without warning, if you violate these Terms or engage in prohibited behaviour (e.g., fraud, manipulation, VPN use).
            </p>
          </section>

          <section id="t15">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">15</span> Modifications and Interruptions
            </h2>
            <p className="leading-relaxed">
              We reserve the right to change, modify, or remove the contents of the Services at any time without notice. We cannot guarantee the Services will be available at all times.
            </p>
          </section>

          <section id="t16">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">16</span> Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of India, specifically under the jurisdiction of Azamgarh, Uttar Pradesh.
            </p>
          </section>

          <section id="t17">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">17</span> Dispute Resolution
            </h2>
            <p className="leading-relaxed mb-4">
              <strong>Binding Arbitration</strong> — Any dispute arising from these Terms will be resolved through final and binding arbitration, focusing only on service access or usage-related matters. No monetary compensation will be awarded or pursued by either party.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Restrictions</strong> — Disputes may only be arbitrated on an individual basis and shall not be consolidated with any other legal proceedings.
            </p>
            <p className="leading-relaxed">
              <strong>Exceptions to Arbitration</strong> — You or the Company may bring individual claims in small claims court or seek injunctive relief in a court of competent jurisdiction.
            </p>
          </section>

          <section id="t18">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4">
              <span className="font-pixel text-xl text-white/20">18–25</span> Miscellaneous
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">18. Corrections</h3>
                <p className="leading-relaxed">There may be typographical errors, inaccuracies, or omissions. We reserve the right to correct these without prior notice.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">19. Limitations of Liability</h3>
                <p className="leading-relaxed">We are not liable for any damages or losses resulting from the use or inability to use our Services. This includes data loss or system errors. Our Services are free and are not intended for any financial transactions or monetary expectations.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">20. Disclaimer</h3>
                <p className="leading-relaxed">The Services are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We disclaim all warranties, express or implied, including merchantability or fitness for a particular purpose.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">21. Indemnification</h3>
                <p className="leading-relaxed">You agree to defend, indemnify, and hold us harmless from any claims related to your misuse of the Services. This excludes any form of financial or monetary compensation.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">22. User Data</h3>
                <p className="leading-relaxed">We maintain the right to manage and store certain data you transmit to the Services. We are not liable for any data loss, and your data is stored on secure Google Cloud servers.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">23. Electronic Communications, Transactions, and Signatures</h3>
                <p className="leading-relaxed">You consent to receive electronic communications, and agree that all agreements, notices, disclosures, and other communications provided electronically satisfy legal requirements.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">23A. Third-Party SDKs and Services</h3>
                <p className="leading-relaxed">Our application uses third-party SDKs and APIs provided by platforms such as AppLovin, Google, Meta, GrowDeck, and Pubscale. These SDKs may collect anonymous device data, user behaviour, and ad interaction details to provide analytics and advertising services. You can learn more by reviewing the respective privacy policies of these partners.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">24. California Users and Residents</h3>
                <p className="leading-relaxed">If you are a California resident, you are entitled to request specific information about our disclosure of personal information to third parties. Please contact us at: admin@taskifygames.com</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">25. Miscellaneous</h3>
                <p className="leading-relaxed">These Terms constitute the entire agreement between you and TaskifyGames. If any provision is found unlawful, void, or unenforceable, the rest shall remain valid. No waiver of any term shall be deemed a further or continuing waiver.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4 flex items-baseline gap-4 mt-8 pt-8 border-t border-white/10">
              Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us:<br/><br/>
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
