import { MouseEventHandler, ReactNode } from "react";

export default function ScrollableListItem({ children, onMouseEnter, onMouseLeave } : { children: ReactNode, onMouseEnter: Function, onMouseLeave: Function }) {
    let isMouseOver: boolean = false;
    
    const handleMouseEnter: MouseEventHandler<HTMLLIElement> = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        isMouseOver = true;

        setTimeout(() => {
            if(isMouseOver) {
                onMouseEnter();
            }
        }, 500);
        
    };

    const handleMouseLeave: MouseEventHandler<HTMLLIElement> = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        isMouseOver = false;
        onMouseLeave();
    };


    return (
        <li className="scrollable-list-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
        </li>
    );
}