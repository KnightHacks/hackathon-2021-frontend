import Page from "../components/Page";

/**
 * @desc About Page
 * @author Ro-Hanna Jowallah
 */
const About = () => {
  return (
    <Page title="Knight Hacks | About">
      <div className="flex justify-start items-center w-full flex-col my-4 md:my-12">
        <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center font-sansita">
          About Us
        </h1>
        <div className="my-2 flex flex-col sm:text-base md:text-xl xl:text-xl items-center w-2/3 ">
          <div className="text-left space-x-4  mb-2 mt-4 font-palanquin">
            <h1 className="text-xl mt-16 mb-4 sm:text-xl md:text-3xl text-left font-sansita">
              Who are we?
            </h1>
            Founded in 2015, Knight Hacks is a Registered Student Organization
            (RSO) at the University of Central Florida that covers all things
            tech and software development, as well as host our annual hackathon
            attended by students from around the world!
            <br />
            {""}
            <br />
            We host club events throughout every semester, which you can check
            out on our
            <a href="https://www.knighthacks.org">website</a>. Any and all
            students at UCF are welcome at our weekly events!
          </div>

          <div className="text-left space-x-4 mb-2 font-palanquin">
            <h1 className="text-xl mt-12 mb-4 sm:text-xl md:text-3xl text-left font-sansita">
              Our Hackathon
            </h1>
            Connect, collaborate, and create with over 700 of the brightest and
            most enthusiastic developers, engineers, and designers in the
            south-east and around the world!
            <br />
            {""}
            <br />
            Whether {"you're"} a season hacker or a complete tech newbie, Knight
            Hacks welcomes you! Just bring an open mind and a insatiable desire
            to learn, and {"we'll"} take care of the rest.
            <br />
            {""}
            <br />
            Create a product, learn new skills, and have fun with friends old
            and new - all in 36 hours!
            <br />
            {""}
            <br />
          </div>

          <div className="text-left space-x-4  mb-2 font-palanquin">
            <h1 className="text-xl mt-12 mb-4 sm:text-xl md:text-3xl text-left font-sansita">
              Beginner Track
            </h1>
            First time hacker? {"Don't"} have a lot of programming experience?
            {" Don't"} worry! {"Here's"} how we plan to make our hackathon
            beginner friendly.
            <br />
            {""}
            <br />
            <i>Beginner Friendly Hacker Packet</i>
            <ul>
              <li>
                This will include information to provide insight and inspiration
                to start developing a project.{" "}
              </li>
              <li>
                It includes times and descriptions of all the beginner focused
                events that we are going to have.
              </li>
            </ul>{" "}
            <br />
            <i>Beginner Workshops</i>
            <ul>
              <li>
                These will require little to any knowledge and introduce key
                knowledge for developing a project such as
                wireframing/prototyping, JavaScript, Python, and more!
              </li>
            </ul>{" "}
            <br />
            <i>Beginner Prize Track</i>
            <ol>
              <li>
                The purpose of this prize track is to encourage new hackers to
                submit and learn something by the end of the hackathon! Some
                judging criteria for this prize will primarily be based on
                having a strong and clear project proposal such as a good
                wireframe/ prototype, clear project requirements, and
                researching what technologies would be needed to fully implement
                the idea.{" "}
              </li>
            </ol>
            <br />
            <i>General Prize Track</i>
            <br />
            <ol>
              Choosing the beginner track does not disqualify you from winning a
              general track prize.
            </ol>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default About;
