import { Helmet } from "react-helmet";
import Page from "../components/Page";

// for testing only, not for final production
import TestLogo from "../assets/KnightHacksLogo.svg";

/**
 * @desc sponsors page; still WIP since we are waiting on sponsors
 * @author Rob
 */
const Sponsors = () => {
  const sponsorsIncomplete = true;

  if (sponsorsIncomplete) {
    return (
      <>
        <Helmet>
          <title>Knight Hacks | Sponsors</title>
        </Helmet>
        <Page onLanding={false}>
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
      </>
    );
  }
  return (
    <Page title="Knight Hacks | Sponsors" onLanding={false}>
      <h1
        className={`
          text-4xl w-full text-center mt-16
          sm:text-4xl md:text-6xl
          lg:mt-32
          xl:text-6xl xl:mt-36
          2xl:text-7xl 2xl:mt-36
          font-sansita
        `}
      >
        Our Sponsors
      </h1>
      <div className="flex flex-col flex-wrap content-center">
        <img
          className="w-2/3 xl:w-96 ml-36 my-10"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="w-2/3 xl:w-96 mr-36 my-10 transform rotate-180"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="w-2/3 xl:w-96 ml-36 my-10"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="w-2/3 xl:w-96 ml-36 my-10"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="w-2/3 xl:w-96 mr-36 my-10 transform rotate-180"
          src={TestLogo}
          alt="test logo"
        />
        <img
          className="w-2/3 xl:w-96 ml-36 my-10"
          src={TestLogo}
          alt="test logo"
        />
      </div>
    </Page>
  );
};

export default Sponsors;
