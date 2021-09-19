import { Dialog, Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

/**
 * @desc Registration page where hackers can sign up for the hackathon. After
 * submitting, the backend is updated and they will recieve a success message
 * on the page.
 *
 * @author Rob
 */
const Register = () => {
  const [resume, setResume] = useState(null);
  const trackOptions = ["Beginner", "Intermediate / Advanced"];
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0]);
  const history = useHistory();

  const infoOptions = [
    "Yes, I'm comfortable with my information being shared.",
    "No, I'm uncomfortable with my information being shared.",
  ];
  const [canShareInfo, setCanShareInfo] = useState(infoOptions[0]);

  const attendingOptions = [
    "I will be attending Knight Hacks in person.",
    "I will be attending Knight Hacks virtually.",
  ];
  const [attendingOption, setAttendingOption] = useState(attendingOptions[0]);

  const graduationOptions = [
    "Fall 2021",
    "Spring 2022",
    "Summer 2022",
    "Fall 2022",
    "Spring 2023",
    "Summer 2023",
    "Fall 2023",
    "Spring 2024",
    "Summer 2024",
    "Fall 2024",
  ];

  const [graduationOption, setGraduationOption] = useState("Graduation Year");

  const pronounOptions = ["she/her", "he/him", "they/them", "ze/zir", "Other"];
  const [pronounOption, setPronounOption] = useState("Pronouns");

  const ethnicityOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or more",
  ];
  const [ethnicityOption, setEthnicityOption] = useState("Ethnicity");

  // "unset" | "success" | "failure" | "pending"
  const [registrationState, setRegistrationState] = useState("unset");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // registration fail dialog
  const [isOpen, setIsOpen] = useState(false);

  // user validation dialog
  const [shouldOpen, setShouldOpen] = useState(false);

  const [response, setResponse] = useState(null);

  const submitRegistration = async (values) => {
    switch (registrationState) {
      case "pending":
        setFeedbackMessage("Registration is being processed!");
        console.log("in proccess");
        break;
      case "success":
        setFeedbackMessage("Registration already successful!");
        window.open("/success");
        console.log("success login");
        break;
      default: {
        setRegistrationState("pending");
        setFeedbackMessage("Processing registration...");

        const response = await createHacker({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          canShareInfo,
          isBeginner: selectedTrack === "Beginner",
          ethnicity: ethnicityOption,
          pronouns: pronounOption,
          college: values.schoolName,
          major: values.major,
          graduation: graduationOption,
          github: values.github,
          linkedIn: values.linkedIn,
          whyAttend: values.whyAttend,
          whatLearn: values.whatLearn,
          inPerson: attendingOption === "In Person",
          dietaryRestrictions: values.dietaryRestrictions,
          resume,
        });
        setRegistrationState(response.ok ? "success" : "failure");
        setResponse(response);
        if (response.ok) history.push("/success");
        else setIsOpen(true);
      }
    }
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    schoolName: yup.string().required("School name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    major: yup.string().required("Major is required"),
    whyAttend: yup.string().required("Required"),
    whatLearn: yup.string().required("Required"),
  });

  if (window.innerWidth <= 470) {
    return (
      <>
        <Page onLanding={false}>
          <h1 className="text-4xl sm:text-4xl mt-20 mb-4 md:text-6xl text-center font-sansita">
            Register
          </h1>
          <div className="grid justify-items-center my-20">
            <div className="font-sansita text-2xl sm:text-4xl xl:text-4xl my-4">
              Get off your phone!
            </div>
            <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
              Head over to our web view to register early.
            </div>
          </div>
        </Page>
      </>
    );
  }

  return (
    <Page title="Knight Hacks | Register" onLanding={false}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto h-100 w-100"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="grid place-items-center h-full">
          <div className="flex flex-col justify-center max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-xl font-medium leading-6 text-gray-900"
            >
              Registration Failed :(
            </Dialog.Title>
            <Dialog.Description className="text-lg">
              Something went wrong; please try again!
            </Dialog.Description>

            <p className="text-md text-gray-500">
              {`The server says "${
                response
                  ? `${response.status}: ${response.statusText}`
                  : "<crickets>"
              }".`}
            </p>

            <div className="mt-4">
              <button
                className={`
                bg-blue-600 rounded-lg mx-4 py-2 px-4 text-white
                hover:bg-blue-700
                active:bg-blue-800 max-w-xswidth
                truncate
              `}
                onClick={(event) => {
                  setIsOpen(false);
                  submitRegistration(event);
                }}
              >
                Try again!
              </button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>
      <h1 className="text-4xl sm:text-4xl mt-20 mb-4 md:text-6xl text-center font-sansita">
        Register
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          schoolName: "",
          email: "",
          phoneNumber: "",
          dietaryRestrictions: "",
          github: "",
          linkedIn: "",
          major: "",
          whyAttend: "",
          whatLearn: "",
        }}
        validate={() => {
          const errors = {};

          if (pronounOption === "Pronouns") {
            errors.pronoun = "Pronoun option is required";
          }

          if (ethnicityOption === "Ethnicity") {
            errors.ethnicity = "Ethnicity option is required";
          }

          if (graduationOption === "Graduation Year") {
            errors.graduation = "Graduation option is required";
          }

          if (resume != null && resume.type !== "application/pdf") {
            errors.resume = "File must be a pdf";
          }

          return errors;
        }}
        validationSchema={registrationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          submitRegistration(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, validateForm, submitForm }) => (
          <>
            <Dialog
              open={shouldOpen}
              onClose={() => {
                setShouldOpen(false);
              }}
              className="absolute bottom-4 left-4 z-10"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              <div className="flex flex-col justify-center max-w-md p-6 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="font-palanquinbold text-lg font-medium leading-6 text-gray-900"
                >
                  Registration Failed :(
                </Dialog.Title>
                <Dialog.Description as="h4" className="font-palanquin text-md">
                  One or more fields have not been filled in correctly.
                </Dialog.Description>
                <Dialog.Description className="font-palanquin text-gray-500">
                  Please try again!
                </Dialog.Description>

                <div className="mt-4">
                  <button
                    className={`
                      font-palanquin
                      bg-opaque-blue rounded-lg mx-4 py-2 px-4 text-black
                      hover:shadow-sm
                      active:bg-opaque-blue max-w-xswidth
                      truncate
                    `}
                    onClick={() => {
                      console.log("TEST");
                      setShouldOpen(false);
                    }}
                  >
                    Go away
                  </button>
                </div>
              </div>
            </Dialog>

            <Form className="flex flex-col">
              <div className="flex flex-col justify-center font-palanquin">
                <div className="flex flex-col">
                  <Field type="text" name="firstName">
                    {({ field }) => (
                      <TextInputBox label="First Name" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="firstName">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col">
                  <Field type="text" name="lastName">
                    {({ field }) => (
                      <TextInputBox label="Last Name" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="lastName">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <p className="mt-4 w-full space-y-4 font-palanquin">
                How do you identify?
              </p>
              <div className="font-palanquin flex flex-col">
                <OptionSelector
                  trackOptions={pronounOptions}
                  selectedTrack={pronounOption}
                  setSelectedTrack={setPronounOption}
                  flex="col"
                  zIndex="60"
                />
                {errors.pronoun && (
                  <p className="font-palanquin text-red-700">
                    {errors.pronoun}
                  </p>
                )}
              </div>
              <div className="font-palanquin flex flex-col">
                <OptionSelector
                  trackOptions={ethnicityOptions}
                  selectedTrack={ethnicityOption}
                  setSelectedTrack={setEthnicityOption}
                  flex="col"
                  zIndex="50"
                />
                {errors.ethnicity && (
                  <p className="font-palanquin text-red-700">
                    {errors.ethnicity}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 justify-center font-palanquin">
                <div className="flex flex-col">
                  <Field type="text" name="phoneNumber">
                    {({ field }) => (
                      <TextInputBox label="Phone" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="phoneNumber">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col">
                  <Field type="text" name="email">
                    {({ field }) => (
                      <TextInputBox label="Email" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="font-palanquin flex flex-col">
                <div className="flex flex-col">
                  <Field type="text" name="schoolName">
                    {({ field }) => (
                      <TextInputBox label="School" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="schoolName">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
                <OptionSelector
                  title="When are you graduating?"
                  trackOptions={graduationOptions}
                  selectedTrack={graduationOption}
                  setSelectedTrack={setGraduationOption}
                  flex="col"
                  zIndex="40"
                />
                {errors.graduation && (
                  <p className="font-palanquin text-red-700">
                    {errors.graduation}
                  </p>
                )}
              </div>
              <div className="font-palanquin">
                <OptionSelector
                  title="Are you attending our hackathon in person or virtually?"
                  trackOptions={attendingOptions}
                  selectedTrack={attendingOption}
                  setSelectedTrack={setAttendingOption}
                  flex="col"
                  zIndex="30"
                />
              </div>
              <p className="mt-4 w-full space-y-4 font-palanquin">
                Do you have any dietary restrictions that we should be aware of?
              </p>
              <div className="flex flex-col justify-center font-palanquin">
                <Field type="text" name="dietaryRestrictions">
                  {({ field }) => (
                    <TextInputBox label="Dietary Restrictions" field={field} />
                  )}
                </Field>
                <Field type="text" name="github">
                  {({ field }) => <TextInputBox label="GitHub" field={field} />}
                </Field>
                <Field type="text" name="linkedIn">
                  {({ field }) => (
                    <TextInputBox label="LinkedIn" field={field} />
                  )}
                </Field>
              </div>
              <div className="flex flex-col justify-center font-palanquin">
                <OptionSelector
                  title="Is it okay if we share your information (name, resume, graduation year, etc.) with sponsors?"
                  trackOptions={infoOptions}
                  selectedTrack={canShareInfo}
                  setSelectedTrack={setCanShareInfo}
                  flex="col"
                  zIndex="10"
                />
                <div className="flex flex-col">
                  <Field type="text" name="major">
                    {({ field }) => (
                      <TextInputBox label="Major" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="major">
                    {(msg) => (
                      <p className="font-palanquin text-red-700">{msg}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <Field type="text" name="whyAttend">
                {({ field }) => (
                  <div className="flex flex-col justify-center font-palanquin mt-4">
                    <div className="w-full space-y-4 flex-1">
                      <label>
                        <span>Why are you attending Knight Hacks?</span>
                        <textarea
                          {...field}
                          className="h-20 mt-4 rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-gray-50 focus:outline-none hover:border-blue-200 focus:border-blue-200 p-2 w-full px-4 py-2"
                        />
                      </label>
                    </div>
                    {errors.whyAttend && (
                      <p className="font-palanquin text-red-700">
                        {errors.whyAttend}
                      </p>
                    )}
                  </div>
                )}
              </Field>
              <Field type="text" name="whatLearn">
                {({ field }) => (
                  <div className="flex flex-col justify-center font-palanquin my-4">
                    <div className="flex-1">
                      <label>
                        <span>What do you hope to learn at Knight Hacks?</span>
                        <textarea
                          {...field}
                          className="h-20 mt-4 w-full rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-gray-50 focus:outline-none hover:border-blue-200 focus:border-blue-200 p-2 px-4 py-2"
                        />
                      </label>
                    </div>
                    {errors.whatLearn && (
                      <p className="font-palanquin text-red-700">
                        {errors.whatLearn}
                      </p>
                    )}
                  </div>
                )}
              </Field>
              <div className="flex flex-col justify-center font-palanquin">
                <div className="flex flex-col lg:flex-row md:space-y-0 space-y-4 lg:space-x-4 items-center">
                  <FileUploadBox
                    handleFile={(fileUploaded) => setResume(fileUploaded)}
                    title=" Upload Resume"
                  />
                  <div className="lg:hidden flex flex-col">
                    {resume ? (
                      <>
                        <p>{"Filename: " + resume.name}</p>
                        <p className="font-palanquin text-red-600">
                          {errors.resume && errors.resume}
                        </p>
                      </>
                    ) : (
                      <p>(PDF files only)</p>
                    )}
                  </div>
                  <OptionSelector
                    title="What track would you like to follow for the hackathon?"
                    trackOptions={trackOptions}
                    selectedTrack={selectedTrack}
                    setSelectedTrack={setSelectedTrack}
                    flex="col"
                    zIndex="0"
                  />
                </div>
                <div className="hidden lg:flex lg:flex-col">
                  {resume ? (
                    <>
                      <p>{"Filename: " + resume.name}</p>
                      <p className="font-palanquin text-red-600">
                        {errors.resume && errors.resume}
                      </p>
                    </>
                  ) : (
                    <p>(PDF files only)</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center font-palanquin">
                <button
                  disabled={isSubmitting}
                  onClick={() => {
                    validateForm().then((err) => {
                      setShouldOpen(Object.keys(err).length !== 0);

                      if (err == null) {
                        submitForm();
                      }
                    });
                  }}
                  className={`
              border-2
              border-green-800
              cursor-pointer
              bg-green-700 rounded-lg m-6 py-2 px-4
              hover:bg-green-800
              hover:border-green-900
              w-72
            `}
                >
                  Submit
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </Page>
  );
};

/**
 * @desc TODO
 * @prop label
 * @author Rob
 */
const TextInputBox = ({ label, field }) => {
  return (
    <div className="my-4 flex-1 ">
      <label>
        <input
          placeholder={label}
          className={`
            w-full bg-opaque-blue focus:shadow-md rounded-xl placeholder-white placeholder-opacity-75 text-white font-light p-2 px-4 py-2 border-2 border-gray-50  focus:outline-none hover:border-blue-200 focus:border-blue-200 break-words
            `}
          type="text"
          {...field}
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
      <span>Resume</span>
      <button
        onClick={handleClick}
        className={`
              bg-green-500 border-2 border-green-700 rounded-lg mx-4 mt-6 md:my-6 py-2 px-4
              max-w-xswidth truncate
              hover:bg-green-600
              hover:border-green-700
              flex justify-center
              `}
      >
        <HiOutlineUpload className="mt-1 mr-2 " />
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
  zIndex,
}) => {
  return (
    <div
      className={
        `h-full py-2 flex flex-${flex} items-center ` +
        (flex === "col"
          ? `w-full space-y-4`
          : `w-full space-y-4 md:w-72 md:space-x-4`)
      }
    >
      <span className={flex === "col" ? "flex self-start" : undefined}>
        {title}
      </span>
      <Listbox value={selectedTrack} onChange={setSelectedTrack}>
        <div className="relative mt-1 flex-1 w-full">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border-2 border-gray-50 bg-opaque-blue rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-gray-50 font-medium">
              {selectedTrack}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options
            style={{ zIndex: zIndex }}
            className={`absolute w-full py-1 mt-1 overflow-auto text-base bg-indigo-50 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          >
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
