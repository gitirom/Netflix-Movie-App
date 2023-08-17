import { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';
import {
        ArrowBackIosOutlined,
        ArrowForwardIosOutlined,
    } from "@material-ui/icons";


const Lists = ({list}) => {
    const [isMoved, setisMoved] = useState(false);                 //these state for appear and disappear the left icon 
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);  //app width div item width
    const [slideNumber, setSlideNumber] = useState(0);

    const ListRef = useRef();                         //Like getElementById but with jsx
    
    const handleClick = (direction) => {
        setisMoved(true);
        let distance = ListRef.current.getBoundingClientRect().x - 50;       //these function gives you the nb of px equal to distance      //these method to now how many px 
        
    if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        ListRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
        setSlideNumber(slideNumber + 1);
        ListRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
        
    }
    
    return (
        <div className='list' >
            <span className="listTitle">{list.title} </span>
            <div className="wrapper">
                <ArrowBackIosOutlined className='sliderArrow left' onClick={() => handleClick("left")} 
                style={{display: !isMoved && "none"}} 
                />
                <div className="container" ref={ListRef}>
                    {list.content.map((item, i) => (
                        <ListItem index={i} item={item} />
                    ))}
                </div>
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick("right")} />
            </div>
        </div>
    );
}

export default Lists;
