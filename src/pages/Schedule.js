import { Helmet } from "react-helmet";
import Page from "../components/Page";
import content from "../assets/content/schedule.json";
import ColorHash from "color-hash";
import stillLoadingFish from "../assets/loadingFish.png";
import loadingFish from "../assets/loadingFish.gif";

/**
 * @desc Displays Schedule using formatted events from JSON
 * @author Aileen
 */

const hash = new ColorHash({ lightness: 0.8 });
const Schedule = () => {
  const scheduleIncomplete = true;

  if (scheduleIncomplete) {
    return (
      <>
        <Helmet>
          <title>Knight Hacks | Schedule</title>
        </Helmet>
        <Page onLanding={false}>
          <h1 className="font-sansita my-10 justify-self-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            Schedule
          </h1>
          <div className="grid place-items-center mt-20">
            <div className="font-sansita text-2xl sm:text-3xl xl:text-4xl my-4">
              Coming soon!
            </div>
            <img
              className="w-3/5"
              src={loadingFish}
              alt="Loading spinner with two Koi fish swimming in a circle."
            />
          </div>
        </Page>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Knight Hacks | Schedule</title>
      </Helmet>
      <Page onLanding={false}>
        <div className="grid w-full flex-col my-4 md:my-12">
          <h1 className="my-10 justify-self-center text-4xl sm:text-4xl md:text-6xl xl:text-7xl font-sansita">
            Schedule
          </h1>
          {content.map((event, index) => {
            return (
              <div key={index} className="ml-24">
                <p className=" text-2xl sm:text-3xl xl:text-4xl my-4 font-palanquin">
                  {event.day}
                </p>
                {/* Mapping through the content in each events block in JSON */}
                {event.events.map((item, index) => (
                  <div key={index} className="mb-5">
                    <div className=" mb-1 text-base space-x-4 sm:text-lg md:text-xl xl:text-2xl font-palanquin">
                      <span className="font-palanquin"> {item.time} </span>{" "}
                      <span> {item.title} </span>
                    </div>
                    {/* Mapping through each string in the tags array in JSON */}
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: hash.hex(tag) }}
                        className="font-palanquin rounded-full px-2 py-1 mr-2 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Page>
    </>
  );
};

export default Schedule;
