import "./topbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
// import profileImage from "../../assets/profile-pictures/p1.jpg";
// import noAvatar from "../../assets/profile-pictures/noavatar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Topbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="header-container">
      <div className="left">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Y.H.R social</span>
        </Link>
      </div>
      <div className="center">
        <div className="search">
          <SearchOutlinedIcon className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="links">
          <span className="link">Homepage</span>
          <span className="link">Timeline</span>
        </div>
        <div className="icons">
          <div className="icon">
            <PersonOutlineOutlinedIcon />
            <span className="counter">1</span>
          </div>
          <div className="icon">
            <ChatBubbleOutlineOutlinedIcon />
            <span className="counter">1</span>
          </div>
          <div className="icon">
            <NotificationsActiveOutlinedIcon />
            <span className="counter">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            alt="profie"
            src={"" || user.profilePicture}
            className="header-img"
          />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
