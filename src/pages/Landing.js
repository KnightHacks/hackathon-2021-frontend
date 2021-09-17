import { Link } from "react-router-dom";
import Page from "../components/Page";

/**
 * @desc Renders Landing page of the site
 * @author Abraham Hernandez
 */
const Landing = () => {
  return (
    <Page title="Knight Hacks" onLanding={true}>
      <div className="flex justify-center items-center flex-col w-full mt-auto">
        <div className="bg-knight-hacks-logo w-full h-20 md:h-36 bg-no-repeat my-2 md:my-4 bg-center font-palanquin" />
        <p className="text-xl w-full text-center font-palanquin">
          November 12th - November 14th, 2021
        </p>
      </div>
    </Page>
  );
};

export default Landing;
