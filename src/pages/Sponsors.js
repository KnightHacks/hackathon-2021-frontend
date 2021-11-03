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
        <div className="text-lg md:text-2xl">━━━━━━━ Gold ━━━━━━━</div>
        <div className="mt-6 mx-4 grid grid-cols-1 justify-items-center">
          <div className="self-center ">
            <a href="https://www.microsoft.com/university">
              <img className="h-20" src={Microsoft} />
            </a>
          </div>
          <div>
            <a href="https://www.mantech.com/students-and-new-graduates">
              <img className="h-32" src={Mantech} />
            </a>
          </div>
          <div className=" self-center">
            <a href="https://www.facebook.com/careers/students-and-grads/">
              <img className="h-auto md:h-20" src={darkFacebook} />
            </a>
          </div>
          <div>
            <a href="https://www.nsin.mil/">
              <img className="p-2 mt-6 h-36" src={NSIN} />
            </a>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-lg md:text-2xl">━━━━━━━ Silver ━━━━━━━</div>
          <div className="mt-6 ml-12 grid grid-cols-1 justify-items-center">
            <div className="self-center">
              <a href="https://careers.ti.com/">
                <img className="w-72" src={TIStacked} />
              </a>
            </div>
            <div>
              <a href="https://gs.com/careers/">
                <img className="h-36 mt-4" src={GSPrimary} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-lg md:text-2xl">━━━━━━ Bronze ━━━━━━</div>
          <div className="mt-6 ml-6 grid grid-cols-1 justify-items-center">
            <div>
              <a href="https://careers.google.com/students/">
                <img className="h-auto md:h-24" src={Google} />
              </a>
            </div>
            <div className="self-center">
              <a href="https://www.echo3d.co/">
                <img className="w-60" src={echo3D} />
              </a>
            </div>
            <div>
              <a href="https://www.synopsys.com/careers.html">
                <img className="mt-8 h-16" src={synopsys} />
              </a>
            </div>

            <div className="self-start">
              <a href="https://www.stickermule.com/">
                <img className="h-28" src={StickerMule} />
              </a>
            </div>
            <div className="self-center">
              <a href="https://linktr.ee/leadinglearners">
                <img src={Learner} />
              </a>
            </div>
            <div>
              <a href="https://www.ea.com/careers/students">
                <img className="h-24" src={EA} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 mb-20">
          <div className="text-xl md:text-2xl">Partner Organizations</div>
          <div className="mt-6 ml-12 grid grid-cols-1 justify-items-center">
            <div className="mt-6 self-center">
              <a href="https://career.ucf.edu/">
                <img
                  className="transform scale-100 2xl:scale-125"
                  src={CareerServices}
                />
              </a>
            </div>
            <div className="self-center col-span-2 mt-12">
              <a href="https://www.cecs.ucf.edu/">
                <img className="h-3/5" src={CECS} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Sponsors;
