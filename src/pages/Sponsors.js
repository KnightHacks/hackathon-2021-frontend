import Page from "../components/Page";

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
  const sponsorsIncomplete = true;
  return (
    <Page title="Knight Hacks | Sponsors" onLanding={false}>
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

      <div className="text-center sm:text-xl  md:text-3xl lg:text-4xl xl:text-5xl mb-4 space-x-4 mt-8  font-palanquin font-bold">
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
      <div className="text-center sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl space-x-4 font-palanquin font-bold mt-8">
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
      <div className="text-center sm:text-xl mt-10 md:text-3xl lg:text-4xl xl:text-5xl sm:mt-8 sm:mb-.5 space-x-4  mb-2 font-palanquin font-bold">
        BRONZE
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center content-between -space-x-48 md:-space-x-52 lg:-space-x-72 xl:-space-x-96 2xl:-space-x-96  ">
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
      <div className="text-center sm:text-xl mt-4 md:text-3xl lg:text-4xl xl:text-5xl space-x-4 font-palanquin font-bold mt-14">
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
