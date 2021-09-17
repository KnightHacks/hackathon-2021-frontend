import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import Page from "../components/Page";

/**
 * @desc Registration page where hackers can sign up for the hackathon. After
 * submitting, the backend is updated and they will recieve a success message
 * on the page.
 *
 * @author Rob
 */
const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  // TODO what options/prompting are we providing?
  const [pronouns, setPronouns] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [graduation, setGraduation] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [whyAttend, setWhyAttend] = useState("");
  const [whatLearn, setWhatLearn] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [resume, setResume] = useState(null);

  const trackOptions = ["Beginner", "Advanced"];
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0]);

  const infoOptions = ["Yes", "No"];
  const [canShareInfo, setCanShareInfo] = useState(infoOptions[0]);

  const attendingOptions = [
    "I will be attending Knight Hacks in person.",
    "I will be attending Knight Hacks virtually.",
  ];
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
      default: {
        setRegistrationState("pending");
        setFeedbackMessage("Processing registration...");
        const response = await createHacker({
          email,
          firstName,
          lastName,
          phoneNumber,
          canShareInfo,
          isBeginner: selectedTrack === "Beginner",
          ethnicity,
          pronouns,
          college: schoolName,
          major,
          graduation,
          github,
          linkedIn,
          whyAttend,
          whatLearn,
          inPerson: attendingOption === "In Person",
          dietaryRestrictions,
          resume,
        });
        setRegistrationState(response.ok ? "success" : "failure");
      }
    }
  };

  return (
    <Page title="Knight Hacks | Register" onLanding={false}>
      <h1 className="text-4xl sm:text-4xl mt-20 mb-4 md:text-6xl text-center font-sansita">
        Register
      </h1>
      <form onSubmit={submitRegistration} className="flex flex-col">
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox label="First Name:" setter={setFirstName} />
          <TextInputBox label="Last Name:" setter={setLastName} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox
            label="Phone:"
            pattern="^\(?\d{3}\)?-?\d{3}-?\d{4}$"
            setter={setPhoneNumber}
          />
          <TextInputBox label="Email:" pattern=".+@.+" setter={setEmail} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox label="School Name:" setter={setSchoolName} />
          <TextInputBox
            label="Graduation Year:"
            pattern="^\d{4}$"
            setter={setGraduation}
          />
        </div>
        <OptionSelector
          title="Are you attending our hackathon in person or virtually?"
          trackOptions={attendingOptions}
          selectedTrack={attendingOption}
          setSelectedTrack={setAttendingOption}
          flex="col"
        />
        <TextInputBox label="Email:" pattern=".+@.+" setter={setEmail} />
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox label="School Name:" setter={setSchoolName} />
          <TextInputBox
            label="Graduation Year:"
            pattern="^\d{4}$"
            setter={setGraduation}
          />
        </div>
        <OptionSelector
          title="Are you attending our hackathon in person or virtually?"
          trackOptions={attendingOptions}
          selectedTrack={attendingOption}
          setSelectedTrack={setAttendingOption}
          flex="col"
        />
        <TextInputBox
          label="Dietary Restrictions"
          setter={setDietaryRestrictions}
        />
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox label="GitHub:" setter={setGithub} />
          <TextInputBox label="LinkedIn:" setter={setLinkedIn} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <TextInputBox label="Pronouns:" setter={setPronouns} />
          <TextInputBox label="Ethnicity:" setter={setEthnicity} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <OptionSelector
            title="Can share info:"
            trackOptions={infoOptions}
            selectedTrack={canShareInfo}
            setSelectedTrack={setCanShareInfo}
            flex="row"
          />
          <TextInputBox label="Major:" setter={setMajor} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <div className="my-4 flex-1">
            <label>
              <span>Why are you attending Knight Hacks?</span>
              <textarea
                value={whyAttend}
                onChange={(event) => setWhyAttend(event.target.value)}
                className="text-gray-800 p-2 w-full h-24 px-4 py-2 border-b border-gray-900 bg-transparent focus:outline-none hover:border-blue-400 focus:border-blue-500 font-light"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
          <div className="my-4 flex-1">
            <label>
              <span>What do you hope to learn at Knight Hacks?</span>
              <textarea
                value={whatLearn}
                onChange={(event) => setWhatLearn(event.target.value)}
                className="text-gray-800 p-2 w-full h-24 px-4 py-2 border-b border-gray-900 bg-transparent focus:outline-none hover:border-blue-400 focus:border-blue-500 font-light"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row md:space-y-0 space-y-4 lg:space-x-4 items-center font-palanquin">
            <FileUploadBox
              handleFile={(fileUploaded) => setResume(fileUploaded)}
              title="Upload Resume"
            />
            <p className="visible lg:hidden font-palanquin">
              {(resume && "Filename: " + resume.name) || "(PDF file required)"}
            </p>
            <OptionSelector
              title="Track:"
              trackOptions={trackOptions}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              flex="row"
            />
          </div>
          <p className="hidden lg:block">
            {(resume && "Filename: " + resume.name) || "(PDF file required)"}
          </p>
        </div>
        <div className="flex justify-center font-palanquin">
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
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <div className="h-full justify-center items-center flex-1">
      <span>Resume:</span>
      <button
        onClick={handleClick}
        className={`
              bg-blue-600 rounded-lg mx-4 mt-6 md:my-6 py-2 px-4
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
 * @prop flex: A string for telling what flex direction to use.
 * @author Abraham Hernandez, Rob
 */
const OptionSelector = ({
  title,
  trackOptions,
  selectedTrack,
  setSelectedTrack,
  flex,
}) => {
  return (
    <div
      className={
        `h-full mt-4 md:mt-0 flex flex-${flex} items-center ` +
        (flex === "col" ? `w-full space-y-4` : `w-72 space-x-4`)
      }
    >
      <span className={flex === "col" ? "flex self-start" : undefined}>
        {title}
      </span>
      <Listbox value={selectedTrack} onChange={setSelectedTrack}>
        <div className="relative mt-1 flex-1 w-full">
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
const createHacker = async ({
  email,
  firstName: first_name,
  lastName: last_name,
  phoneNumber: phone_number,
  canShareInfo: can_share_info,
  isBeginner: beginner,
  ethnicity,
  pronouns,
  college,
  major,
  graduation: graduation_date,
  github,
  linkedIn: linkedin,
  whyAttend: why_attend,
  whatLearn: what_learn,
  inPerson: in_person,
  dietaryRestrictions: dietary_restrictions,
  resume,
}) => {
  const hackerFormData = new FormData();
  hackerFormData.append(
    "hacker",
    JSON.stringify({
      beginner,
      can_share_info: can_share_info === "Yes",
      edu_info: {
        college,
        graduation_date,
        major,
      },
      email,
      ethnicity,
      first_name,
      last_name,
      phone_number,
      pronouns,
      socials: {
        github,
        linkedin,
      },
      why_attend,
      what_learn: [what_learn],
      dietary_restrictions,
      in_person,
    })
  );
  hackerFormData.append("resume", resume);
  return await fetch("https://api.knighthacks.org/api/hackers/", {
    method: "POST",
    body: hackerFormData,
  });
};

export default Register;
