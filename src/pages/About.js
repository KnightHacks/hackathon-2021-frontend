import Page from "../components/Page";
/**
 * @desc About Page
 * @author Ro-Hanna Jowallah
 */
const About = () => {
  return (
    <Page onLanding={false} pageTitle="About">
      <div className="flex justify-start items-center w-full flex-col my-4 md:my-12">
        <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center">
          About Us
        </h1>
        <div className="my-2 flex flex-col items-center w-2/3">
          <div className="text-left font-extralight sm:text-lg  mb-2 text-lg sm:text-lg md:text-xl lg:text-2xl mt-24">
            <p>
              Connect Collaborate and Create with 700 of the brightest developers,
              engineers, and designers in the south-east. 
            </p>
            <p>
              Whether you’re a seasoned hacker or a tech newbie, Knight Hacks 
              welcomes you. Justbring an open mind and a insatiable desire to learn, 
              and we’ll take care of the rest.
            </p> 
            <p>
              Create a product, learn new skills and have fun
              with friends old and new – all in 36 hours.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default About;
