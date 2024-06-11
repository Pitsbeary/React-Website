import { ReactNode, useState } from "react";
import ScrollableListItem from "./ScrollableListItem";

export default function ScrollableList({ listItems } : { listItems: ReactNode[] }) {    
    const [isPaused, setPaused] = useState(false); 
    
    const pauseList = () => {
        setPaused(true);
    }

    const unpauseList = () => {
        setPaused(false);
    }

    return (
        <div className={`scrollable-list-container ${isPaused ? 'paused' : ''}`}>
            <ul className="scrollable-list">
                {listItems.map((item, index) => <ScrollableListItem key={index} children={item} onMouseEnter={pauseList} onMouseLeave={unpauseList}/> )}
            </ul>
            <ul className="scrollable-list">
                {listItems.map((item, index) => <ScrollableListItem key={index} children={item} onMouseEnter={pauseList} onMouseLeave={unpauseList}/> )}
            </ul>
        </div>  
    );
}