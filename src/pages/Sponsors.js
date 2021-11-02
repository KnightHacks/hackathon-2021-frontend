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
      <div className="mt-14 divide-none font-sansita text-center text-2xl">
        <div>━━━━━━━━ Gold ━━━━━━━━</div>
        <div className="mt-6 mx-4 grid grid-cols-3 justify-items-center">
          <div className="self-center col-span-3">
            <img className="h-24" src={Microsoft} />
          </div>
          <div>
            <img src={Mantech} />
          </div>
          <div className=" self-center">
            <img src={darkFacebook} />
          </div>
          <div>
            <img className="p-2" src={NSIN} />
          </div>
        </div>
        <div className="mt-6">
          <div>━━━━━━━━ Silver ━━━━━━━━</div>
          <div className="mt-6 ml-12 grid grid-cols-2 justify-items-center">
            <div className="self-center">
              <img className="w-66" src={TIStacked} />
            </div>
            <div>
              <img className="h-36" src={GSPrimary} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>━━━━━━━━ Bronze ━━━━━━━━</div>
          <div className="mt-6 ml-12 grid grid-cols-3 justify-items-center">
            <div className=" self-center ">
              <img src={echo3D} />
            </div>
            <div className="col-span-2 ">
              <img className="h-24" src={Google} />
            </div>
            <div className="col-span-2 mt-4">
              <img src={synopsys} />
            </div>
            <div>
              <img className="h-24" src={EA} />
            </div>
            <div className="col-span-3">
              <img className="w-66" src={Learner} />
            </div>
          </div>
        </div>
        <div className="mt-6 mb-20">
          <div>Partner Organizations</div>
          <div className="mt-6 ml-12 grid grid-cols-1 justify-items-center">
            <div className="mt-6 self-center">
              <img className="transform scale-100" src={CareerServices} />
            </div>
            <div className="self-center col-span-2 mt-6">
              <img className="h-3/5" src={CECS} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Sponsors;
