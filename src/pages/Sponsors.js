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
/**
 * @desc sponsors page; still WIP since we are waiting on sponsors
 * @author Rob
 */
const Sponsors = () => {
  return (
    <Page title="Knight Hacks | Sponsors" onLanding={false}>
      <h1
        className={`
          text-4xl w-full text-center mt-10
          sm:text-4xl md:text-6xl
          lg:mt-20
          xl:text-6xl xl:mt-20
          2xl:text-7xl 2xl:mt-20
          font-sansita
        `}
      >
        Our Sponsors
      </h1>
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
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
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
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
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
        GOLD
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className="xl:w-96 lg:w-80 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8 mb-24"
          src={Facebook}
          alt="test logo"
        />
      </div>
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
        SILVER
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className="xl:w-96 lg:w-80 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8 mb-24"
          src={TI}
          alt="test logo"
        />
      </div>
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
        BRONZE
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className=" xl:w-24 lg:w-24 md:w-24 sm:w-24 sm:mr-7 sm:mt-8 mr-8 mb-24"
          src={EA}
          alt="test logo"
        />
        <img
          className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 mb-24 "
          src={Google}
          alt="test logo"
        />
        <img
          className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 mb-24 "
          src={Learner}
          alt="test logo"
        />
      </div>
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
        PARTNER ORGANIZATIONS
      </div>
      <div>_____________________________________</div>
      <div className="flex justify-center">
        <img
          className=" xl:w-96 lg:w-80 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8 mb-24"
          src={UCF}
          alt="test logo"
        />
      </div>
    </Page>
  );
};

export default Sponsors;
