import "./HomePage.scss";
import RandomQuote from "../RandomQuote/RandomQuote";
import SubjectBooks from "..//SubjectBooks/SubjectBooks";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-container__top">
        <RandomQuote />
      </div>
      <div className="homepage-container__bottom">
        {["love", "thrillers", "kids", "drama"].map((el) => (
          <SubjectBooks subject={el} />
        ))}
        {/* <SubjectBooks subject={"love"} />
        <SubjectBooks subject={"thrillers"} />
        <SubjectBooks subject={"kids"} />
        <SubjectBooks subject={"drama"} /> */}
      </div>
    </div>
  );
};

export default HomePage;
