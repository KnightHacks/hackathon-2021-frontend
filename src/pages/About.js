import { Helmet } from "react-helmet";
import Page from "../components/Page";

/**
 * @desc About Page
 * @author Ro-Hanna Jowallah
 */
const About = () => {
  return (
    <>
      <Helmet>
        <title>Knight Hacks | About</title>
      </Helmet>
      <Page onLanding={false}>
        <div className="flex justify-start items-center w-full flex-col my-4 md:my-12">
          <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center">
            About Us
          </h1>
          <div className="my-2 flex flex-col items-center w-2/3 ">
            <div className="text-left mb-2 text-lg sm:text-lg md:text-xl lg:text-2xl mt-24 font-palanquin">
              Connect Collaborate and Create with 700 of the brightest
              developers, engineers, and designers in the south-east.
              <br />
              {""}
              <br />
              Whether you’re a seasoned hacker or a tech newbie, Knight Hacks
              welcomes you. Just bring an open mind and a insatiable desire to
              learn, and we’ll take care of the rest.
              <br />
              {""}
              <br />
              Create a product, learn new skills and have fun with friends old
              and new – all in 36 hours.
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default About;
