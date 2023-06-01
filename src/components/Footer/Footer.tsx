import "./Footer.scss";
import twitterIcon from "..//..//img/twitter-icon.svg";
import githubIcon from "..//..//img/github-icon1.png";
import pantheon from "..//..//img/pantheon.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container__links">
        <div className="footer-container__links-group">
          <h3>Open Library</h3>
          <ul>
            <li>Vision</li>
            <li>Volunteer</li>
            <li>Partner With Us</li>
            <li>Blog</li>
            <li>Terms of Service</li>
            <li>Careers</li>
            <li>Donate</li>
          </ul>
        </div>
        <div className="footer-container__links-group">
          <h3>Discover</h3>
          <ul>
            <li>Home</li>
            <li>Books</li>
            <li>Authors</li>
            <li>Subjects</li>
            <li>Collections</li>
            <li>Advanced search</li>
            <li>Return to top</li>
          </ul>
        </div>
        <div className="footer-container__links-group">
          <h3>Develop</h3>
          <ul>
            <li>Developer center</li>
            <li>API documentation</li>
            <li>Add a book</li>
          </ul>
        </div>
        <div className="footer-container__links-group">
          <h3>Help</h3>
          <ul>
            <li>Help center</li>
            <li>Report a problem</li>
            <li>Suggesting Edits</li>
            <a href="">
              <img
                src={twitterIcon}
                alt="twitter icon"
                className="footer-container__icons"
              />
            </a>
            <a href="">
              <img
                src={githubIcon}
                alt="github icon"
                className="footer-container__icons"
              />
            </a>
          </ul>
        </div>
        <div className="footer-container__links-group">
          <h3>Change website language</h3>
          <ul>
            <li>Deutsch</li>
            <li>Français</li>
            <li>Português</li>
          </ul>
        </div>
      </div>
      <div className="footer-container__details">
        <img src={pantheon} alt="pantheon" />
        <p>
          Open Library is an initiative of the <span>Internet Archive</span>, a
          501(c)(3) non-profit, building a digital library of Internet sites and
          other cultural artifacts in digital form. Other projects include the
          <span> Wayback Machine </span>, <span> archive.org</span> and
          <span> archive-it.org </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
