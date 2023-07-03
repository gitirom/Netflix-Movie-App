import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./listitem.scss";
import axios from "axios";

const ListItem = ({index, item}) => {
    const [isHovered, setisHovered] = useState(false);
    const [movie, setMovie] = useState({});
    
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + item , {
                    
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWU5ZDY1M2IyNjQzY2M5ZmE1NmI1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODM3NTk4NywiZXhwIjoxNjg4ODA3OTg3fQ.hLOZXdQ0Ugw1ip0zOsCqK89Z4sG18fuQ3sCSCLqmcwg"
                        },
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovie();
    }, [item]);
    return (
        <div className="listItem"
        style={{left : isHovered && index * 225 - 50 + index * 2.5 }}   //these methode for the list item hover get in wright position to make centred  
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false) } >
            <img
            src={movie.img}
            alt=""
            />
            {isHovered && (
        <>
        <video src={movie.trailer} autoPlay={true} loop />
        <div className="itemInfo">
            <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit" >{movie.limit}</span>
                <span> {movie.year} </span>
            </div>
            <div className="desc">
                {movie.desc}
            </div>
            <div className="genre">
                {movie.genre}
            </div>
        </div>
        </>
        )}
        </div>
    );
}

export default ListItem;
