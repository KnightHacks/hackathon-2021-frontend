import Page from "../components/Page";
import { Helmet } from "react-helmet";
// for testing only, not for final production
import TestLogo from "../assets/KnightHacksLogo.svg";
import Facebook from "../assets/sponsors/FBLogo.png";
import darkFacebook from "../assets/sponsors/miniFB.png";
import EA from "../assets/sponsors/EA.png";
import Google from "../assets/sponsors/GoogleCloud.png";
import CareerServices from "../assets/sponsors/UCF.png";
import CECS from "../assets/sponsors/CECS.png";
import TI from "../assets/sponsors/TI.png";
import TIStacked from "../assets/sponsors/TexasInstruments.png";
import Learner from "../assets/sponsors/Learner.png";
import synopsys from "../assets/sponsors/synopsys.png";
import NewEa from "../assets/sponsors/newEA.png";
import Microsoft from "../assets/sponsors/microsoft.png";
import Mantech from "../assets/sponsors/Mantech.png";
import NSIN from "../assets/sponsors/NSIN.png";
import echo3D from "../assets/sponsors/echo3Dwhite.png";
import GSPrimary from "../assets/sponsors/GSPrimary.jpg";
import StickerMule from "../assets/sponsors/stickermule-stacked.png";
/**
 * @desc sponsors page; still WIP since we are waiting on sponsors
 * @author Rob
 */
const Sponsors = () => {
  const sponsorsIncomplete = false;
  if (sponsorsIncomplete) {
    return (
      <Page title="Knight Hacks | Sponsors">
        <h1 className="font-sansita my-10 justify-self-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
          Registration is closed.
        </h1>
        <div className="grid justify-items-center my-20">
          <div className="font-sansita text-2xl sm:text-4xl xl:text-4xl my-4">
            Nice try, hacker!
          </div>
          <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
            We are no longer accepting registrations. However, we hope to see
            you at Knight Hacks 2022!
          </div>
        </div>
      </Page>
    );
  }
};

export default Sponsors;
