import Page from "../components/Page";
import { Disclosure, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import list from "../assets/content/faq.json";

/**
 * @desc Renders FAQ page using dropdowns
 * @author Abraham Hernandez
 */
const FAQ = () => {
  return (
    <Page title="Knight Hacks | FAQ">
      <div className="flex justify-start items-center w-full flex-col my-4 md:my-12">
        <h1 className="text-4xl sm:text-4xl md:text-6xl mt-20 mb-4 font-sansita">
          FAQ
        </h1>
        <div className="my-4 flex flex-col items-center w-2/3">
          {list.map((item, index) => (
            <Disclosure
              as="div"
              className="mb-2 w-full rounded-lg shadow-md font-palanquin"
              key={index}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      open ? "rounded-t-lg" : "rounded-lg"
                    } flex justify-between w-full px-4 py-2 text-xl font-palanquin text-left cursor-pointer text-darkblue dark:text-purewhite bg-opaque-blue hover:bg-darkblue hover:text-purewhite hover:bg-opacity-70 ease-out duration-300
                    focus:outline-none
                    focus:ring-4
                    focus:ring-darkblue`}
                  >
                    <span>{item.question}</span>
                    <HiChevronDown
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-gray-50`}
                    />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-200 ease-linear"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition duration-100 ease-linear"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                  >
                    <Disclosure.Panel
                      static
                      className="text-left text-base sm:text-lg text-darkblue dark:text-purewhite px-8 py-2 bg-opaque-blue rounded-b-lg"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default FAQ;
