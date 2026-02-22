import RobotProfilePicture from "../assets/robot.png"
import UserProfilePicture from "../assets/user.png"
import UserProfilePicture1 from "../assets/IMG_4999.jpg"
import './ChatMessage.css'
import dayjs from "dayjs"

function ChatMessage(props /*or can destructure on this parameter{message,sender}*/){
        const message = props.message; // const {message} = props;
        const sender = props.sender;  //  const {sender} = props;
        // or collectively const {message , sender} = props; This is called
        //as destructuring
        const time = props.time;

        return(
          <div className={sender=='user' ? 'chat-message-user':'chat-message-chatbot'}>
           
            {sender == 'chatbot' && (
              <>
                
                <img src= {RobotProfilePicture} alt = "robot picture" className = "chat-message-profile"/>  
              </>)
            }
            <div className = 'chat-message-text'>
              {message}
              <p>{dayjs(time).format('h:mma')}</p>
            </div>
            {sender =='user' && (
              <>
              <img src={UserProfilePicture1} alt="user image" className = "chat-message-profile"/>
              </>
            )}
          </div>
        );
      }
      
export default ChatMessage