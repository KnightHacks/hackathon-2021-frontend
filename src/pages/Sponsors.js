import Page from "../components/Page";

// for testing only, not for final production
import TestLogo from "../assets/KnightHacksLogo.svg";

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
          lg:mt-32
          xl:text-6xl xl:mt-36
          2xl:text-7xl 2xl:mt-36
          font-sansita
        `}
      >
        Our Sponsors
      </h1>
      <div className="text-center sm:text-base md:text-2xl lg:text-3xl xl:text-4xl sm:mt-8 sm:mb-.5 space-x-4 mt-14 mb-2 font-palanquin font-bold">
        DIAMOND
      </div>
      <div>_________________________________________</div>
      <div className="flex justify-center ">
        <img
          className=" xl:w-80 lg:w-56 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 "
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
          className=" xl:w-80 lg:w-56 md:w-44 sm:w-28 sm:mr-7 sm:mt-8 mr-8"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="xl:w-80 lg:w-56 md:w-44 sm:mt-8 sm:w-28 mr-8 "
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
        SILVER
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
        BRONZE
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
    </Page>
  );
};

export default Sponsors;
