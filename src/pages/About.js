import React from "react";
import AboutImage from "../assets/about-img.svg";

const About = () => {
    const aboutText = `At SpotSkip, our mission is to simplify and enrich the way you explore new places. 
                           I'm GQ, a junior software enginner driven by the desire to create innovative solutions that make everyday experiences more enjoyable. 
                           Spotskip was born from my own journey through  the challenges of navigating unfamiliar areas.
                           I wanted to develop a tool that would not only help me but also assist others in finding and enjoying their destinations with ease.
                           
                           The inspiration for SpotSkip came from my frequent travels and the frustrations of locating key spots and avoiding crowded areas.
                           As someone who loves to explore but often faced difficulties in efficiently finding and navigating to places of interest, I envisioned SpotSkip as a smart solution to these problems. Combining my technical skills and 
                           personal experiences, I set out to build a platform that would streamline the process of discovery and navigation for everyone.
                           
                           SpotSkip is designed to make your exploration effortless and enjoyable. It alllows you to quickly find places of interest tailored to your preferences and navigate efficiently with routes that help you avoid congestion 
                           and save time. Whether you're traveling for leisure or business, SpotSkip is your reliable companion for discovering new spots and navigating through them smoothly.
                           
                           Thank you for choosing SpotSkip as your guide to better exploration. Your support and feedback are invaluable to us, and they inspire us to keep improving. We look forward to making your journeys 
                           more seamless and enjoyable.`;

    return (
        <div className="container py-4 px-4 sm:px-10 min-h-[84vh] flex flex-col items-center">
            
               <h1 style={{ fontSize: '4rem' }} className="text-4x1 md:text-7x1 font-bold text-secondary mb-8 ">
                        About Us 
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="lg:w-1/2">
                    <p className="text-md leading-loose ">{aboutText}</p>
                </div>
                <div className="lg:w-1/2 ">
                    <img 
                    src={AboutImage}
                    alt="About"
                    className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;