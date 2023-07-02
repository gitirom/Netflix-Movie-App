import Featured from "../../components/Featured/featured";
import Lists from "../../components/list/Lists";
import Navbar from "../../components/navbar/Navbar";
import './home.scss';

const Home = ({type}) => {
    return (
        <div className='home'>
            <Navbar  />
            <Featured type={type} />
            <Lists />
            <Lists />
            <Lists />
            <Lists />
        </div>
    )
}

export default Home;
