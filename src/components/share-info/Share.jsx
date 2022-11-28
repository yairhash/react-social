import { useContext, useRef ,useState , useReducer } from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import profilePicture from "../../assets/profile-pictures/p1.jpg";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer.js";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
// import noAvatar from "../../assets/profile-pictures/noavatar.png";

const Share = () => {
  const descRef = useRef();
  const [file, setFile] = useState();
  const { user: currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  // const { loading, error, posts } = state;


  const handleShare = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: descRef.current.value,
      img: null,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const createdPost = await axios.post(
        `http://localhost:8800/api/posts/create/${newPost.userId}`,
        newPost
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="share-img"
          />
          <input
            ref={descRef}
            placeholder="What's on your mind ?"
            className="share-input"
          />
        </div>
        <hr className="hr" />
        <form className="share-bottom" onSubmit={handleShare}>
          <label htmlFor="file" className="share-options">
            <div className="option">
              <PermMediaIcon />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="option">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="option">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="option">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </label>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
export default Share;
