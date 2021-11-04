import { useState, useContext, useEffect, createContext } from "react";
import Menu from "./Menu";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterLine } from "react-icons/ri";
import { RiMoonClearLine } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { Helmet } from "react-helmet";
import { ThemeSwitch } from "../context/ThemeSwitch";
import LightAnimation from "../assets/lotties/light_mode";
import DarkAnimation from "../assets/lotties/dark_mode";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

/**
 * @desc Renders template layout for all pages
 * @param Takes the children JSX elements and a boolean value thats true if the current page is the Landing page
 * @author Abraham Hernandez
 */

const Page = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeSwitch);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Player
        className=" transition-all duration-500 ease-in-out absolute bottom-0 top-0 left-0 right-0"
        autoplay
        loop
        rendererSettings={{ preserveAspectRatio: "xMinYMin slice" }}
        background="black"
        src={theme === "dark" ? DarkAnimation : LightAnimation}
        style={{
          margin: 0,
          padding: 0,
          bottom: 0,
          top: 0,
          right: 0,
          left: 0,
          position: "absolute",
          height: "100vh",
          width: "100vw",
        }}
      />
      <div
        className={
          "absolute transition-all duration-500 ease-in-out bg-no-repeat bg-cover w-full h-screen flex flex-col items-center sm:items-center sm:grid sm:grid-cols-5 sm:grid-rows-1 sm:grid-flow-col sm:gap-0 " +
          (open ? "filter blur-md" : "")
        }
      >
        <div className="sm:col-span-1 w-full h-3/20 sm:h-full">
          <Menu open={open} setOpen={setOpen} />
        </div>

        <div className="sm:col-span-3 text-darkblue dark:text-purewhite w-19/20 h-17/20 sm:h-19/20 flex justify-center sm:items-center">
          <div className="flex items-center w-full h-19/20 sm:h-full backdrop-filter backdrop-blur-sm bg-landing-transparent rounded-2xl flex-col overflow-y-auto p-2">
            {children}
            <div className="flex flex-row w-full justify-center mb-8 space-x-8 text-4xl sm:text-5xl md:text-6xl mt-auto">
              <a
                aria-label="Twitter Icon"
                href="https://twitter.com/KnightHacks?lang=en/"
                className="ease-out duration-300 rounded-xl focus:outline-none focus:ring focus:ring-darkblue dark:focus:ring-purewhite focus:border-4"
              >
                <RiTwitterLine className="p-2 rounded-xl hover:shadow-md" />
              </a>
              <a
                aria-label="Instagram Icon"
                href="https://www.instagram.com/knighthacks/"
                className="ease-out duration-300 rounded-xl focus:outline-none focus:ring focus:ring-darkblue dark:focus:ring-purewhite focus:border-4"
              >
                <FaInstagram className="p-2 rounded-xl hover:shadow-md" />
              </a>
              <a
                aria-label="Facebook Icon"
                href="https://www.facebook.com/KnightHacks/"
                className="ease-out duration-300 rounded-xl focus:outline-none focus:ring focus:ring-darkblue dark:focus:ring-purewhite focus:border-4"
              >
                <TiSocialFacebook className="p-2 rounded-xl hover:shadow-md" />
              </a>
              <div className="transition duration-500 ease-in-out">
                {theme === "dark" ? (
                  <BiSun
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 rounded-xl hover:shadow-md cursor-pointer"
                  />
                ) : (
                  <RiMoonClearLine
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 rounded-xl hover:shadow-md cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
