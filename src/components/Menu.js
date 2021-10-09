import { Fragment } from "react";
import { CgMenu } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import VolumeButton from "./VolumeButton";

/**
 * @desc Renders menu component containing nav menu and volume
 * @param Takes a piece of state and its update function for when the menu is opened
 * @author Abraham Hernandez
 */

const Menu = ({ open, setOpen }) => {
  return (
    <div className="flex justify-center w-screen">
      <div
        className={
          "text-white flex flex-row sm:space-x-8 w-full px-6 pt-6 mt-8 " +
          (open ? "hidden" : "visible")
        }
      >
        <CgMenu
          className="text-4xl md:text-5xl cursor-pointer text-white"
          onClick={() => setOpen(!open)}
        />
        <div className="flex-1 sm:flex-none flex justify-end">
          <VolumeButton />
        </div>
      </div>
      <div className="col-span-1 w-14 justify-center sm:flex sm:w-11/12 sm:h-full sm:justify-end lg:w-full lg:mr-20 md:w-11/12 md:mr-6 ">
        <a
          id="mlh-trust-badge"
          className="block w-12 sm:w-20 md:w-28 mr-2"
          href="https://mlh.io/seasons/2022/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2022-season&utm_content=white"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-white.svg"
            alt="Major League Hacking 2022 Hackathon Season"
          />
        </a>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          id="modal"
          className="fixed inset-0 z-10 overflow-y-auto"
          static
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-menu-transparent" />
            </Transition.Child>

            <div className="sm:inline-block px-6 pt-6 mt-8 text-left align-middle transition-all transform">
              <Dialog.Title
                as="div"
                className="leading-6 text-white flex flex-row sm:space-x-8 w-full"
              >
                <CgMenu
                  className="text-4xl md:text-5xl cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
                <div
                  className={
                    "flex-1 sm:flex-none flex justify-end " +
                    (open ? "filter blur-md" : "cursor-pointer")
                  }
                >
                  <VolumeButton />
                </div>
              </Dialog.Title>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="mt-2 inline-block">
                  <ul className="text-4xl sm:text-5xl text-white inline-flex flex-col font-sansita">
                    <li className="m-2 inline-block">
                      <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="m-2 inline-block">
                      <Link
                        to="/about"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        About
                      </Link>
                    </li>
                    <li className="m-2 inline-block">
                      <Link
                        to="/sponsors"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        Sponsors
                      </Link>
                    </li>
                    <li className="m-2 inline-block">
                      <Link
                        to="/schedule"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        Schedule
                      </Link>
                    </li>
                    <li className="m-2 inline-block">
                      <Link
                        to="/faq"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        FAQ
                      </Link>
                    </li>
                    <li className="m-2 inline-block">
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="focus:outline-none hover:text-gray-300 focus:text-gray-300"
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Menu;
