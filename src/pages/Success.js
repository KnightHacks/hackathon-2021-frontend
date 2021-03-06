import React from "react";
import Page from "../components/Page";
import { AiOutlineCheckCircle } from "react-icons/ai";
/**
 * @desc success state for the registration form
 * @author Ro-Hanna
 */
function Success() {
  return (
    <Page title="Success">
      <div className="flex justify-start items-center w-full flex-col my-4 md:my-12">
        <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center font-sansita">
          Register
        </h1>
        <AiOutlineCheckCircle className="object-fill mt-24 h-28 w-full " />
        <h1 className="text-4xl sm:text-2xl md:text-3xl text-center font-sansita">
          Thank you for applying!
        </h1>

        <div className="my-2 flex flex-col  sm:text-base md:text-xl xl:text-2xl items-center w-2/3 ">
          <div className="text-center space-x-4  mb-2 font-palanquin">
            Look out for an acceptance email in the upcoming weeks.
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Success;
