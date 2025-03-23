import { Fragment } from "react";
import HeroSection from "./heroSection.component";
const LandingPage = () => {
  return (
    <Fragment>
      <div className="container py-5">
        <HeroSection />
      </div>
    </Fragment>
  );
};
export default LandingPage;
