import { ReactNode } from "react";

export default function Section({ children, anchor } : { children: ReactNode, anchor?: string }) {    
    return (
        <section className="section" id={ anchor }>
            { children }
        </section>  
    );
}