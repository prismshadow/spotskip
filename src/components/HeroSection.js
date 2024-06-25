import React, { useState } from "react";
import Button from "./Shared/Button";
import HeroImage from "../assets/hero-img.svg";
import TextField from "./Shared/TextField";
import { toast } from "react-toastify";

const HeroSection = ({ getFootTrafficData }) => {
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");

  const getDataHandler = () => {
    //check if venueName and venueAddress are not empty, also trim the values
    if (!venueName.trim() || !venueAddress.trim()) {
      return toast.error("Please enter a valid venue name and address");
    }
    getFootTrafficData(venueName, venueAddress);
  };

  return (
    <div className="container py-4 px-4 sm:px-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="lg:max-w-[40vw] pt-10">
          <h1 className="text-3xl md:text-6xl font-bold text-secondary">
            Discover Wait Times at Your Favorite Public Places and Venues
          </h1>
          <p className="text-md leading-loose my-4">
            Discover the power of real-time wait time information at your
            favorite public places. Say goodbye to uncertainty and frustration
            caused by long lines and embrace a more efficient way to plan your
            outings.
          </p>
          <p className="text-md leading-loose my-4 ">
            
            Our user-friendly interface makes accessing the information a
            breeze—simply search for your desired location, and we'll provide
            you with the most up-to-date data available. Make informed
            decisions, save valuable time, and enjoy a seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 ">
            <TextField
              placeholder="Enter Venue"
              className="w-full"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
            <TextField
              placeholder="Enter Address"
              className="w-full"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
            />
            <Button title="Search" onClick={getDataHandler} />
          </div>
        </div>
        <div className="lg:max-w-[40vw]">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full h-full object-cover"
            
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
