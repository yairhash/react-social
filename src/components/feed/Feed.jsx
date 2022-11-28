import Share from "../share-info/Share";
import Post from "../post/Post";
import { useContext, useEffect, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../../reducers/postReducer.js";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const { loading, error, posts } = state;
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const res = username
          ? await axios.get(
              `http://localhost:8800/api/posts/profile/${username}`
            )
          : await axios.get(
              `http://localhost:8800/api/posts/timeline/${user._id}`
            );
            const orederPostsByDate = res.data.sort((p1,p2)=>{
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            });
        dispatch({ type: "FETCH_SUCCESS", payload: orederPostsByDate });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    getPosts();
  }, [username,user._id]);


  return (
    <div className="feed">
      <Share />
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
