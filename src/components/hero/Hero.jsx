import React from "react";
import {
  AiFillTwitterCircle,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import resumePDF from "../../../public/assets/Mohsin Rasheed Resume.pdf";


const Hero = () => {
  return (
    <div id="home" className={` bg-gradient-to-r from-grey to-white `}>
      <div className=" container mx-auto pt-5 h-[750px] md:h-[100vh] md:flex-col-reverse sm:h-[780px]  flex sm:flex-col-reverse sm:pt-0 ">
        <div className=" left mt-4 md:mt-0 flex-1 flex flex-col justify-center gap-5 w-1/2 md:w-full md:py-2 sm:py-0">
          <div className="info w-fit flex flex-col items-start justify-center gap-3 sm:gap-2">
            <h2
              data-aos="fade-up"
              className=" text-5xl font-bold sm:text-[2rem]"
            >
              Hello, I'm Mohsin Rasheed
            </h2>
            <TypeAnimation
              data-aos="fade-up"
              sequence={[
                "Web Developer",
                2000,
                "Mobile Developer",
                2000,
                "Freelancer",
                2000,
                "",
              ]}
              speed={30}
              wrapper="h2"
              repeat={Infinity}
              className="text-white text-4xl font-bold sm:text-3xl"
            />
          </div>
          <div data-aos="fade-up" className="buttons flex gap-5">
            <a
              href="#contact"
              className=" bg-black text-[1rem] text-white px-10 py-2 sm:px-8 rounded-lg font-bold  hover:text-yellow-500"
            >
              <span> Hire Me</span>
            </a>
            <a
              href={resumePDF}
              className="flex items-center gap-2 border- text-[1rem] bg-white border-black px-7 py-2 sm:px-6 rounded-lg font-bold  hover:text-yellow-500"
              download
            >
              <div className="flex items-center gap-1">
                Resume <FiDownload />
              </div>
            </a>
          </div>
          <div className="icons flex mt-5 mx-5">
            <ul
              data-aos="fade-up"
              data-aos-duration="1500"
              className=" flex gap-10 "
            >
              <li>
                <a className="flex outline hover:bg-mine-shaft hover:text-white p-2 rounded-md gap-2 flex-row justify-center items-center " href="https://github.com/MalikMohsin5885" target="_blank">
                  {"Github"}
                    <AiFillGithub className="text-white h-[1.8rem] w-[1.8rem] text-xl hover:scale-110" />

                </a>
              </li>
              <li>
                <a className="flex outline hover:bg-mine-shaft hover:text-white p-2 rounded-md gap-2 flex-row justify-center items-center " href="https://www.linkedin.com/in/mohsin-rasheed-b81b9a233/" target="_blank">
                  {"Linkedin"}
                  <FaLinkedinIn className="text-white h-[1.8rem] w-[1.8rem] text-xl hover:scale-110 " />

                </a>
              </li>
              {/* <li>
                <a target="_blank" href="https://www.linkedin.com/in/malik-mohsin-b81b9a233/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                  
                  <FaLinkedinIn className=" h-[1.8rem] w-[1.8rem] text-xl hover:scale-125 " />{" "}
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        {/* <div className="right  top-5 flex-1 flex items-center justify-center md:items-end sm:items-end">
          <div className="relative h-[88%] w-fit flex items-center sm:items-end">
            <img
              data-aos="fade-up"
              className=" h-[90%]  w-full object-cover md:h-[95%] md:m-auto sm:m-0"
              src='https://i.postimg.cc/pTn61Gr1/Untitled-design222-modified.png'
              // src={mine}
              alt="mine"
            />

          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
