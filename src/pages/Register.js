import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoCheckmark } from "react-icons/io5";
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
  const [resume, setResume] = useState("");
  const [graduation, setGraduation] = useState("");
  const [socials, setSocials] = useState("");
  const [username, setUsername] = useState("");

  const trackOptions = ["Beginner", "Advanced"];
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0]);

  // "unset" | "success" | "failure" | "pending"
  const [registrationState, setRegistrationState] = useState("unset");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const submitRegistration = async (event) => {
    event.preventDefault();
    console.log("hi");
    return;
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
        const response = await createHacker(
          firstName,
          lastName,
          schoolName,
          email,
          phoneNumber,
          resume,
          selectedTrack,
          graduation,
          socials,
          username,
          "hacker"
        );
        if (response.ok) setRegistrationState("success");
        else setRegistrationState("failure");
    }
  };

  return (
    <Page onLanding={false}>
      <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center">
        Register
      </h1>
      <form onSubmit={submitRegistration}>
        <TextInputBox label="First Name:" setter={setFirstName} />
        <TextInputBox label="Last Name:" setter={setLastName} />
        <TextInputBox
          label="Phone:"
          pattern="^\(?\d{3}\)?-?\d{3}-?\d{4}$"
          setter={setPhoneNumber}
        />
        <TextInputBox label="School Name:" setter={setSchoolName} />
        <TextInputBox label="Email:" pattern=".+@.+" setter={setEmail} />
        <TextInputBox label="Resume:" setter={setResume} />
        <TextInputBox
          label="Graduation Year:"
          pattern="^\d{4}$"
          setter={setGraduation}
        />
        <TextInputBox label="Socials:" setter={setSocials} />
        <TextInputBox label="Username:" setter={setUsername} />
        <div>
          <span>Track:</span>
          <div>
            <Listbox value={selectedTrack} onChange={setSelectedTrack}>
              <Listbox.Button className="rounded-lg bg-white text-gray-800 p-2 w-full">
                <span className="capitalize">{selectedTrack}</span>
              </Listbox.Button>
              <Listbox.Options>
                {trackOptions.map((track, index) => {
                  return (
                    <Listbox.Option key={index} value={track}>
                      {({ active, selected }) => (
                        <div
                          className={
                            `
                      rounded-lg p-2 text-center m-1
                      bg-white
                    ` +
                            (active
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800")
                          }
                        >
                          <span className="flex justify-center relative">
                            <span className="absolute inset-y-0 left-0 flex">
                              <IoCheckmark className="self-center" />
                            </span>
                            <span className="self-center">{track}</span>
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            className={`
              bg-purple-600 rounded-lg m-6 py-2 px-4
              hover:bg-purple-700
              active:bg-purple-800
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
    <div className="my-8">
      <label>
        <span>{label}</span>
        <input
          className="rounded-lg text-gray-800 p-2 w-full"
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
  username,
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
      username,
    }),
  });
};

export default Register;
