import { ReactNode } from "react";

export default function Pill({ children } : { children: ReactNode }) {
    return (
        <div className="pill">
            { children }
        </div>
    );
}