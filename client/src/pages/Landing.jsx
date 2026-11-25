import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import SkillExchange from "../components/SkillExchange.jsx";
import PeerlyExchange from "../components/PeerlyExchange.jsx";
import AIAssistant from "../components/AIAssistant.jsx";
import PeerPoints from "../components/PeerPoints.jsx";
import Rewards from "../components/Rewards.jsx";
import TrustSafety from "../components/TrustSafety.jsx";
import FinalCTA from "../components/FinalCTA.jsx";
import Footer from "../components/Footer.jsx";

function Landing() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <SkillExchange />
        <PeerlyExchange />
        <AIAssistant />
        <PeerPoints />
        <Rewards />
        <TrustSafety />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}

export default Landing;

