import "./rightbar.css";
import ProfileRightbar from "../profile-rightbar/ProfileRightbar";
import HomeRightbar from "../home-rightbar/HomeRightbar";
import { INITIAL_STATE, userReducer } from "../../reducers/userReducer";
import { useReducer } from "react";

const Rightbar = ({ user }) => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
