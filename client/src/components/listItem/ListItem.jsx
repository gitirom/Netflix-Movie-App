import {
    Add,
    PlayArrow,
    ThumbDownOutlined,
    ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./listitem.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
    const [isHovered, setisHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
        try {
            const res = await axios.get("/movie/find/" + item, {
            headers: {
                token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWU5ZDY1M2IyNjQzY2M5ZmE1NmI1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MDk2Njg5MSwiZXhwIjoxNjkxMzk4ODkxfQ.93weiSPhxcfp_RK3pT16woKDrcjqQP-HEEh1pTesV2I",
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
        <Link to={{ pathname: "/watch", movie: movie }} >
        <div
            className="listItem"
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setisHovered(true)}
            onMouseLeave={() => setisHovered(false)}
        >
            <img src={movie?.imgSm} alt="" />
            {isHovered && (
            <>
                <video src={movie.trailer} autoPlay={true} loop />
                <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className="icon" />
                    <Add className="icon" />
                    <ThumbUpAltOutlined className="icon" />
                    <ThumbDownOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                    <span>{movie.duration}</span>
                    <span className="limit">+{movie.limit}</span>
                    <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genre">{movie.genre}</div>
                </div>
            </>
            )}
        </div>
        </Link>
    );
};

export default ListItem;
