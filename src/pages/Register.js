import { useState } from "react";
import Page from "../components/Page";

const Register = () => {
  return (
    <Page onLanding={false}>
      <h1 className="text-4xl sm:text-4xl mt-20 md:text-6xl text-center">
        Register
      </h1>
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
        <span className="mr-2">{label}</span>
        <input
          className="rounded-lg text-gray-800 p-2"
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
