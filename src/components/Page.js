import { useState } from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterLine } from "react-icons/ri";
import { Helmet } from "react-helmet";

/**
 * @desc Renders template layout for all pages
 * @param Takes the children JSX elements and a boolean value thats true if the current page is the Landing page
 * @author Abraham Hernandez
 */

const Page = ({ children, onLanding, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div
        className={
          "absolute bg-koi-fish-pond bg-no-repeat bg-cover w-full h-screen flex flex-col items-center sm:items-center sm:grid sm:grid-cols-5 sm:grid-rows-1 sm:grid-flow-col sm:gap-0 " +
          (open ? "filter blur-md" : "")
        }
      >
        <div className="sm:col-span-1 w-full h-3/20 sm:h-full">
          <Menu open={open} setOpen={setOpen} />
        </div>

        <div className="sm:col-span-3 text-white w-19/20 h-17/20 sm:h-19/20 flex justify-center sm:items-center">
          <div className="flex items-center w-full h-19/20 sm:h-full bg-landing-transparent rounded-2xl flex-col overflow-y-auto p-2">
            {children}
            <div className="flex flex-row w-full justify-center mb-8 space-x-8 text-4xl sm:text-5xl md:text-6xl mt-auto">
              <a href="https://twitter.com/KnightHacks?lang=en/">
                <RiTwitterLine className="p-2 rounded-xl hover:shadow-md" />
              </a>
              <a href="https://www.instagram.com/knighthacks/">
                <FaInstagram className="p-2 rounded-xl hover:shadow-md" />
              </a>
              <a href="https://www.facebook.com/KnightHacks/">
                <TiSocialFacebook className="p-2 rounded-xl hover:shadow-md" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
