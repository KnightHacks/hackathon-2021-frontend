import Page from "../components/Page";
import { Helmet } from "react-helmet";
// for testing only, not for final production
import TestLogo from "../assets/KnightHacksLogo.svg";
import Facebook from "../assets/FBLogo.png";
import EA from "../assets/EA.png";
import Google from "../assets/GoogleCloud.png";
import UCF from "../assets/UCF.png";
import TI from "../assets/TI.png";
import Learner from "../assets/Learner.png";
import synopsys from "../assets/synopsys.jpg";
import NewEa from "../assets/newEA.png";
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
      <div className="hidden ">
        <div className="text-center hidden sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-0 space-x-4 mt-14 mb-2 font-palanquin font-bold">
          DIAMOND
        </div>
        <div>_____________________________________</div>
        <div className="flex justify-center">
          <img
            className=" xl:w-80 lg:w-56 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8 mb-24"
            src={TestLogo}
            alt="test logo"
          />
          <img
            className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 mb-24 "
            src={TestLogo}
            alt="test logo"
          />
        </div>
        <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-0 sm:mb-.5 space-x-4 mb-2 font-palanquin font-bold">
          PLATINUM
        </div>
        <div>_____________________________________</div>
        <div className="flex justify-center">
          <img
            className=" xl:w-80 lg:w-56 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8 mb-24"
            src={TestLogo}
            alt="test logo"
          />
          <img
            className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 mb-24 "
            src={TestLogo}
            alt="test logo"
          />
        </div>
      </div>

      <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
        GOLD
      </div>

      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className="transform scale-50 lg:scale-50"
          src={Facebook}
          alt="test logo"
        />
      </div>
      <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
        SILVER
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className="transform scale-50 lg:scale-50 mt-8"
          src={TI}
          alt="test logo"
        />
      </div>
      <div className="text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
        BRONZE
      </div>
      <div>_____________________________________</div>
      <div className="mt-2 flex justify-center content-between -space-x-48 md:-space-x-52 lg:-space-x-72 xl:-space-x-96 2xl:-space-x-96  ">
        <img className="transform scale-50  " src={Google} alt="test logo" />
        <img
          className=" transform scale-50  2xl:scale-60 2xl:mr-24"
          src={Learner}
          alt="test logo"
        />
      </div>
      <div className="flex justify-center content-between ">
        <img
          className=" transform scale-y-100 scale-x-100 md:scale-y-150 md:scale-x-150 xl:scale-x-200 xl:scale-y-200 2xl:scale-x-250 2xl:scale-y-250 "
          src={EA}
          alt="EA Logo"
        />
      </div>
      <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4 mt-14">
        PARTNER ORGANIZATIONS
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className="transform scale-75 xl:mt-10 xl:scale-100 2xl:scale-150 md:scale-100 md:mb-10"
          src={UCF}
          alt="test logo"
        />
      </div>
    </Page>
  );
};

export default Sponsors;
