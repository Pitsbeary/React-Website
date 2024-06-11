import { ReactNode, useState } from "react";
import ScrollableListItem from "./ScrollableListItem";

export enum ScrollableListDirection {
    Left = 'left',
    Right = 'right'
}

export default function ScrollableList({ listItems, listDirection = ScrollableListDirection.Left } : { listItems: ReactNode[], listDirection?: ScrollableListDirection }) {    
    const [isPaused, setPaused] = useState(false); 
    
    const pauseList = () => {
        setPaused(true);
    }

    const unpauseList = () => {
        setPaused(false);
    }

    return (
        <div className={`scrollable-list-container ${isPaused ? 'paused' : ''}`}>
            <ul className={`scrollable-list scrollable-list--${listDirection}`}>
                {listItems.map((item, index) => <ScrollableListItem key={index} children={item} onMouseEnter={pauseList} onMouseLeave={unpauseList}/> )}
            </ul>
            <ul className={`scrollable-list scrollable-list--${listDirection}`}>
                {listItems.map((item, index) => <ScrollableListItem key={index} children={item} onMouseEnter={pauseList} onMouseLeave={unpauseList}/> )}
            </ul>
        </div>  
    );
}