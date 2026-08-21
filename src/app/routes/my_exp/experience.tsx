import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import Curtains from "../../components/curtains/curtains";

import "./experience.css";
import experienceData from "./experience.json";

type Experience = {
  title: string;
  organization: string;
  type: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
};

export default function Experiences() {
  const [filter, setFilter] = useState(null);
  const [experiences, setExperiences] = useState([]);

  return (
    <>
      <Curtains />
      <div className="experience__wrapper">
        <Link to="/">Go Back</Link>
        <div className="experience__header">
          <h1 className="font-display">Experiences</h1>
        </div>
        <ExperienceFilterButtonGroup />
        <ExperienceMain>
          {experienceData.map((data, index) => (
            <ExperienceItem key={index} data={data} />
          ))}
        </ExperienceMain>
      </div>
    </>
  );
}

function ExperienceFilterButtonGroup() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const highlighter = useRef<HTMLDivElement>(null);
  const buttons = Array.from({ length: 3 }, (_, _i) =>
    useRef<HTMLButtonElement>(null),
  );

  useEffect(() => {
    const hTemp = highlighter.current;
    const currentActive = buttons[activeButtonIndex].current;

    if (!hTemp || !currentActive) return;

    hTemp.style.width = currentActive.clientWidth.toString() + "px";
    hTemp.style.height = currentActive.clientHeight.toString() + "px";
    hTemp.style.top = currentActive.offsetTop.toString() + "px";
    hTemp.style.left = currentActive.offsetLeft.toString() + "px";
  }, [activeButtonIndex]); // Only run when activeButtonIndex changes.

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setActiveButtonIndex(Number(event.currentTarget.dataset.index));
  }

  return (
    <div className="experience__filter__button__group">
      <div className="highlighter" ref={highlighter}></div>
      <button data-index="0" ref={buttons[0]} onClick={handleClick}>
        <p>Show All</p>
      </button>
      <button data-index="1" ref={buttons[1]} onClick={handleClick}>
        <p>Academic</p>
      </button>
      <button data-index="2" ref={buttons[2]} onClick={handleClick}>
        <p>Work</p>
      </button>
    </div>
  );
}

function ExperienceMain({ children }: { children: React.JSX.Element[] }) {
  return <div className="experience__main">{children}</div>;
}

function ExperienceItem({ data }: { data: Experience }) {
  return (
    <div className="experience__item">
      <figure>
        <img src="" alt="" />
      </figure>
      <div>
        <h3 className="item__title">{data.title}</h3>
        <span className="item__group">
          <p className="item__start__date">{data.start_date}</p>
          <p className="item__end__date">{data.end_date}</p>
          <p className="item__location">{data.location}</p>
        </span>
        <p className="item__description">{data.description}</p>
        <span className="item__technologies">
          {data.technologies.map((tech, index) => (
            <div>{tech}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
