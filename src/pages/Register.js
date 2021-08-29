import { useEffect } from "react";
import Page from "../components/Page";

const Register = () => {
  useEffect(() => {
    window.title = "Knight Hacks | Register";
  }, []);

  return (
    <Page onLanding={false} pageTitle="Register">
      <div>Register Page</div>
    </Page>
  );
};

export default Register;
