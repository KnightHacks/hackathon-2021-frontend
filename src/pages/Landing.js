import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Page from "../components/Page";

/**
 * @desc Renders Landing page of the site
 * @author Abraham Hernandez
 */
const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Knight Hacks</title>
      </Helmet>
      <Page onLanding={true}>
        <div className="flex justify-center items-center flex-col w-full mt-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl w-full text-center ">
            Welcome to
          </h1>
          <div
            className={`
            bg-knight-hacks-logo
            w-full h-20 md:h-36 bg-no-repeat
            my-2 md:my-4 bg-center
            font-palanquin"
            `}
          />
          <p className="text-xl w-full text-center font-palanquin">
            November 12th - November 14th, 2021
          </p>
          <Link
            className={`
              px-4 sm:px-6 md:px-12 py-2
              border-white border-4 md:border-8
              rounded-full text-xl sm:text-3xl md:text-4xl
              mt-4 md:mt-8 hover:bg-blue-400 focus:outline-none
            `}
            to="/register"
          >
            <p className="tracking-widest select-none" unselectable="on">
              REGISTER
            </p>
          </Link>
          <div className="flex flex-col md:flex-row">
            <a
              href="mailto:sponsorship@knighthacks.org"
              className={`
                px-4 py-2 md:mx-3 mt-4
                border-white border-4
                rounded-full text-xl
                font-palanquin
                hover:bg-blue-400 focus:outline-none
              `}
            >
              <p>Sponsor Us</p>
            </a>
            <a
              href="https://discord.gg/CcZPUTFAuW"
              className={`
                px-4 py-2 md:mx-3 mt-4
                border-white border-4
                rounded-full text-xl
                font-palanquin
                hover:bg-blue-400 focus:outline-none
              `}
            >
              <p>Join Discord</p>
            </a>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Landing;
