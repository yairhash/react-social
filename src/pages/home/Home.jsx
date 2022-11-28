import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Letfbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Letfbar/>
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
};

export default Home;
