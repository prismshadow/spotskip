import React, { useEffect } from "react";
import ContactImage from "../assets/contact-img.svg";

const Contact = () => {
    useEffect (() => {
        const script = document.createElement('script');
        script.src = "https://paperform.co/__embed.min.js";
        document.body.appendChild(script);

        return() => {
            document.body.removeChild(script);

        };
    }, []);

    return (
        <div className="container py-4 px-4 sm:px-10 min-h-[84vh]">
            <div className="flex flex-col lg:flex-row gap-10"> 
            <div className="lg:max-w-[40vw] mx-auto ">
                <img 
                src={ContactImage}
                alt="Contact"
                className="w-full h-auto object-cover"
                />
            </div>
            <div className="lg:w-1/2">
                <h1 className= "text-3x1 md:text-6xl font-bold text-secondary mb-4">
                    
                </h1>
                <div data-paperform-id="puyvnvwq"></div>
            </div>
            </div>
            
        </div>
    );
};

export default Contact;