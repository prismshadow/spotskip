import React, { useEffect } from "react";
import DonateImage from "../assets/donate-img.svg";

const Donate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true; 
    document.body.appendChild(script); 

    return () => {
      document.body.removeChild(script);
    };
  },[]);

  return (
    <div className="container py-4 px-4 sm:px-10 min-h-[84vh]">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="lg:max-w-[40vw] pt-10">
          <h1 className="text-3xl md:text-6xl font-bold text-secondary">
            Please Donate to Help Us Keep This Site Running
          </h1>
          <p className="text-md leading-loose my-4">
            At SpotSkip, our mission is to provide you with valuable and
            real-time wait time information for public places, empowering you to
            make the most of your time and enjoy hassle-free experiences. That's
            why we kindly ask for your support through donations to ensure the
            sustainability and longevity of this service.
          </p>
          <p className="text-md leading-loose my-4">
            Your generous contributions will directly contribute to covering the
            costs of server maintenance, API integration, and ongoing
            development efforts. By donating to SpotSkip, you'll play a crucial
            role in helping us deliver accurate and up-to-date wait time data,
            expand our coverage to new locations, and enhance the user
            experience.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', marginTop: '50px'}}>
            <div>
              <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="TSDXTGNNBKC94" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
            <div>
              <stripe-buy-button
                buy-button-id="buy_btn_1PUAShRw5dHKodU3kCaDEjct"
                publishable-key="pk_live_51PTTfJRw5dHKodU32i5ifhvglzd2wRo7sYHAJWOm3sx0iOMwLqQEbHvPsaixKzqHdkUnzk4aapXMs1R0KvGObwKK00AY7Bakzl"
              >
              </stripe-buy-button>
            </div>
          </div>
        </div>
        <div className="lg:max-w-[40vw]">
          <img
            src={DonateImage}
            alt="Donate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Donate;