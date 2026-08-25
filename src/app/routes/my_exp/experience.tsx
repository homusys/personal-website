import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import Curtains from "../../components/curtains/curtains";
import MouseGlow from "../../components/mouse_glow/mouse-glow";

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
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Curtains />
      <MouseGlow />
      <div className="experience__wrapper">
        <Link to="/">Go Back</Link>
        <div className="experience__header">
          <h1 className="font-display">Experiences</h1>
        </div>
        <ExperienceFilterButtonGroup onChangeFilter={setFilter} />
        <ExperienceMain>
          {experienceData
            .sort((a: Experience, b: Experience) => {
              const aStartYear: number = Number(a.start_date.substring(0, 4));
              const aStartDay: number = Number(a.start_date.substring(5));

              const bStartYear: number = Number(b.start_date.substring(0, 4));
              const bStartDay: number = Number(b.start_date.substring(5));

              let result = 0;
              result = aStartYear - bStartYear;

              if (result === 0) {
                result = aStartDay - bStartDay;
              }

              return result;
            })
            .reverse()
            .map((data, index) => {
              if (
                (filter !== "all" && filter === data.type) ||
                filter === "all"
              ) {
                return <ExperienceItem key={index} data={data} />;
              }
              return null;
            })}
        </ExperienceMain>
      </div>
    </>
  );
}

function ExperienceFilterButtonGroup({
  onChangeFilter,
}: {
  onChangeFilter: (filter: string) => void;
}) {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const highlighter = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const hTemp = highlighter.current;
    const currentActive = buttonRefs.current[activeButtonIndex];

    if (!hTemp || !currentActive) return;

    hTemp.style.width = currentActive.clientWidth.toString() + "px";
    hTemp.style.height = currentActive.clientHeight.toString() + "px";
    hTemp.style.top = currentActive.offsetTop.toString() + "px";
    hTemp.style.left = currentActive.offsetLeft.toString() + "px";
  }, [activeButtonIndex]); // Only run when activeButtonIndex changes.

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const index = Number(event.currentTarget.dataset.index);
    setActiveButtonIndex(index);
    onChangeFilter(["all", "academic", "work"][index]);
  }

  return (
    <div className="experience__filter__button__group">
      <div className="highlighter" ref={highlighter}></div>
      <button
        data-index="0"
        ref={(b) => {
          buttonRefs.current[0] = b;
        }}
        onClick={handleClick}
      >
        <p>Show All</p>
      </button>
      <button
        data-index="1"
        ref={(b) => {
          buttonRefs.current[1] = b;
        }}
        onClick={handleClick}
      >
        <p>Academic</p>
      </button>
      <button
        data-index="2"
        ref={(b) => {
          buttonRefs.current[2] = b;
        }}
        onClick={handleClick}
      >
        <p>Work</p>
      </button>
    </div>
  );
}

function ExperienceMain({
  children,
}: {
  children: Array<React.JSX.Element | null>;
}) {
  return <div className="experience__main">{children}</div>;
}

function ExperienceItem({ data }: { data: Experience }) {
  return (
    <div className="experience__item box__shadow">
      <h3 className="item__title">{data.title}</h3>
      <div className="item__group">
        <span className="icon__span">
          <svg className="icon icon--size-s">
            <use href="icons.svg#calendar-1" />
          </svg>
          <p className="item__start__date">{data.start_date}</p>
        </span>

        <span className="icon__span">
          <svg className="icon icon--size-s">
            <use href="icons.svg#calendar-2" />
          </svg>
          <p className="item__end__date">{data.end_date}</p>
        </span>
      </div>
      <span className="icon__span">
        <svg className="icon icon--size-s">
          <use href="icons.svg#map-pin" />
        </svg>
        <p className="item__location">{data.location}</p>
      </span>
      <p className="item__description">{data.description}</p>
      <div className="item__technologies">
        {data.technologies.map((tech, index) => (
          <span key={index} className="technology__item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
