import React from "react";
import ProgressBar from "../../chip/ProgressBar";
import SkillBox from "../../chip/SkillBox";
import {
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNestjs,
  SiNextdotjs,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiVercel,
  SiTypescript 
} from "react-icons/si";
import { GrCode } from "react-icons/gr";
import { TbBrandNextjs, TbBrandReactNative } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
const Skills = ({ darkMode }) => {
  return (
    <div id="skills">
      <div className=" container m-auto  mt-16">
        {/* heading */}
        <div data-aos="fade-up" className="relative mb-5">
          <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
            My Skills
          </h3>
          <span className="h-[1.1px] right-0 absolute w-[90%] bg-gray-300 block"></span>
        </div>
        {/* content*/}
        <div className="flex md:flex-col ">
          <div className="left flex-1 w-full">
            <p
              data-aos="fade-up"
              className=" text-gray-700 font-medium w-[100%]"
            >
              Here are my skills.
            </p>
            {/* left box */}
            <div
              data-aos="zoom-in"
              className="progress flex items-center h-[100%] justify-end md:justify-center"
            >
              <div className=" flex flex-col gap-6  w-3/4  my-5 md:w-[90%]">
                <ProgressBar logo={<SiJavascript />} name={"Javascript"} value={85} />
                <ProgressBar logo={<SiTypescript  />} name={"Typescript"} value={85} />
                <ProgressBar logo={<FaReact />} name={"React Js"} value={80} />
                <ProgressBar logo={<SiTailwindcss />} name={"CSS, Tailwind"} value={80} />
                <ProgressBar logo={<SiVercel />} name={"vercel"} value={65} />
              </div>
            </div>
          </div>
          {/* right box */}
          <div className="right relative flex-1 flex flex-wrap p-5 gap-10 items-center justify-center sm:w-full">
            <div className="first2 flex flex-col gap-10">
              <SkillBox
                logo={<SiNextdotjs />}
                black={"white"}
                white={"black"}
                skill={"Node JS"}
              />
              <SkillBox
                logo={<TbBrandNextjs />}
                black={"white"}
                white={"black"}
                skill={"NextJS"}
              />
              <SkillBox
                logo={<SiMongodb />}
                black={"white"}
                white={"black"}
                skill={"Mongo DB"}
              />
            </div>
            <div className="last2 flex flex-col gap-10">
              <SkillBox
                logo={<SiNestjs />}
                black={"black"}
                white={"white"}
                skill={"Nest Js"}
              />
              <SkillBox
                logo={<TbBrandReactNative />}
                black={"black"}
                white={"white"}
                skill={"React Native"}
              />
              <SkillBox
                logo={<SiPostgresql />}
                black={"black"}
                white={"white"}
                skill={"Postgre SQL"}
              />

            </div>
            <div className="last2 flex flex-col gap-10 md:flex-row">
              <SkillBox
                logo={<SiExpress />}
                black={"white"}
                white={"black"}
                skill={"Express Js"}
              />
              <SkillBox
                logo={<SiFirebase />}
                black={"white"}
                white={"black"}
                skill={"Firebase"}
              />
              <SkillBox
                logo={<SiMysql />}
                black={"white"}
                white={"black"}
                skill={"MySQL"}
              />

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Skills;
