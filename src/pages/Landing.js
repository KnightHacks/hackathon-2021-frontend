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
        <div className="flex justify-center items-center flex-col w-full mt-auto sm:mt-36">
          <img
            className="w-4/5 md:w-10/12 lg:5/12"
            src={theme === "dark" ? whiteLogo : darkLogo}
          />
          <p className="mt-4 text-xl w-full text-center font-palanquinbold">
            November 12th - November 14th, 2021
          </p>
          <p className="text-lg w-full text-center font-palanquinbold">
            Virtual
          </p>
          <p className="mt-4 text-md w-full text-center font-sansitaitalic">
            Registration is now closed. We welcome our 600+ hackers, mentors,
            and judges to Knight Hacks!
          </p>
          <div className="flex flex-col md:flex-row">
            <a
              href="https://discord.gg/CcZPUTFAuW"
              className={`
                relative group
                overflow-hidden
                px-4 py-2 md:mx-3 mt-4
                border-darkblue border-4
                rounded-xl text-2xl
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
        </div>
      </Page>
    </>
  );
};

export default Landing;
