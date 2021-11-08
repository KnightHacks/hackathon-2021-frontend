import Page from "../components/Page";
import { Helmet } from "react-helmet";

/**
 * @desc sponsors page; still WIP since we are waiting on sponsors
 * @author Rob
 */
const Sponsors = () => {
  return (
    <Page title="Knight Hacks | Sponsors">
      <div className="grid justify-items-center my-20">
        <div className="font-sansita text-2xl mt-20 sm:text-4xl xl:text-4xl my-4">
          Nice try, hacker!
        </div>
        <div className="w-3/5 text-center font-palanquin text-xl break-words sm:text-2xl xl:text-3xl my-4">
          We are no longer accepting registrations. However, we hope to see you
          at Knight Hacks 2022!
        </div>
      </div>
    </Page>
  );
};

export default Sponsors;
