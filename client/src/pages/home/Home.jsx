import { useEffect, useState } from "react";
import Featured from "../../components/Featured/featured";
import Lists from "../../components/list/Lists";
import Navbar from "../../components/navbar/Navbar";
import './home.scss';
import axios from "axios";

const Home = ({type}) => {
    const [lists, setlists] = useState([]);
    const [genre, setgenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                //I create proxy they get the url server look at package.json
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${
                    genre ? "&genre=" + genre : ""
                    }`, {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWU5ZDY1M2IyNjQzY2M5ZmE1NmI1NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODM3NTk4NywiZXhwIjoxNjg4ODA3OTg3fQ.hLOZXdQ0Ugw1ip0zOsCqK89Z4sG18fuQ3sCSCLqmcwg"
                        }
                    }
                    
                );
                
                setlists(res.data);
                } catch (err) {
                console.log(err);
                }
            };
            getRandomLists();
        }, [type, genre]); //when change the type this useEffect gone return the Random lists
    return (
        <div className='home'>
            <Navbar  />
            <Featured type={type} />
            {lists.map((list) => (
                <Lists list={list} /> //now we get 10 lists in our home page
            ))}
        </div>
    )
}

export default Home;
