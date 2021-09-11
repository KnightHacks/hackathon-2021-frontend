import { Helmet } from "react-helmet";
import { useState, useRef } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Page from "../components/Page";

/**
 * @desc Registration page where hackers can sign up for the hackathon. After
 * submitting, the backend is updated and they will recieve a success message
 * on the page.
 *
 * @author Rob
 */
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState(null);
  const [graduation, setGraduation] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const trackOptions = ["Beginner", "Advanced"];
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0]);

  const attendingOptions = ["In Person", "Virtual"];
  const [attendingOption, setAttendingOption] = useState(attendingOptions[0]);

  // "unset" | "success" | "failure" | "pending"
  const [registrationState, setRegistrationState] = useState("unset");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const submitRegistration = async (event) => {
    event.preventDefault();
    switch (registrationState) {
      case "pending":
        setFeedbackMessage("Registration is being processed!");
        break;
      case "success":
        setFeedbackMessage("Registration already successful!");
        break;
      default:
        setRegistrationState("pending");
        setFeedbackMessage("Processing registration...");
      // const response = await createHacker(
      //   firstName,
      //   lastName,
      //   schoolName,
      //   email,
      //   phoneNumber,
      //   resume,
      //   selectedTrack,
      //   graduation,
      //   [github, linkedIn],
      //   attendingOption,
      //   dietaryRestrictions
      //   "hacker"
      // );
      // if (response.ok) setRegistrationState("success");
      // else setRegistrationState("failure");
    }
  };

  return (
    <>
      <Helmet>
        <title>Knight Hacks | Register</title>
      </Helmet>
      <Page onLanding={false}>
        <h1 className="text-4xl sm:text-4xl mt-20 mb-4 md:text-6xl text-center font-sansita">
          Register
        </h1>
        <form onSubmit={submitRegistration} className="flex flex-col">
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <TextInputBox label="First Name:" setter={setFirstName} />
            <TextInputBox label="Last Name:" setter={setLastName} />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <TextInputBox
              label="Phone:"
              pattern="^\(?\d{3}\)?-?\d{3}-?\d{4}$"
              setter={setPhoneNumber}
            />
            <TextInputBox label="Email:" pattern=".+@.+" setter={setEmail} />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <TextInputBox label="School Name:" setter={setSchoolName} />
            <TextInputBox
              label="Graduation Year:"
              pattern="^\d{4}$"
              setter={setGraduation}
            />
          </div>
          <TextInputBox
            label="Dietary Restrictions"
            setter={setDietaryRestrictions}
          />
          <div className="flex flex-col md:flex-row md:space-x-4 justify-center">
            <TextInputBox label="Github:" setter={setGithub} />
            <TextInputBox label="LinkedIn:" setter={setLinkedIn} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col md:flex-row md:space-x-4 items-center">
              <FileUploadBox
                handleFile={(fileUploaded) => setResume(fileUploaded)}
                title="Upload Resume"
              />
              <p className="visible md:hidden">
                {(resume && "Filename: " + resume.name) ||
                  "(PDF file required)"}
              </p>
              <OptionSelector
                title="Track:"
                trackOptions={trackOptions}
                selectedTrack={selectedTrack}
                setSelectedTrack={setSelectedTrack}
              />
              <OptionSelector
                title="Attendance:"
                trackOptions={attendingOptions}
                selectedTrack={attendingOption}
                setSelectedTrack={setAttendingOption}
              />
            </div>
            <p className="hidden md:block">
              {(resume && "Filename: " + resume.name) || "(PDF file required)"}
            </p>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className={`
              bg-blue-600 rounded-lg m-6 py-2 px-4
              hover:bg-blue-700
              active:bg-blue-800
              w-72
            `}
              value="Submit"
            />
          </div>
        </form>
      </Page>
    </>
  );
};

/**
 * @desc An input box component with useful defaults. Use similarly to a
 * controlled component, except you only have to provide a setter function using
 * the `setter` prop if you want the typical `event =>
 * setter(event.target.value)` pattern. You can override `onChange` if you wish,
 * but then `setter` will have no effect and you must set `value` to the correct
 * value yourself.
 * @prop label
 * @prop setter
 * @author Rob
 */
const TextInputBox = ({ label, setter, ...props }) => {
  const [value, setValue] = useState("");
  return (
    <div className="my-4 flex-1">
      <label>
        <span>{label}</span>
        <input
          className="text-gray-800 p-2 w-full px-4 py-2 border-b border-gray-900 bg-transparent focus:outline-none hover:border-blue-400 focus:border-blue-500 font-light"
          type="text"
          onChange={(event) => {
            setValue(event.target.value);
            setter(event.target.value);
          }}
          value={value}
          {...props}
        />
      </label>
    </div>
  );
};

/**
 * @desc A customizable file upload field.
 * @prop file: the current file selected, CAN BE NULL.
 * @prop handleFile: Callback function for when a file has been selected.
 * @prop defaultValue: The default text shown when no file has been selected.
 * @author Abraham Hernandez
 */
const FileUploadBox = ({ handleFile, title }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <div className="h-full justify-center items-center flex-1">
      <span>Resume:</span>
      <button
        onClick={handleClick}
        className={`
              bg-blue-600 rounded-lg mx-4 my-6 py-2 px-4
              hover:bg-blue-700
              active:bg-blue-800 max-w-xs
              truncate
              `}
      >
        <p className="truncate">{title}</p>
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

/**
 * @desc A Listbox for selecting a hackathon track. Modified from existing code from Rob.
 * @prop title: A string for the title
 * @prop trackOptions: An array of strings containing the track options.
 * @prop selectedTrack: A string containing the current track option selected.
 * @prop setSelectedTrack: A state set function for selecting a track.
 * @author Abraham Hernandez, Rob
 */
const OptionSelector = ({
  title,
  trackOptions,
  selectedTrack,
  setSelectedTrack,
}) => {
  return (
    <div className="w-72 h-full mt-4 md:mt-0 flex flex-row space-x-4 items-center">
      <span>{title}</span>
      <Listbox value={selectedTrack} onChange={setSelectedTrack}>
        <div className="relative mt-1 flex-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-gray-900 font-medium">
              {selectedTrack}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {trackOptions.map((track, trackIdx) => (
              <Listbox.Option
                key={trackIdx}
                className={({ active }) =>
                  `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={track}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {track}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-blue-600" : "text-blue-600"
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

/**
 * @desc attempts to create a hacker on the backend
 * @author Rob
 */
const createHacker = async (
  first_name,
  last_name,
  school_name,
  email,
  phone_number,
  resume,
  track,
  grad_year,
  socials,
  password
) => {
  return fetch("/api/hackers/", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      current_status: false,
      date: new Date().toISOString(),
      email,
      first_name,
      grad_year,
      last_name,
      password,
      phone_number,
      resume,
      school_name,
      socials,
      tracks: [track],
    }),
  });
};

export default Register;
