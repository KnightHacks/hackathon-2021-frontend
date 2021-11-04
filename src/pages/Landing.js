import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import darkLogo from "../assets/Navy_Gi_Logo_-_Transparent.png";
import whiteLogo from "../assets/whitelogo.png";
import { ThemeSwitch } from "../context/ThemeSwitch";

/**
 * @desc Renders Landing page of the site
 * @author Abraham Hernandez
 */
const Landing = () => {
  const { theme, setTheme } = useContext(ThemeSwitch);

  return (
    <>
      <Helmet>
        <title>Knight Hacks</title>
      </Helmet>
      <Page onLanding={true}>
        <div className="flex justify-center items-center flex-col w-full mt-auto sm:mt-20">
          <img
            className="w-4/5 md:w-10/12 lg:5/12"
            src={theme === "dark" ? whiteLogo : darkLogo}
          />
          <p className="mt-4 text-xl w-full text-center font-palanquinbold">
            November 12th - November 14th, 2021
          </p>
          <Link
            className={`
              font-palanquin
              px-4 sm:px-6 md:px-12 py-2
              border-darkblue border-4 md:border-4
              rounded-xl text-xl sm:text-3xl md:text-4xl
              mt-4 md:mt-8
              hover:border-darkblue hover:shadow-lg
              transition duration-1000 ease-in-out
              hover:text-purewhite
              hover:bg-darkblue
              shadow-md
              focus:outline-none
              focus:ring-4
              focus:ring-darkblue
              dark:border-purewhite
              dark:focus:ring-purewhite
            `}
            to="/register"
          >
            <p className=" tracking-widest select-none" unselectable="on">
              REGISTER
            </p>
          </Link>
          <div className="flex flex-col md:flex-row">
            <a
              href="mailto:sponsorship@knighthacks.org"
              className={`
                relative group
                overflow-hidden
                px-4 py-2 md:mx-3 mt-4
                border-darkblue border-4
                rounded-xl text-lg
                font-palanquin
                hover:text-purewhite
                hover:bg-darkblue
                hover:bg-opacity-70
                hover:shadow-md
                hover:bg-gradient-to-r
                ease-out duration-300
                focus:outline-none
                focus:ring-4
                focus:ring-darkblue
                shadow-sm
                dark:border-purewhite
                dark:focus:ring-purewhite
              `}
            >
              <span
                className={`
                absolute rounded-xl
                right-0 w-8 h-32 -mt-12
                transition-all duration-1000 transform translate-x-12
                bg-white opacity-10 rotate-12
                group-hover:-translate-x-40 ease
                `}
              />
              <p className="relative">Sponsor Us</p>
            </a>
            <a
              href="https://discord.gg/CcZPUTFAuW"
              className={`
                relative group
                overflow-hidden
                px-4 py-2 md:mx-3 mt-4
                border-darkblue border-4
                rounded-xl text-lg
                font-palanquin
                hover:text-purewhite
                hover:bg-darkblue
                hover:bg-opacity-70
                hover:shadow-md
                hover:bg-gradient-to-r
                ease-out duration-300
                focus:outline-none
                focus:ring-4
                focus:ring-darkblue
                shadow-sm
                dark:border-purewhite
                dark:focus:ring-purewhite
              `}
            >
              <span
                className={`
                absolute rounded-xl
                right-0 w-8 h-32 -mt-12
                transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12
                group-hover:-translate-x-40 ease
                `}
              />
              <p className="relative">Join Discord</p>
            </a>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeEFBCaQCqMZdN2cYgYhVCC1kAERxvWqWF_dJZqrxSDMsMuPA/viewform"
            className={`
              relative group
              overflow-hidden
              px-4 break-words md:px-10 py-2 md:mx-3 mt-4
              border-darkblue border-4
              rounded-xl text-lg
              font-palanquin
              hover:text-purewhite
              hover:bg-darkblue
              hover:bg-opacity-70
              hover:shadow-md
              hover:bg-gradient-to-r
              ease-out duration-300
              focus:outline-none
              focus:ring-4
              focus:ring-darkblue
              shadow-sm
              dark:border-purewhite
              dark:focus:ring-purewhite
            `}
          >
            <span
              className={`
              absolute rounded-xl
              right-0 w-8 h-32 -mt-12
              transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12
              group-hover:-translate-x-40 ease
              `}
            />
            <p className="relative">Become a Mentor / Judge</p>
          </a>
        </div>
      </Page>
    </>
  );
};

export default Landing;
