import RobotProfilePicture from "../assets/robot.png";
import UserProfilePicture from "../assets/user.png";
import UserProfilePicture1 from "../assets/IMG_4999.jpg";
import dayjs from "dayjs";

function ChatMessage(
  props /*or can destructure on this parameter{message,sender}*/,
) {
  const message = props.message; // const {message} = props;
  const sender = props.sender; //  const {sender} = props;
  // or collectively const {message , sender} = props; This is called
  //as destructuring
  const time = props.time;

  return (
    <div
      className={`flex w-full ${sender === "user" ? "justify-end" : "justify-start"} items-start mb-4`}
    >
      {sender === "chatbot" && (
        <>
          <img
            src={RobotProfilePicture}
            alt="robot picture"
            className="w-[45px] h-[45px] object-cover rounded-full flex-shrink-0"
          />
        </>
      )}
      <div
        className={`relative px-4 py-3 rounded-2xl mx-3 max-w-[75%] shadow-sm ${sender === "user" ? "bg-yellow-400 text-gray-900 rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}
      >
        <div className="break-words">{message}</div>
        <p
          className={`text-xs mt-1 ${sender === "user" ? "text-yellow-800" : "text-gray-500"}`}
        >
          {dayjs(time).format("h:mma")}
        </p>
      </div>
      {sender === "user" && (
        <>
          <img
            src={UserProfilePicture1}
            alt="user image"
            className="w-[45px] h-[45px] object-cover rounded-full flex-shrink-0"
          />
        </>
      )}
    </div>
  );
}

export default ChatMessage;
