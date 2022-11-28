import "./leftbar.css";
import {
  ChatBubbleOutlined,
  PlayCircleFilledOutlined,
  GroupOutlined,
  BookmarkOutlined,
  HelpOutlined,
  WorkOutlined,
  EventOutlined,
  SchoolOutlined,
  RssFeedOutlined,
} from "@mui/icons-material";
// import p2 from "../../../API/public/images/profile-pictures/p2.jpg";
// import p3 from "../../../API/public/images/profile-pictures/p3.jpg";
// import p4 from "../../../API/public/images/profile-pictures/p4.jpg";
// import p5 from "../../../API/public/images/profile-pictures/p5.jpg";

const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="leftbar-wrapper">
        <ul className="leftbar-list">
          <li className="leftbar-item">
            <RssFeedOutlined className="leftbar-icon" />
            <span className="item-text">Feed</span>
          </li>
          <li className="leftbar-item">
            <ChatBubbleOutlined className="leftbar-icon" />
            <span className="item-text">Chat</span>
          </li>
          <li className="leftbar-item">
            <PlayCircleFilledOutlined className="leftbar-icon" />
            <span className="item-text">Video</span>
          </li>
          <li className="leftbar-item">
            <GroupOutlined className="leftbar-icon" />
            <span className="item-text">Group</span>
          </li>
          <li className="leftbar-item">
            <BookmarkOutlined className="leftbar-icon" />
            <span className="item-text">Bookmark</span>
          </li>
          <li className="leftbar-item">
            <HelpOutlined className="leftbar-icon" />
            <span className="item-text">Questions</span>
          </li>
          <li className="leftbar-item">
            <WorkOutlined className="leftbar-icon" />
            <span className="item-text">Jobs</span>
          </li>
          <li className="leftbar-item">
            <EventOutlined className="leftbar-icon" />
            <span className="item-text">Event</span>
          </li>
          <li className="leftbar-item">
            <SchoolOutlined className="leftbar-icon" />
            <span className="item-text">School</span>
          </li>
        </ul>
        <button className="leftbar-btn">Show More</button>
        <hr className="hr" />
        <ul className="friends-list">
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
          <li className="friend">
            <img src="" alt="" className="friend-img" />
            <span className="friend-name">Jane Doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
