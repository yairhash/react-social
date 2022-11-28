import Online from "../online/Online";
import './home-rightbar.css';
// import ad from "../../assets/ad.jpg";

const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="https://png.pngtree.com/png-clipart/20190618/original/pngtree-gift-box-gift-pink-box-png-image_3941214.jpg" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online />
        </ul>
      </>
    );
  };
  export default HomeRightbar