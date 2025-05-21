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
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 0.8,
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
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
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
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-1.5 bg-white"></div>
                  <div className="line w-8 h-1.5 bg-white"></div>
                  <div className="line w-5 h-1.5 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[10px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="text absolute top-0 left-0">
              <h1>grand</h1>
              <h1>theft</h1>
              <h1>auto</h1>
            </div>
            <div className="imagesdiv overflow-hidden relative w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="Sky Background"
              />
              <img
                className="absolute bg scale-[1.8] rotate-[-5deg] top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="Background Image"
              />
              <div className="text text-white flex flex-col gap-2 absolute top-15 left-1/2 -translate-x-1/2">
                <h1 className="text-[7rem] leading-none -ml-30">grand</h1>
                <h1 className="text-[7rem] leading-none ml-20">theft</h1>
                <h1 className="text-[7rem] leading-none -ml-30">auto</h1>
              </div>
              <img
                className="absolute character -bottom-[60%] max-sm:-bottom-[10%] max-sm:scale-[1.2] left-1/2 -translate-x-1/2 scale-[2] rotate-[-10deg]"
                src="./girlbg.png"
                alt="Girl Image"
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 w-full py-12 px-10 bg-gradient-to-t from-black to-transparent max-sm:flex">
              <div className="flex gap-4 items-center">
                <i className="text-2xl font-extrabold ri-arrow-down-line"></i>
                <h3 className="font1 text-2xl font-extrabold">Scroll Down</h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55px] max-sm:hidden"
                src="./ps5.png"
                alt="Ps5 Image"
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt="Classy Style Image"
                />
              </div>
              <div className="rg py-20  w-[40%]">
                <h1 className="text-6xl">Still Running,</h1>
                <h1 className="text-6xl">Not Hunting</h1>
                <p className="mt-10 font1 text-xl">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dicta autem doloribus sequi a, eos maxime dignissimos nihil
                  laborum animi pariatur sed ipsum ex.
                </p>
                <p className="mt-3 font1 text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla sequi exercitationem minima expedita.
                </p>
                <p className="mt-6 font1 text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla sequi exercitationem minima expedita.
                </p>

                {/* Button */}

                <a
                  className="group relative inline-block focus:ring-3 focus:outline-hidden mt-5"
                  href="#"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                  <span className="relative inline-block border-2 border-white px-8 py-3 text-xl font-bold tracking-widest text-black uppercase">
                    Download Now
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
