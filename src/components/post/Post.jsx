import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import p1 from "../../assets/profile-pictures/p1.jpg";
import { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, userReducer } from "../../reducers/userReducer.js";
import axios from "axios";
// import noAvatar from "../../assets/profile-pictures/noavatar.png";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";

const Post = ({ post }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [likes, setLikes] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { loading, user, error } = state;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const handleLikes = () => {
    try {
      axios.put(`http://localhost:8800/api/posts/like/${post._id}`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLikes(isliked ? likes - 1 : likes + 1);
    setIsLiked(!isliked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const res = await axios.get(
          `http://localhost:8800/api/users/getuser?userId=${post.userId}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchUser();
  }, [post.userId]);


  return (
    <div>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={user.profilePicture || ""}
                  alt=""
                />
              </Link>
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">
              {post.desc}
            </span>
            <img
              className="postImg"
              src={publicFolder + post.img}
              alt=""
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png"
                alt=""
                onClick={handleLikes}
              />
              <img
                onClick={handleLikes}
                className="likeIcon"
                src="https://seeklogo.com/images/F/facebook-love-logo-0E36A58F96-seeklogo.com.png"
                alt=""
              />
              <span className="postLikeCounter">{likes} people liked it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> 9 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
