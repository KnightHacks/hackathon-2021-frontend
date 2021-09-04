import { Helmet } from "react-helmet";
import Page from "../components/Page";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Knight Hacks | Register</title>
      </Helmet>
      <Page onLanding={false}>
        <div>Register Page</div>
      </Page>
    </>
  );
};

export default Register;
