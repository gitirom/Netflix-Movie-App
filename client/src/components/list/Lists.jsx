import { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';
import {
        ArrowBackIosOutlined,
        ArrowForwardIosOutlined,
    } from "@material-ui/icons";


const Lists = () => {
    const [isMoved, setisMoved] = useState(false);                 //these state for appear and disappear the left icon 
    
    const [slideNumber, setSlideNumber] = useState(0);

    const ListRef = useRef();                         //Like getElementById but with jsx
    
    const handleClick = (direction) => {
        setisMoved(true);
        let distance = ListRef.current.getBoundingClientRect().x - 50;       //these function gives you the nb of px equal to distance      //these method to now how many px 
        
    if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        ListRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 4) {
        setSlideNumber(slideNumber + 1);
        ListRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
        
    }

    return (
        <div className='list' >
            <span className="listTitle">Continue to watch </span>
            <div className="wrapper">
                <ArrowBackIosOutlined className='sliderArrow left' onClick={() => handleClick("left")} 
                style={{display: !isMoved && "none"}} 
                />
                <div className="container" ref={ListRef}>
                    <ListItem index={0} />
                    <ListItem index={1} />
                    <ListItem index={2} />
                    <ListItem index={3} />
                    <ListItem index={4} />
                    <ListItem index={5} />
                    <ListItem index={6} />
                    <ListItem index={7} />
                    <ListItem index={8} />
                    <ListItem index={9} />
                </div>
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick("right")} />
            </div>
        </div>
    );
}

export default Lists;
