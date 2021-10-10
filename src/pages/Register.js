import { Dialog, Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import ReactSelect, { createFilter, components } from "react-select";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import CustomMenuList from "../components/CustomMenuList";
import schools from "../assets/content/schools.json";
import countries from "../assets/content/countries.json";

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
    "Yes; I'm comfortable with my information being shared.",
    "No; don't share my my information.",
  ];
  const [canShareInfo, setCanShareInfo] = useState(infoOptions[0]);

  const levelOfStudyOptions = [
    "Undergraduation / Bachelors",
    "Graduation / Masters",
    "PhD / Doctorate",
    "Post Doctorate",
  ];

  const [levelOfStudyOption, setLevelOfStudyOption] = useState(
    "Level of Study"
  );

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

  const [schoolOption, setSchoolOption] = useState("School Name");

  const CustomOption = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
      <components.Option {...newProps} className="custom-option">
        {children}
      </components.Option>
    );
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </components.DropdownIndicator>
    );
  };

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

  const [countryOption, setCountryOption] = useState("Country");

  // "unset" | "success" | "failure" | "pending"
  const [registrationState, setRegistrationState] = useState("unset");

  // registration fail dialog
  const [isOpen, setIsOpen] = useState(false);

  // user validation dialog
  const [shouldOpen, setShouldOpen] = useState(false);

  // birthday
  const [yearBirth, setYearBirth] = useState(null);
  const [monthBirth, setMonthBirth] = useState(null);
  const [dayBirth, setDayBirth] = useState(null);

  const [response, setResponse] = useState(null);

  const [resumeID, setResumeID] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  const uploadResume = async (resume) => {
    setIsUploading(true);
    setResume(resume);
    const formData = new FormData();
    formData.set("resume", resume);
    formData.set("type", "application/json");
    const { id } = await fetch(
      "https://api.knighthacks.org/api/hackers/resume/",
      {
        method: "POST",
        body: formData,
      }
    ).then((b) => b.json());
    setResumeID(id);
    setIsUploading(false);
  };

  const serverErrorFocusRef = useRef(null);
  const validationErrorFocusRef = useRef(null);

  const submitRegistration = async (values) => {
    // Combining date of birth fields and converting to iso8601
    const dateOfBirth = new Date(
      dayBirth + monthBirth + yearBirth
    ).toISOString();
    switch (registrationState) {
      case "pending":
        console.log("in proccess");
        break;
      case "success":
        window.open("/success");
        console.log("success login");
        break;
      default: {
        setRegistrationState("pending");

        const response = await createHacker({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values.phoneNumber,
          canShareInfo,
          isBeginner: selectedTrack === "Beginner",
          ethnicity: ethnicityOption,
          country: countryOption,
          pronouns: pronounOption,
          college: schoolOption.value,
          major: values.major,
          levelOfStudy: levelOfStudyOption,
          graduation: graduationOption,
          github: values.github,
          linkedIn: values.linkedIn,
          whyAttend: values.whyAttend,
          whatLearn: values.whatLearn,
          dietaryRestrictions: values.dietaryRestrictions,
          mlh1: values.mlh1,
          mlh2: values.mlh2,
          mlh3: values.mlh3,
          resume_id: resumeID,
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
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    day: yup.string().required("Day is required."),
    month: yup.string().required("Month is required."),
    year: yup.string().required("Year is required."),
    email: yup
      .string()
      .email("Email is not valid.")
      .required("Email is required."),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid.")
      .required("Phone number is required."),
    major: yup.string().required("Major is required."),
    whyAttend: yup.string().required("Required."),
    whatLearn: yup.string().required("Required."),
    mlh1: yup.bool().oneOf([true], "Field must be checked."),
    mlh2: yup.bool().oneOf([true], "Field must be checked."),
    mlh3: yup.bool().oneOf([true, false]),
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
        initialFocus={serverErrorFocusRef}
        className="fixed inset-0 z-10 overflow-y-auto h-100 w-100"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="grid place-items-center h-full">
          <div className="flex flex-col justify-center max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="font-palanquinbold text-lg font-medium leading-6 text-gray-900"
            >
              Registration Failed :(
            </Dialog.Title>
            <Dialog.Description className="font-palanquin text-md">
              Something went wrong; please try again!
            </Dialog.Description>

            <p className="text-md text-gray-500 font-palanquin">
              {`The server says "${
                response
                  ? `${response.status}: ${response.statusText}`
                  : "<crickets>"
              }".`}
            </p>

            <div className="mt-4">
              <button
                type="button"
                className={`
                bg-opaque-blue rounded-lg mx-4 py-2 px-4 text-black
                hover:shadow-md
                active:bg-blue-800 max-w-xswidth
                font-palanquin
                truncate
              `}
                onClick={(event) => {
                  setIsOpen(false);
                  submitRegistration(event);
                }}
                ref={serverErrorFocusRef}
              >
                Try again
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
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
          day: "",
          month: "",
          year: "",
          email: "",
          phoneNumber: "",
          dietaryRestrictions: "",
          github: "",
          linkedIn: "",
          major: "",
          whyAttend: "",
          whatLearn: "",
          mlh1: false,
          mlh2: false,
          mlh3: false,
        }}
        validate={() => {
          const errors = {};

          if (resume != null && resume.type !== "application/pdf") {
            errors.resume = "File must be a pdf";
          }

          return errors;
        }}
        validationSchema={registrationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitRegistration(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, status, setStatus, submitForm }) => (
          <>
            <Dialog
              open={shouldOpen}
              onClose={() => {
                setShouldOpen(false);
              }}
              className="fixed inset-0 z-10 overflow-y-auto h-100 w-100"
              initialFocus={validationErrorFocusRef}
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <div className="grid place-items-center h-full">
                <div className="flex flex-col justify-center max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="font-palanquinbold text-lg font-medium leading-6 text-gray-900"
                  >
                    Registration Failed :(
                  </Dialog.Title>
                  <Dialog.Description className="font-palanquin text-md">
                    One or more fields have not been filled in correctly.
                  </Dialog.Description>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`
                      font-palanquin
                      bg-opaque-blue rounded-lg mx-4 py-2 px-4 text-black
                      hover:shadow-sm
                      active:bg-opaque-blue max-w-xswidth
                      truncate
                    `}
                      onClick={() => {
                        setShouldOpen(false);
                      }}
                      ref={validationErrorFocusRef}
                    >
                      Go away
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
            <Form className="flex flex-col">
              <div className="flex flex-col justify-center font-palanquin">
                <div className="flex flex-col">
                  <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                    Welcome Hacker!
                  </p>
                  <Field type="text" name="firstName">
                    {({ field }) => (
                      <TextInputBox label="First Name" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="firstName">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
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
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="flex flex-col justify-center font-palanquin">
                <div className="flex flex-col lg:flex-row md:space-y-0 space-y-4 lg:space-x-4 items-center">
                  <FileUploadBox
                    handleFile={uploadResume}
                    disabled={isUploading}
                    title=" Upload Resume"
                  />
                  <div className="lg:hidden flex flex-col text-gray-700">
                    {resume ? (
                      <>
                        <p>{"Filename: " + resume.name}</p>
                        <p className="font-palanquin text-red-600">
                          {errors.resume && errors.resume}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <OptionSelector
                    title="What track would you like to follow for the hackathon?"
                    trackOptions={trackOptions}
                    selectedTrack={selectedTrack}
                    setSelectedTrack={setSelectedTrack}
                    flex="col"
                    zIndex="80"
                  />
                </div>
                <div className="hidden text-gray-700 lg:flex lg:flex-col">
                  {resume ? (
                    <>
                      <p>{"Filename: " + resume.name}</p>
                      <p className="font-palanquin text-red-600">
                        {errors.resume && errors.resume}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="font-palanquin flex flex-col mt-2">
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                  About You
                </p>
                <p className="mt-2 w-full space-y-4 font-palanquin text-gray-700">
                  Let&apos;s learn more about you.
                </p>
                <OptionSelector
                  trackOptions={pronounOptions}
                  selectedTrack={pronounOption}
                  setSelectedTrack={(option) => {
                    setPronounOption(option);
                    setStatus(
                      Object.keys(status).reduce((object, key) => {
                        if (key !== "pronoun") {
                          object[key] = status[key];
                        }
                        return object;
                      }, {})
                    );
                  }}
                  handleTouched={() => {
                    if (!status?.pronoun && pronounOption === "Pronouns") {
                      setStatus({
                        ...status,
                        pronoun: "Pronoun option is required.",
                      });
                    }
                  }}
                  flex="col"
                  zIndex="70"
                />
                {status && status.pronoun && (
                  <p className="font-palanquin text-red-700 font-bold">
                    {status.pronoun}
                  </p>
                )}
              </div>
              <div className="font-palanquin flex flex-col">
                <OptionSelector
                  trackOptions={ethnicityOptions}
                  selectedTrack={ethnicityOption}
                  setSelectedTrack={(option) => {
                    setEthnicityOption(option);
                    setStatus(
                      Object.keys(status).reduce((object, key) => {
                        if (key !== "ethnicity") {
                          object[key] = status[key];
                        }
                        return object;
                      }, {})
                    );
                  }}
                  handleTouched={() => {
                    if (!status?.ethnicity && ethnicityOption === "Ethnicity") {
                      setStatus({
                        ...status,
                        ethnicity: "Ethnicity option is required.",
                      });
                    }
                  }}
                  flex="col"
                  zIndex="60"
                />
                {status && status.ethnicity && (
                  <p className="font-palanquin text-red-700 font-bold">
                    {status.ethnicity}
                  </p>
                )}
              </div>
              <div className="font-palanquin flex flex-col">
                <OptionSelector
                  trackOptions={countries}
                  selectedTrack={countryOption}
                  setSelectedTrack={(option) => {
                    setCountryOption(option);
                    setStatus(
                      Object.keys(status).reduce((object, key) => {
                        if (key !== "country") {
                          object[key] = status[key];
                        }
                        return object;
                      }, {})
                    );
                  }}
                  handleTouched={() => {
                    if (!status?.country && countryOption === "Country") {
                      setStatus({
                        ...status,
                        country: "Country option is required.",
                      });
                    }
                  }}
                  flex="col"
                  zIndex="50"
                />
                {status && status.country && (
                  <p className="font-palanquin text-red-700 font-bold">
                    {status.country}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <Field type="text" name="day">
                  {({ field }) => (
                    <DayPicker
                      defaultValue={"Birth Date"}
                      year={yearBirth} // mandatory
                      month={monthBirth} // mandatory
                      endYearGiven // mandatory if end={} is given in YearPicker
                      required={true} // default is false
                      value={dayBirth} // mandatory
                      onChange={setDayBirth}
                      id={"Day"}
                      name={"Day"}
                      classes={
                        "w-full bg-opaque-blue rounded-xl placeholder-gray-700 placeholder-opacity-75 text-gray-700 font-light py-1 px-4 border-2 border-gray-50 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white break-words shadow-md font-palanquinregular"
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="day">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
                <Field type="text" name="month">
                  {({ field }) => (
                    <MonthPicker
                      defaultValue={"Birth Month"}
                      endYearGiven // mandatory if end={} is given in YearPicker
                      year={yearBirth} // mandatory
                      required={true} // default is false
                      value={monthBirth} // mandatory
                      onChange={setMonthBirth}
                      classes={
                        "w-full bg-opaque-blue rounded-xl placeholder-gray-700 placeholder-opacity-75 text-gray-700 font-light py-1 px-4 border-2 border-gray-50 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white break-words shadow-md font-palanquinregular"
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="month">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
                <Field type="text" name="year">
                  {({ field }) => (
                    <YearPicker
                      defaultValue={"Birth Year"}
                      start={1950} // default is 1900
                      end={2020} // default is current year
                      reverse
                      required={true}
                      id={"Year"}
                      name={"Year"}
                      value={yearBirth} // mandatory
                      onChange={setYearBirth}
                      classes={
                        "w-full bg-opaque-blue rounded-xl placeholder-gray-700 placeholder-opacity-75 text-gray-700 font-light py-1 px-4 border-2 border-gray-50 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white break-words shadow-md font-palanquinregular"
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="year">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col justify-center font-palanquin">
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                  Contact Information
                </p>
                <div className="flex flex-col">
                  <Field type="text" name="phoneNumber">
                    {({ field }) => (
                      <TextInputBox label="Phone" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="phoneNumber">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
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
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="font-palanquin flex flex-col">
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                  School Information
                </p>
                <div className="flex flex-col mt-4 text-gray-700">
                  <ReactSelect
                    options={schools}
                    value={schoolOption}
                    onChange={(option) => {
                      setSchoolOption(option);
                      setStatus(
                        Object.keys(status).reduce((object, key) => {
                          if (key !== "schoolName") {
                            object[key] = status[key];
                          }
                          return object;
                        }, {})
                      );
                    }}
                    placeholder="School Name"
                    isSearchable
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{
                      Option: CustomOption,
                      MenuList: CustomMenuList,
                      DropdownIndicator: DropdownIndicator,
                    }}
                    className="text-gray-700"
                    styles={{
                      placeholder: (provided) => ({
                        ...provided,
                        color: "rgb(74, 75, 77)",
                        fontFamily: "Palanquin Light, sans-serif",
                      }),
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "rgba(159, 211, 233, 0.47)",
                        borderWidth: "2px",
                        borderRadius: "0.5rem",
                        borderColor: "rgb(249, 250, 251)",
                        "&:hover": {
                          borderColor: "rgb(191, 219, 254)",
                        },
                        paddingTop: "0.1rem",
                        paddingBottom: "0.1rem",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "rgb(74, 75, 77)",
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                      }),
                      option: (provided, state) => {
                        const backgroundColor = state.isSelected
                          ? "rgb(219, 234, 254)"
                          : "";
                        return {
                          ...provided,
                          backgroundColor: backgroundColor,
                          color: "rgb(17, 24, 39)",
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                        };
                      },
                      input: (provided) => ({
                        ...provided,
                        color: "rgb(74, 75, 77)",
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                      }),
                    }}
                    onMenuOpen={() => {
                      if (
                        !status?.schoolName &&
                        schoolOption === "School Name"
                      ) {
                        setStatus({
                          ...status,
                          schoolName: "School name is required.",
                        });
                      }
                    }}
                  />
                  {status && status.schoolName && (
                    <p className="font-palanquin text-red-700 font-bold">
                      {status.schoolName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Field type="text" name="major">
                    {({ field }) => (
                      <TextInputBox label="Major" field={field} />
                    )}
                  </Field>
                  <ErrorMessage name="major">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col">
                  <OptionSelector
                    title="What is your level of study?"
                    trackOptions={levelOfStudyOptions}
                    selectedTrack={levelOfStudyOption}
                    setSelectedTrack={(option) => {
                      setLevelOfStudyOption(option);
                      setStatus(
                        Object.keys(status).reduce((object, key) => {
                          if (key !== "levelOfStudy") {
                            object[key] = status[key];
                          }
                          return object;
                        }, {})
                      );
                    }}
                    handleTouched={() => {
                      if (
                        !status?.levelOfStudy &&
                        levelOfStudyOption === "Level of Study"
                      ) {
                        setStatus({
                          ...status,
                          levelOfStudy: "Level of Study option is required.",
                        });
                      }
                    }}
                    flex="col"
                    zIndex="40"
                  />
                  {status && status.levelOfStudy && (
                    <p className="font-palanquin text-red-700 font-bold">
                      {status.levelOfStudy}
                    </p>
                  )}
                </div>
                <OptionSelector
                  title="When are you graduating?"
                  trackOptions={graduationOptions}
                  selectedTrack={graduationOption}
                  setSelectedTrack={(option) => {
                    setGraduationOption(option);
                    setStatus(
                      Object.keys(status).reduce((object, key) => {
                        if (key !== "graduation") {
                          object[key] = status[key];
                        }
                        return object;
                      }, {})
                    );
                  }}
                  handleTouched={() => {
                    if (
                      !status?.graduation &&
                      graduationOption === "Graduation Year"
                    ) {
                      setStatus({
                        ...status,
                        graduation: "Graduation option is required.",
                      });
                    }
                  }}
                  flex="col"
                  zIndex="30"
                />
                {status && status.graduation && (
                  <p className="font-palanquin text-red-700 font-bold">
                    {status.graduation}
                  </p>
                )}
              </div>
              <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                Hackathon Information
              </p>
              <div className="flex flex-col justify-center font-palanquin">
                <OptionSelector
                  title="Is it okay if we share your information (name, resume, graduation year, etc.) with sponsors?"
                  trackOptions={infoOptions}
                  selectedTrack={canShareInfo}
                  setSelectedTrack={setCanShareInfo}
                  flex="col"
                  zIndex="10"
                />
              </div>
              <Field type="text" name="whyAttend">
                {({ field }) => (
                  <div className="flex flex-col justify-center font-palanquin mt-4">
                    <div className="w-full space-y-4 flex-1">
                      <label>
                        <span className="text-gray-700">
                          Why are you attending Knight Hacks?
                        </span>
                        <textarea
                          {...field}
                          className="text-gray-700 h-20 mt-4 rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-gray-50 hover:border-blue-200 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white p-2 w-full px-4 py-2"
                        />
                      </label>
                    </div>
                    <ErrorMessage name="whyAttend">
                      {(msg) => (
                        <p className="font-palanquin text-red-700 font-bold">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>
                )}
              </Field>
              <Field type="text" name="whatLearn">
                {({ field }) => (
                  <div className="flex flex-col justify-center font-palanquin my-4">
                    <div className="flex-1">
                      <label>
                        <span className="text-gray-700">
                          What do you hope to learn at Knight Hacks?
                        </span>
                        <textarea
                          {...field}
                          className="text-gray-700 h-20 mt-4 w-full rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-gray-50 hover:border-blue-200 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white p-2 px-4 py-2"
                        />
                      </label>
                    </div>
                    <ErrorMessage name="whatLearn">
                      {(msg) => (
                        <p className="font-palanquin text-red-700 font-bold">
                          {msg}
                        </p>
                      )}
                    </ErrorMessage>
                  </div>
                )}
              </Field>
              <div className="flex flex-col justify-center font-palanquin">
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                  External Links
                </p>
                <p className="mt-4 w-full space-y-4 font-palanquin text-gray-700">
                  Note: these are{" "}
                  <span className="font-palanquinbold">optional</span>, but most
                  technical applications ask for them! Make a Github / LinkedIn
                  account today if you don&rsquo;t have one.
                </p>
                <Field type="text" name="github">
                  {({ field }) => <TextInputBox label="GitHub" field={field} />}
                </Field>
                <Field type="text" name="linkedIn">
                  {({ field }) => (
                    <TextInputBox label="LinkedIn" field={field} />
                  )}
                </Field>
              </div>
              <div className="flex flex-col space-y-8 mt-4 ml-4">
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-gray-700 text-xl">
                  Last Step!
                </p>
                <label className="flex flex-col">
                  <div className="flex flex-row items-center space-x-4">
                    <Field
                      type="checkbox"
                      name="mlh1"
                      className="w-6 h-6 form-checkbox text-green-700 focus:ring-1 focus:ring-white rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-gray-700">
                      Have you read and understood the{" "}
                      <a
                        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-900 hover:text-green-800 hover:underline cursor-pointer font-palanquinbold"
                      >
                        MLH Code of Conduct
                      </a>
                      ?
                    </p>
                  </div>
                  <ErrorMessage name="mlh1">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </label>

                <label className="flex flex-col">
                  <div className="flex flex-row items-center space-x-4">
                    <Field
                      type="checkbox"
                      name="mlh2"
                      className="w-6 h-6 form-checkbox text-green-700 focus:ring-1 focus:ring-white rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-gray-700">
                      I authorize you to share my application/registration
                      information with Major League Hacking for event
                      administration, ranking, and MLH administration in-line
                      with the MLH Privacy Policy. I further agree to the terms
                      of both the{" "}
                      <a
                        href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-900 hover:text-green-800 hover:underline cursor-pointer font-palanquinbold"
                      >
                        MLH Contest Terms and Conditions
                      </a>{" "}
                      and the{" "}
                      <a
                        href="https://mlh.io/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-900 hover:text-green-800 hover:underline cursor-pointer font-palanquinbold"
                      >
                        MLH Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                  <ErrorMessage name="mlh2">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </label>

                <label className="flex flex-col">
                  <div className="flex flex-row items-center space-x-4">
                    <Field
                      type="checkbox"
                      name="mlh3"
                      className="w-6 h-6 form-checkbox text-green-700 focus:ring-1 focus:ring-white rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-gray-700">
                      I authorize Major League Hacking to send me occasional
                      messages about hackathons including pre- and post-event
                      informational emails.
                    </p>
                  </div>
                  <ErrorMessage name="mlh3">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </label>
              </div>
              <div className="flex justify-center font-palanquin">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    const newStatus = {};
                    if (pronounOption === "Pronouns") {
                      newStatus.pronoun = "Pronoun option is required.";
                    }
                    if (ethnicityOption === "Ethnicity") {
                      newStatus.ethnicity = "Ethnicity option is required.";
                    }
                    if (countryOption === "Country") {
                      newStatus.country = "Country option is required.";
                    }
                    if (schoolOption === "School Name") {
                      newStatus.schoolName = "School name is required.";
                    }
                    if (graduationOption === "Graduation Year") {
                      newStatus.graduation = "Graduation option is required.";
                    }

                    setStatus(newStatus);

                    if (
                      Object.keys(newStatus).length === 0 ||
                      Object.keys(errors).length === 0
                    ) {
                      submitForm();
                    } else {
                      setShouldOpen(true);
                    }
                  }}
                  className={`
              border-2
              border-green-800
              cursor-pointer
              bg-green-700 rounded-lg m-6 py-2 px-4
              hover:bg-green-800
              hover:border-green-900
              w-72
              ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-green-900
            `}
                >
                  {registrationState === "pending" ? (
                    <CircularProgress />
                  ) : (
                    "Submit"
                  )}
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
    <div className="my-4 flex-1">
      <label>
        <input
          placeholder={label}
          className={`
            w-full bg-opaque-blue rounded-xl placeholder-gray-700 placeholder-opacity-75 text-gray-700 font-light p-2 px-4 py-2 border-2 border-gray-50 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white break-words shadow-md font-palanquinregular
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
const FileUploadBox = ({ handleFile, title, disabled }) => {
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
    <div className="h-full justify-center items-center flex-1 flex flex-col">
      <p className="mt-3 font-palanquin text-gray-700">Resume (PDF)</p>
      <button
        onClick={handleClick}
        type="button"
        disabled={disabled}
        className={`
              bg-green-700 border-2 border-green-800 rounded-lg mx-4 md:my-3 py-1.5 px-4
              shadow-md
              max-w-xswidth truncate
              hover:bg-green-800
              hover:border-green-900
              flex justify-center
              ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-green-600
              `}
      >
        <HiOutlineUpload className="mt-1 mr-2 " />
        <p className="truncate ">{title}</p>
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
  handleTouched,
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
      <span
        className={
          flex === "col" ? "flex self-start text-gray-700 text-md" : undefined
        }
      >
        {title}
      </span>
      <Listbox
        value={selectedTrack}
        onChange={setSelectedTrack}
        onClick={handleTouched}
      >
        <div className="relative mt-1 flex-1 w-full">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border-2 border-gray-50 bg-opaque-blue rounded-lg shadow-md cursor-default ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-white sm:text-md text-gray-700">
            <span className="block truncate text-gray-700 font-medium">
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
                  `${active ? "text-blue-900 bg-blue-100" : "text-gray-700"}
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
  dateOfBirth: date_of_birth,
  phoneNumber: phone_number,
  canShareInfo: can_share_info,
  isBeginner: beginner,
  ethnicity,
  pronouns,
  college,
  major,
  levelOfStudy,
  graduation: graduation_date,
  github,
  linkedIn: linkedin,
  whyAttend: why_attend,
  whatLearn: what_learn,
  dietaryRestrictions: dietary_restrictions,
  resume_id,
  mlh1: mlh_code_of_conduct,
  mlh2: mlh_privacy_and_contest_terms,
  mlh3: mlh_send_messages,
}) => {
  const payload = {
    beginner,
    can_share_info: can_share_info === "Yes",
    edu_info: {
      college,
      graduation_date,
      major,
      levelOfStudy,
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
    resume_id,
    mlh: {
      mlh_code_of_conduct,
      mlh_privacy_and_contest_terms,
      mlh_send_messages,
    },
  };

  const transaction = Sentry.startTransaction({
    data: {
      hacker: JSON.stringify(payload),
    },
    op: "transaction",
    name: "submitHacker",
    description: "POST https://api.knighthacks.org/api/hackers/",
  });

  Sentry.getCurrentHub().configureScope((scope) => scope.setSpan(transaction));

  const res = await fetch("https://api.knighthacks.org/api/hackers/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  transaction.setHttpStatus(res.status);

  transaction.finish();

  return res;
};

export default Register;
