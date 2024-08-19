import React from "react";

const Resume = () => {
  return (
    <div id="resume" className=" container m-auto   mt-16">
      {/* heading */}
      <div data-aos="fade-up" className="relative mb-5">
        <h3 className=" text-3xl font-black text-gray-400 sm:text-2xl">
          Resume
        </h3>
        <span className="h-[1.1px] right-0 absolute w-[92%] bg-gray-300 block"></span>
      </div>
      <div data-aos="fade-up" className="left flex-1 w-full">
        <p className=" text-gray-700 font-medium w-[100%]">
          Here are my experiences and qualifications.
        </p>
      </div>
      {/* card*/}
      <div className="card-wrapper w-[90%] sm:w-full mt-5 flex md:flex-col sm:gap-5 mx-auto ">
        <div className="left flex-1 flex items-center justify-center">
          <fieldset
            data-aos="zoom-in"
            className=" w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2"
          >
            <legend className=" w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
              Experience
            </legend>
            <div className="relative">
              {/* design */}
              <div className="design flex absolute left-[-150px] top-1/2 items-center rotate-[90deg] sm:left-[-160px]">
                <div className="c1 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
                <div className="line w-[230px] bg-gray-300 h-[2px] sm:w-[250px]"></div>
                <div className="c2 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
              </div>
              {/* design */}
              <div className="flex flex-col gap-1 sm:gap-1 border-2 border-yellow-400 shadow-[0px_0px_16px_1px_rgba(0,0,0,0.1)] p-3 rounded-lg">
                <h1 className="text-[1.4rem] font-semibold sm:text-xl">
                  Academic Projects
                </h1>
                <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
                  University Projects & Personal Initiatives
                </span>
                <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
                  2023 - Present
                </span>
                <p className="text-[.9rem] text-justify break-words text-gray-500">
                  During my academic journey, I have worked on several projects, including:
                  <ul className="list-disc pl-5 mt-2">
                    <li><strong>Reservation App:</strong> Developed using React Native and Firebase to manage hotel and flight bookings.</li>
                    <li><strong>Health Care Portal:</strong> Created with Node.js, Express, and MS SQL for online consultations and payments.</li>
                    <li><strong>Portfolio Website:</strong> Built with React and Nest JS to showcase my skills and projects.</li>
                  </ul>
                  These projects have helped me build practical skills in software development, project management, and problem-solving.
                </p>
              </div>
            </div>

          </fieldset>
        </div>
        <div className="right flex-1 flex items-center justify-center">
          <fieldset
            data-aos="zoom-in"
            className=" w-[80%] p-5 py-12 sm:py-8 sm:w-full sm:p-2"
          >
            <legend className=" w-auto ml-[50%] translate-x-[-50%] border-2 border-gray-200 rounded-3xl py-1 px-8 font-semibold text-xl text-yellow-500">
              Education
            </legend>
            <div className=" relative">
              {/* design */}
              <div className="design flex absolute left-[-150px] top-1/2 items-center rotate-[90deg] sm:left-[-160px] ">
                <div className="c1 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
                <div className="line w-[230px] bg-gray-300 h-[2px] sm:w-[250px]"></div>
                <div className="c2 w-[12px] h-[12px] rounded-full bg-white border-2 border-yellow-500"></div>
              </div>
              {/* design */}
              <div className="flex flex-col gap-1 border-2 border-yellow-400 shadow-[0px_0px_16px_1px_rgba(0,0,0,0.1)] p-3 rounded-lg">
                <h1 className="text-[1.4rem] font-semibold sm:text-xl">BS in Computer Science</h1>
                <span className="text-[.9rem] font-semibold text-gray-500 sm:text-base">
                  COMSATS University Islamabad, Lahore
                </span>
                <span className="text-[.9rem] font-semibold text-yellow-500 sm:text-base">
                  2022 - Present
                </span>
                <p className="text-[.9rem] text-justify text-gray-500">
                  Pursuing a Bachelor of Science in Computer Science with a
                  focus on software development, data structures, algorithms,
                  and machine learning. Expected to graduate in 2026.
                </p>
              </div>

            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Resume;
