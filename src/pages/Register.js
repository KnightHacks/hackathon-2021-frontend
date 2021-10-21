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

  const pronounOptions = ["she/her", "he/him", "they/them", "ze/zir", "Other"];

  const ethnicityOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or more",
  ];

  // "unset" | "success" | "failure" | "pending"
  const [registrationState, setRegistrationState] = useState("unset");

  // registration fail dialog
  const [isOpen, setIsOpen] = useState(false);

  // user validation dialog
  const [shouldOpen, setShouldOpen] = useState(false);

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
    // const dateOfBirth = new Date(
    //   values.year,
    //   values.month,
    //   values.day
    // ).toISOString();

    let updatedMonth = values.month;
    let updatedDay = values.day;
    if (parseInt(values.month) < 10) {
      updatedMonth = "0" + values.month;
    }

    if (parseInt(values.day) < 10) {
      updatedDay = "0" + values.day;
    }
    const dateOfBirth = `${values.year}-${updatedMonth}-${updatedDay}`;

    // console.log("Date of birth: " + dateOfBirth);

    switch (registrationState) {
      case "pending":
        break;
      case "success":
        window.open("/success");
        break;
      default: {
        setRegistrationState("pending");
        const response = await createHacker({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: dateOfBirth,
          phoneNumber: values.phoneNumber,
          canShareInfo,
          isBeginner: selectedTrack === "Beginner",
          ethnicity: values.ethnicity,
          country: values.country,
          pronouns: values.pronoun,
          college: values.school,
          major: values.major,
          levelOfStudy: values.levelOfStudy,
          graduation: values.graduation,
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
    pronoun: yup.string().oneOf(pronounOptions, "Pronoun option is required."),
    ethnicity: yup
      .string()
      .oneOf(ethnicityOptions, "Ethnicity option is required."),
    country: yup.string().notOneOf(["Country"], "Country option is required."),
    school: yup.string().notOneOf(["School Name"], "School name is required."),
    graduation: yup
      .string()
      .oneOf(graduationOptions, "Graduation option is required."),
    levelOfStudy: yup
      .string()
      .oneOf(levelOfStudyOptions, "Level of Study option is required."),
    mlh1: yup.bool().oneOf([true], "Field must be checked."),
    mlh2: yup.bool().oneOf([true], "Field must be checked."),
    mlh3: yup.bool().oneOf([true, false]),
  });

  if (window.innerWidth <= 470) {
    return (
      <>
        <Page>
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
    <Page title="Knight Hacks | Register">
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
          pronoun: "Pronouns",
          ethnicity: "Ethnicity",
          country: "Country",
          school: "School Name",
          graduation: "Graduation year",
          levelOfStudy: "Level of Study",
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
        {({
          values,
          isSubmitting,
          errors,
          submitForm,
          setFieldValue,
          setFieldTouched,
          touched,
        }) => (
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
                  <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
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
                  <div className="lg:hidden flex flex-col text-darkblue">
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
                <div className="hidden text-darkblue lg:flex lg:flex-col">
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
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
                  About You
                </p>
                <p className="mt-2 w-full space-y-4 font-palanquin text-darkblue">
                  Let&apos;s learn more about you.
                </p>
                <Field name="pronoun" type="select">
                  {({ field }) => (
                    <OptionSelector
                      trackOptions={pronounOptions}
                      selectedTrack={values.pronoun}
                      setSelectedTrack={(option) => {
                        const selectPromise = new Promise((resolve) => {
                          setFieldValue(field.name, option);
                          resolve();
                        });

                        selectPromise.then(() => {
                          setFieldTouched(field.name);
                        });
                      }}
                      handleTouched={() => {
                        if (touched.pronoun == null) {
                          setFieldTouched(field.name);
                        }
                      }}
                      flex="col"
                      zIndex="70"
                    />
                  )}
                </Field>
                <ErrorMessage name="pronoun">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="font-palanquin flex flex-col">
                <Field name="ethnicity" type="select">
                  {({ field }) => (
                    <OptionSelector
                      trackOptions={ethnicityOptions}
                      selectedTrack={values.ethnicity}
                      setSelectedTrack={(option) => {
                        const selectPromise = new Promise((resolve) => {
                          setFieldValue(field.name, option);
                          resolve();
                        });

                        selectPromise.then(() => {
                          setFieldTouched(field.name);
                        });
                      }}
                      handleTouched={() => {
                        if (touched.pronoun == null) {
                          setFieldTouched(field.name);
                        }
                      }}
                      flex="col"
                      zIndex="60"
                    />
                  )}
                </Field>
                <ErrorMessage name="ethnicity">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="font-palanquin flex flex-col">
                <Field name="country" type="select">
                  {({ field }) => (
                    <ReactSelect
                      options={countries}
                      value={{ value: values.country, label: values.country }}
                      onChange={(option) => {
                        const selectPromise = new Promise((resolve) => {
                          setFieldValue(field.name, option.label);
                          resolve();
                        });

                        selectPromise.then(() => {
                          setFieldTouched(field.name);
                        });
                      }}
                      isSearchable
                      components={{
                        DropdownIndicator: DropdownIndicator,
                      }}
                      className="text-darkblue"
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#0B2D4F",
                          fontFamily: "Palanquin Light, sans-serif",
                        }),
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "rgba(159, 211, 233, 0.47)",
                          borderWidth: "2px",
                          borderRadius: "0.5rem",
                          borderColor: "#0B2D4F",
                          "&:hover": {
                            borderColor: "#0B2D4F",
                          },
                          paddingTop: "0.1rem",
                          paddingBottom: "0.1rem",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#0B2D4F",
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
                        setFieldTouched(field.name);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="country">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <Field type="text" name="day">
                  {({ field }) => <TextInputBox label="DD" field={field} />}
                </Field>
                <ErrorMessage name="day">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
                <Field type="text" name="month">
                  {({ field }) => <TextInputBox label="MM" field={field} />}
                </Field>
                <ErrorMessage name="month">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
                <Field type="text" name="year">
                  {({ field }) => <TextInputBox label="YYYY" field={field} />}
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
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
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
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
                  School Information
                </p>
                <div className="flex flex-col mt-4 text-darkblue">
                  <Field name="school" type="select">
                    {({ field }) => (
                      <ReactSelect
                        options={schools}
                        value={{ value: values.school, label: values.school }}
                        onChange={(option) => {
                          const selectPromise = new Promise((resolve) => {
                            setFieldValue(field.name, option.label);
                            resolve();
                          });

                          selectPromise.then(() => {
                            setFieldTouched(field.name);
                          });
                        }}
                        isSearchable
                        filterOption={createFilter({ ignoreAccents: false })}
                        captureMenuScroll={false}
                        classNamePrefix="custom-select"
                        components={{
                          Option: CustomOption,
                          MenuList: CustomMenuList,
                          DropdownIndicator: DropdownIndicator,
                        }}
                        className="text-darkblue"
                        styles={{
                          placeholder: (provided) => ({
                            ...provided,
                            color: "#0B2D4F",
                            fontFamily: "Palanquin Light, sans-serif",
                          }),
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: "rgba(159, 211, 233, 0.47)",
                            borderWidth: "2px",
                            borderRadius: "0.5rem",
                            borderColor: "#0B2D4F",
                            "&:hover": {
                              borderColor: "#0B2D4F",
                            },
                            paddingTop: "0.1rem",
                            paddingBottom: "0.1rem",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "#0B2D4F",
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
                          setFieldTouched(field.name);
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="school">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
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
                  <Field name="levelOfStudy" type="select">
                    {({ field }) => (
                      <OptionSelector
                        title="What is your level of study?"
                        trackOptions={levelOfStudyOptions}
                        selectedTrack={values.levelOfStudy}
                        setSelectedTrack={(option) => {
                          const selectPromise = new Promise((resolve) => {
                            setFieldValue(field.name, option);
                            resolve();
                          });

                          selectPromise.then(() => {
                            setFieldTouched(field.name);
                          });
                        }}
                        handleTouched={() => {
                          if (touched.pronoun == null) {
                            setFieldTouched(field.name);
                          }
                        }}
                        flex="col"
                        zIndex="40"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="levelOfStudy">
                    {(msg) => (
                      <p className="font-palanquin text-red-700 font-bold">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
                <Field name="graduation" type="select">
                  {({ field }) => (
                    <OptionSelector
                      title="When are you graduating?"
                      trackOptions={graduationOptions}
                      selectedTrack={values.graduation}
                      setSelectedTrack={(option) => {
                        const selectPromise = new Promise((resolve) => {
                          setFieldValue(field.name, option);
                          resolve();
                        });

                        selectPromise.then(() => {
                          setFieldTouched(field.name);
                        });
                      }}
                      handleTouched={() => {
                        if (touched.pronoun == null) {
                          setFieldTouched(field.name);
                        }
                      }}
                      flex="col"
                      zIndex="30"
                    />
                  )}
                </Field>
                <ErrorMessage name="graduation">
                  {(msg) => (
                    <p className="font-palanquin text-red-700 font-bold">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
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
                        <span className="text-darkblue">
                          Why are you attending Knight Hacks?
                        </span>
                        <textarea
                          {...field}
                          className="text-darkblue h-20 mt-4 rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-darkblue hover:border-blue-200 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue p-2 w-full px-4 py-2"
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
                        <span className="text-darkblue">
                          What do you hope to learn at Knight Hacks?
                        </span>
                        <textarea
                          {...field}
                          className="text-darkblue h-20 mt-4 w-full rounded-r-lg rounded-l-lg bg-opaque-blue border-2 border-darkblue hover:border-blue-200 ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue p-2 px-4 py-2"
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
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
                  External Links
                </p>
                <p className="mt-4 w-full space-y-4 font-palanquin text-darkblue">
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
                <p className="mt-4 w-full space-y-4 font-palanquinbold text-darkblue text-xl">
                  Last Step!
                </p>
                <label className="flex flex-col">
                  <div className="flex flex-row items-center space-x-4">
                    <Field
                      type="checkbox"
                      name="mlh1"
                      className="w-6 h-6 form-checkbox text-darkblue focus:ring-1 focus:ring-darkblue rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-darkblue">
                      Have you read and understood the{" "}
                      <a
                        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="text-darkblue hover:text-darkblue hover:underline cursor-pointer font-palanquinbold"
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
                      className="w-6 h-6 form-checkbox text-darkblue focus:ring-1 focus:ring-darkblue rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-darkblue">
                      I authorize you to share my application/registration
                      information with Major League Hacking for event
                      administration, ranking, and MLH administration in-line
                      with the MLH Privacy Policy. I further agree to the terms
                      of both the{" "}
                      <a
                        href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                        target="_blank"
                        rel="noreferrer"
                        className="text-darkblue hover:text-darkblue hover:underline cursor-pointer font-palanquinbold"
                      >
                        MLH Contest Terms and Conditions
                      </a>{" "}
                      and the{" "}
                      <a
                        href="https://mlh.io/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="text-darkblue hover:text-darkblue hover:underline cursor-pointer font-palanquinbold"
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
                      className="w-6 h-6 form-checkbox text-darkblue focus:ring-1 focus:ring-darkblue rounded-md"
                    />
                    <p className="w-5/6 font-palanquinregular text-darkblue">
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
                    if (Object.keys(errors).length === 0) {
                      submitForm();
                    } else {
                      setShouldOpen(true);
                    }
                  }}
                  className={`
              text-darkblue
              border-2
              border-darkblue
              cursor-pointer
              bg-gray-50 rounded-lg m-6 py-2 px-4
              hover:bg-darkblue
              hover:text-purewhite
              hover:border-darkblue
              font-palanquinregular
              w-72
              ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue
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
            w-full bg-opaque-blue rounded-xl placeholder-darkblue placeholder-opacity-75 text-darkblue font-light p-2 px-4 py-2 border-2 border-darkblue ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue break-words shadow-md font-palanquinregular
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
      <p className="mt-3 font-palanquin text-darkblue">Resume (PDF)</p>
      <button
        onClick={handleClick}
        type="button"
        disabled={disabled}
        className={`
              bg-gray-50 border-2 border-darkblue rounded-lg mx-4 md:my-3 py-1.5 px-4
              shadow-md
              max-w-xswidth truncate
              hover:bg-darkblue
              hover:text-purewhite
              hover:border-darkblue
              flex justify-center
              ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue
              `}
      >
        <HiOutlineUpload className="mt-1 mr-2 text-white" />
        <p className="truncate text-white font-palanquinregular">{title}</p>
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
          flex === "col" ? "flex self-start text-darkblue text-md" : undefined
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
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border-2 border-darkblue bg-opaque-blue rounded-lg shadow-md cursor-default ease-out duration-300 focus:outline-none focus:ring-4 focus:ring-darkblue sm:text-md text-darkblue">
            <span className="block truncate text-darkblue font-medium">
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
                  `${active ? "text-blue-900 bg-blue-100" : "text-darkblue"}
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
  dateOfBirth: birthday,
  phoneNumber: phone_number,
  canShareInfo: can_share_info,
  isBeginner: beginner,
  ethnicity,
  pronouns,
  college,
  major,
  levelOfStudy: level_of_study,
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
      level_of_study,
    },
    email,
    ethnicity,
    first_name,
    last_name,
    phone_number,
    pronouns,
    birthday,
    socials: {
      github,
      linkedin,
    },
    why_attend,
    what_learn: [what_learn],
    dietary_restrictions,
    resume_id: resume_id ?? undefined,
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
    description: "POST https://stagingapi.knighthacks.org/api/hackers/",
  });

  Sentry.getCurrentHub().configureScope((scope) => scope.setSpan(transaction));

  const res = await fetch("https://stagingapi.knighthacks.org/api/hackers/", {
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
