import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeinOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeinOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() > 0.8) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 0.7,
      x: "-50%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${-50 - xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="200"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing relative w-full h-screen bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 px-4 md:py-6 md:px-10 flex items-center justify-between">
              <div className="logo flex gap-3 md:gap-6">
                <div className="lines flex flex-col gap-[3px] md:gap-[5px]">
                  <div className="line w-10 h-1.5 bg-white"></div>
                  <div className="line w-6 h-1.5 bg-white"></div>
                  <div className="line w-4 h-1.5 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl text-white sm:-mt-[10px] max-sm:-mt-[5px]">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Background & Character */}
            <div className="imagesdiv relative w-full h-full">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="Sky Background"
              />
              <img
                className="absolute bg scale-[1.8] rotate-[-5deg] top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="Background"
              />
              <div className="text absolute top-28 left-1/2 -translate-x-1/2 text-white flex flex-col gap-2 text-center">
                <h1 className="text-[3rem] sm:text-[5rem] lg:text-[7rem] leading-none -ml-14 sm:-ml-40">
                  grand
                </h1>
                <h1 className="text-[3rem] sm:text-[5rem] lg:text-[7rem] leading-none ml-14 sm:ml-50">
                  theft
                </h1>
                <h1 className="text-[3rem] sm:text-[5rem] lg:text-[7rem] leading-none -ml-14 sm:-ml-40">
                  auto
                </h1>
              </div>
              <img
                className="absolute character bottom-[-10%] md:bottom-[-60%] left-1/2 -translate-x-1/2 scale-[12] md:scale-[2] rotate-[-10deg]"
                src="./girlbg.png"
                alt="Character"
              />
            </div>

            {/* Bottom bar */}
            <div className="btmbar absolute bottom-0 w-full px-4 py-6 md:py-10 md:px-10 bg-gradient-to-t from-black to-transparent text-white flex flex-col sm:flex-row items-center justify-between">
              <div className="flex gap-3 items-center mb-4 sm:mb-0">
                <i className="ri-arrow-down-line text-2xl font-extrabold"></i>
                <h3 className="font1 text-lg md:text-2xl font-extrabold">
                  Scroll Down
                </h3>
              </div>
              <img
                className="h-[40px] md:h-[55px] hidden sm:block"
                src="./ps5.png"
                alt="PS5"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="w-full min-h-screen bg-black flex items-center justify-center px-4 md:px-20 overflow-hidden">
            <div className="cntnr flex flex-col md:flex-row items-center text-white w-full gap-10">
              <div className="limg relative w-full md:w-1/2 h-[300px] md:h-full">
                <img
                  className="absolute w-[80%] md:w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt="Art"
                />
              </div>
              <div className="rg w-full md:w-[40%] py-10 md:py-20">
                <h1 className="text-4xl md:text-6xl">Still Running,</h1>
                <h1 className="text-4xl md:text-6xl">Not Hunting</h1>
                <p className="mt-6 text-base md:text-xl font1">
                  Welcome to the city that never sleeps — not because it’s
                  awake, but because it’s watching.
                </p>
                <p className="mt-4 text-base md:text-xl font1">
                  Step into a world where every alley holds secrets, and every
                  block is a battlefield. If you’re not fast, you’re forgotten.
                </p>
                <p className="mt-4 text-base md:text-xl font1">
                  Power, loyalty, and survival — that’s the code. You ready to
                  play your part?
                </p>

                {/* Button */}
                <p className="mt-6 uppercase tracking-widest text-yellow-300 text-sm md:text-base">
                  Available now on all major platforms
                </p>
                <a
                  className="group relative inline-block mt-6 focus:ring-2 focus:outline-none"
                  href="#"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="relative inline-block border-2 border-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-xl font-bold tracking-widest text-black uppercase">
                    Download Now
                  </span>
                </a>
              </div>
            </div>
          </div>
          <footer className="w-full bg-black text-white px-6 md:px-20 py-10">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              {/* Left Side - Branding */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                <h3 className="text-3xl font-bold uppercase">Rockstar Games</h3>
                <p className="text-sm text-gray-400 font1">
                  © {new Date().getFullYear()} All rights reserved
                </p>
              </div>

              {/* Center - Links */}
              <div className="flex gap-6 text-sm flex-wrap justify-center tracking-widest">
                <a href="#" className="hover:text-yellow-300 transition">
                  Home
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  Games
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  News
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  Support
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  Careers
                </a>
              </div>

              {/* Right Side - Social Icons */}
              <div className="flex gap-4 text-xl justify-center">
                <a href="#" className="hover:text-yellow-300 transition">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  <i className="ri-twitter-x-line"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition">
                  <i className="ri-youtube-fill"></i>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
