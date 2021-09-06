import { Helmet } from "react-helmet";
import Page from "../components/Page";
import content from "../assets/content/schedule.json";
import ColorHash from "color-hash";
import { createEvent } from "ics";
import dayjs from "dayjs";
import { FcCalendar } from "react-icons/fc";

/**
 * Generates an iCal string from the input.
 * @param {*} event The event to generate from.
 * @returns {Promise<string>} The stringfied ics file.
 */
function createICS(event) {
  return new Promise((resolve, reject) => {
    // This is just temporary code until events have actual dates.
    const date = new Date("2021-09-09T22:00:00Z");
    const end = new Date("2021-09-09T23:00:00Z");
    const parsed = dayjs(date);
    const parsedEnd = dayjs(end);
    const duration = parsedEnd.diff(parsed, "hours", true);

    console.log(duration);

    createEvent(
      {
        title: event.title,
        duration: {
          hours: duration,
        },
        start: [
          parsed.year(),
          parsed.month() + 1,
          parseInt(parsed.format("D")),
          parsed.hour(),
          parsed.minute(),
        ],
      },
      (error, value) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(value);
      }
    );
  });
}

/**
 * Event handler for when calendar button is clicked.
 */
async function onCalendarClick(event) {
  const icsStr = await createICS(event);
  window.open(`data:text/calendar;charset=utf8,${encodeURI(icsStr)}`);
}

/**
 * @desc Displays Schedule using formatted events from JSON
 * @author Aileen
 */
const hash = new ColorHash({ lightness: 0.8 });
const Schedule = () => {
  return (
    <>
      <Helmet>
        <title>Knight Hacks | Schedule</title>
      </Helmet>
      <Page onLanding={false}>
        <div className="grid w-full flex-col my-4 md:my-12">
          <h1 className="my-10 justify-self-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            Schedule
          </h1>
          {content.map((event, index) => {
            return (
              <div key={index} className="ml-24">
                <p className="font-medium text-2xl sm:text-3xl xl:text-4xl my-4">
                  {event.day}
                </p>
                {/* Mapping through the content in each events block in JSON */}
                {event.events.map((item, index) => (
                  <div key={index} className="mb-5">
                    <div className="font-thin mb-1 text-base space-x-4 sm:text-lg md:text-xl xl:text-2xl">
                      <span className="font-light"> {item.time} </span>{" "}
                      <span> {item.title} </span>
                      <button
                        onClick={() => onCalendarClick(item)}
                        title="Add to calendar"
                      >
                        <FcCalendar />
                      </button>
                    </div>

                    {/* Mapping through each string in the tags array in JSON */}
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: hash.hex(tag) }}
                        className="font-light rounded-full px-2 py-1 mr-2 text-gray-600"
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
