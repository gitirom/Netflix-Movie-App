import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import ReactPlayer from "react-player";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
    const location = useLocation();
    console.log(location);
    // const movie = location.movie;

    return (
        <div className="watch">
        <Link to="/">
            <div className="back">
            <ArrowBackOutlined />
            Home
            </div>
        </Link>
        <ReactPlayer url="https://www.youtube.com/watch?v=YlGfFnSDq0Q" 
        playing={false}
        width="100%"
        height="100%"
        controls={true}
        />
        </div>
    );
}
