import Page from "../components/Page";
import { Helmet } from "react-helmet";
// for testing only, not for final production
import TestLogo from "../assets/KnightHacksLogo.svg";
import Facebook from "../assets/sponsors/FBLogo.png";
import EA from "../assets/sponsors/EA.png";
import Google from "../assets/sponsors/GoogleCloud.png";
import UCF from "../assets/sponsors/UCF.png";
import TI from "../assets/sponsors/TI.png";
import Learner from "../assets/sponsors/Learner.png";
import synopsys from "../assets/sponsors/synopsys.png";
import NewEa from "../assets/sponsors/newEA.png";
import Microsoft from "../assets/sponsors/microsoft.png";
import Mantech from "../assets/sponsors/Mantech.png";
import NSIN from "../assets/sponsors/NSIN.png";
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
          Sponsors
        </h1>
        <div className="grid justify-items-center my-20">
          <div className="font-sansita text-2xl sm:text-4xl xl:text-4xl my-4">
            Coming soon!
          </div>
          <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
            Keep an eye out on this page for updates in the upcoming weeks.
          </div>
        </div>
      </Page>
    );
  }
  return (
    <Page title="Knight Hacks | Sponsors">
      <h1
        className={`
          text-4xl w-full text-center mt-10
          sm:text-4xl md:text-6xl
          lg:mt-20
          xl:text-5xl
          xl:text-6xl xl:mt-20
          2xl:text-7xl 2xl:mt-20
          font-sansita
        `}
      >
        Our Sponsors
      </h1>
      <div className="mt-14 divide-none font-sansitaregular text-center text-2xl">
        <div>
          Gold
          <div className="flex flex-col -space-y-20 items-center">
            <img
              className="transform scale-50"
              src={Microsoft}
              alt="Microsoft"
            />
            <img className="transform scale-50" src={Mantech} alt="Mantech" />
            <img
              className="transform scale-50"
              src={NSIN}
              alt="National Security Innovation Network"
            />
            <img className="transform scale-75" src={Facebook} alt="Facebook" />
          </div>
        </div>
        <div className="mt-6">
          Silver
          <img
            className="transform scale-75"
            src={TI}
            alt="Texas Instruments"
          />
        </div>
        <div className="mt-6">
          Bronze
          <div className="flex flex-col -space-y-12 items-center">
            <img
              className="transform scale-50"
              src={Google}
              alt="Google Cloud"
            />
            <img className="transform scale-50" src={synopsys} alt="Synopsys" />
            <img className="mt-20" src={EA} alt="Electronic Arts" />
          </div>
        </div>
        <div className="mt-6 mb-20">
          Partner Organizations
          <div className="flex flex-col -space-y-12 items-center">
            <img className="transform my-6 scale-100" src={UCF} alt="UCF" />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Sponsors;
