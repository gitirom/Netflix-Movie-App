import { ArrowBackOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";
import "./watch.scss";

export default function Watch() {
    return (
        <div className="watch">
        <div className="back">
            <ArrowBackOutlined />
            Home
        </div>
        <ReactPlayer url="https://www.youtube.com/watch?v=YlGfFnSDq0Q" 
        playing={false}
        width="100%"
        height="100%"
        controls={true}
        
        
        />
        </div>
    );
}