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
    
    let mm = gsap.matchMedia();

    mm.add("(max-width: 639px)", () => {
      gsap.to(".character", {
        scale: 1.2,
        x: "-50%",
        y: "20%",
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "expo.easeInOut",
      });
    });

    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      gsap.to(".character", {
        scale: 0.9,
        x: "-50%",
        y: "10%",
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "expo.easeInOut",
      });
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.to(".character", {
        scale: 0.7,
        x: "-50%",
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "expo.easeInOut",
      });
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      if (window.innerWidth > 1024) {
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
      }
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
        <div className="main w-full rotate-[-10deg] scale-[1.7] transition-transform duration-300">
          <div className="landing relative w-full h-screen bg-black overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-3 sm:py-4 md:py-6 px-4 md:px-10 flex items-center justify-between backdrop-blur-sm bg-black/20">
              <div className="logo flex gap-2 sm:gap-3 md:gap-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="lines flex flex-col gap-[2px] sm:gap-[3px] md:gap-[5px]">
                  <div className="line w-8 sm:w-10 h-1 sm:h-1.5 bg-white"></div>
                  <div className="line w-5 sm:w-6 h-1 sm:h-1.5 bg-white"></div>
                  <div className="line w-3 sm:w-4 h-1 sm:h-1.5 bg-white"></div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl text-white -mt-[3px] sm:-mt-[5px] md:-mt-[10px] hover:text-yellow-300 transition-colors">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Background & Character */}
            <div className="imagesdiv relative w-full h-full">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover transition-transform duration-300"
                src="./sky.png"
                alt="Sky Background"
              />
              <img
                className="absolute bg scale-[1.8] rotate-[-5deg] top-0 left-0 w-full h-full object-cover transition-transform duration-300"
                src="./bg.png"
                alt="Background"
              />
              <div className="text absolute top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 text-white flex flex-col gap-1 sm:gap-2 text-center transition-all duration-300">
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] leading-none -ml-10 sm:-ml-20 md:-ml-40 text-shadow-lg hover:text-yellow-300 transition-colors">
                  grand
                </h1>
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] leading-none ml-10 sm:ml-20 md:ml-50 text-shadow-lg hover:text-yellow-300 transition-colors">
                  theft
                </h1>
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] leading-none -ml-10 sm:-ml-20 md:-ml-40 text-shadow-lg hover:text-yellow-300 transition-colors">
                  auto
                </h1>
              </div>
              <img
                className="absolute character bottom-[-5%] sm:bottom-[-20%] md:bottom-[-40%] lg:bottom-[-60%] left-1/2 -translate-x-1/2 scale-[1.2] sm:scale-[1.5] md:scale-[1.8] lg:scale-[2] rotate-[-10deg] transition-transform duration-300"
                src="./girlbg.png"
                alt="Character"
              />
            </div>

            {/* Bottom bar */}
            <div className="btmbar absolute bottom-0 w-full px-4 py-4 sm:py-6 md:py-10 md:px-10 bg-gradient-to-t from-black to-transparent text-white flex flex-col sm:flex-row items-center justify-between">
              <div className="flex gap-2 sm:gap-3 items-center mb-3 sm:mb-0 hover:text-yellow-300 transition-colors cursor-pointer group">
                <i className="ri-arrow-down-line text-xl sm:text-2xl font-extrabold group-hover:animate-bounce"></i>
                <h3 className="font1 text-base sm:text-lg md:text-2xl font-extrabold">
                  Scroll Down
                </h3>
              </div>
              <img
                className="h-[30px] sm:h-[40px] md:h-[55px] hidden sm:block hover:scale-105 transition-transform cursor-pointer"
                src="./ps5.png"
                alt="PS5"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="w-full min-h-screen bg-black py-20 px-4 sm:px-8 md:px-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div className="relative group overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                  src="./imag.png"
                  alt="Art"
                />
              </div>
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white hover:text-yellow-300 transition-colors cursor-default">
                    Still Running,
                  </h2>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white hover:text-yellow-300 transition-colors cursor-default">
                    Not Hunting
                  </h2>
                </div>
                <div className="space-y-4 font1">
                  <p className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base md:text-lg">
                    Welcome to the city that never sleeps — not because it's awake, but because it's watching.
                  </p>
                  <p className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base md:text-lg">
                    Step into a world where every alley holds secrets, and every block is a battlefield. If you're not fast, you're forgotten.
                  </p>
                  <p className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base md:text-lg">
                    Power, loyalty, and survival — that's the code. You ready to play your part?
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="uppercase tracking-widest text-yellow-300 text-xs sm:text-sm animate-pulse">
                    Available now on all major platforms
                  </p>
                  <a
                    href="#"
                    className="group relative inline-block focus:outline-none focus:ring-2 focus:ring-yellow-300 transform hover:scale-105 transition-all"
                  >
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="relative inline-block border-2 border-white px-6 py-3 text-sm sm:text-base font-bold tracking-widest text-black uppercase">
                      Download Now
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <footer className="w-full bg-black text-white px-4 sm:px-6 md:px-20 py-6 sm:py-8 md:py-10">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10">
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 sm:gap-2">
                <h3 className="text-2xl sm:text-3xl font-bold uppercase hover:text-yellow-300 transition-colors cursor-pointer">Rockstar Games</h3>
                <p className="text-xs sm:text-sm text-gray-400 font1">
                  © {new Date().getFullYear()} All rights reserved
                </p>
              </div>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center tracking-widest">
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-105 transform">Home</a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-105 transform">Games</a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-105 transform">News</a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-105 transform">Support</a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-105 transform">Careers</a>
              </div>
              <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl justify-center">
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-110 transform">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-110 transform">
                  <i className="ri-twitter-x-line"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-110 transform">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-110 transform">
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