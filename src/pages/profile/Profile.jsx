import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
// import p1 from "../../assets/profile-pictures/p1.jpg";
import noAvatar from "../../assets/noavatar.png";

import { INITIAL_STATE, userReducer } from "../../reducers/userReducer";
import { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { loading, user, error } = state;
  const username = useParams().username;
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const res = await axios.get(
          `http://localhost:8800/api/users/getuser?username=${username}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchUser();
  }, [username]);

  const handleupload = async (e) => {
    e.preventDefault();
    let profilePicture = null;
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      profilePicture = fileName;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
        const updatedUser =  await axios.put(`http://localhost:8800/api/users/updatePicture?userId=${user._id}&profilePicture=${profilePicture}`);
      } catch (err) {
        console.log(err);
      }
    };
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture} alt="" />
              {!user.profilePicture ? (
                <>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button onClick={handleupload} className="updatePicture">
                    Update profile picture
                  </button>
                  <label htmlFor="file" className="upload">
                    <img className="profileUserImg" src={noAvatar} alt="" />
                  </label>
                </>
              ) : (
                <img
                  className="profileUserImg"
                  src={publicFolder + user.profilePicture}
                  alt=""
                />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
