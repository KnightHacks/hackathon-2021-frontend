const Register = () => {
  return <div>Register Page</div>;
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
