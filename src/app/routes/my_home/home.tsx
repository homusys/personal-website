import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import profileImg from "../../../assets/profile.png";
import NavBar from "../../components/navbar/navbar";
import Curtains from "../../components/curtains/curtains";
import MouseGlow from "../../components/mouse_glow/mouse-glow";
import "./home.css";

export default function Home() {
  return (
    <>
      <Curtains />
      <MouseGlow />
      <div className="wrapper">
        <NavBar />

        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <BigLink text="Experiences" />
        <BigLink text="Certifications" />
        <BigLink text="Projects" />
      </div>
    </>
  );
}

function HeroLink({
  href,
  iconRef,
  isStrong,
}: {
  href: string;
  iconRef: string;
  isStrong: boolean;
}) {
  return (
    <a
      href={href}
      className={isStrong ? "hero__link link--strong-true" : "hero__link"}
      target="_blank"
    >
      <svg className="icon icon--size-l icon__shadow">
        <use href={iconRef} />
      </svg>
    </a>
  );
}

function HeroSection() {
  const [isRunning, setIsRunning] = useState(true);

  const heroMainText = "Carl Arzadon";
  const heroSubText = "Computer Engineer | Fullstack Developer";

  function handleAnimationEnd(event: React.AnimationEvent<HTMLHeadingElement>) {
    if (event.target !== event.currentTarget.lastElementChild) {
      return;
    }
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 4000);
  }

  const heroAnimatedMainText = heroMainText.split("").map((value, index) => {
    return (
      <span
        key={index}
        className="tippy__toes__lite"
        style={{ animationDelay: `${index * 180}ms` }}
      >
        {value === " " ? "\u00A0" : value}
      </span>
    );
  });

  return (
    <section className="hero">
      <div className="hero__pic">
        <img id="profilePic" src={profileImg} alt="My Profile Photo" />
      </div>
      <div className="hero__intro">
        <h1
          className={`font-display animation-tippy_toes text__shadow ${isRunning ? "running" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          {heroAnimatedMainText}
        </h1>
      </div>
      <div className="hero__roles text__shadow">{heroSubText}</div>
      <div className="hero__links">
        <HeroLink href="" iconRef="icons.svg#download" isStrong={true} />
        <HeroLink
          href="https://github.com/homusys"
          iconRef="icons.svg#github"
          isStrong={false}
        />
        <HeroLink
          href="https://www.linkedin.com/in/arzadoncarl/"
          iconRef="icons.svg#linkedin"
          isStrong={false}
        />
        <HeroLink
          href="mailto:arzadoncarl@gmail.com"
          iconRef="icons.svg#email"
          isStrong={false}
        />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about box__shadow">
      <h2 className="about__header font-header">About me</h2>
      <p className="about__text">
        I'm a fullstack developer with a strong focus on building practical and
        user-focused web applications.
      </p>
    </section>
  );
}

function TechStackSection() {
  const LANGUAGES = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Dart",
    "Python",
    "PHP",
  ];
  const FRONTEND = ["React", "Flutter"];
  const STYLING = ["Tailwind CSS", "Bootstrap"];
  const BACKEND = ["Node.js", "Express", "Laravel", "Flask"];
  const DATABASES = ["PostgreSQL", "MySQL", "Supabase"];

  function createStackContainer(label: string, items: string[]) {
    return (
      <div className="stack__container">
        <span className="stack__container__label">{label}</span>
        <div className="stack__container__items">
          {items.map((value, index) => (
            <span key={index} className="stack__item">
              {value}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="stack box__shadow">
      <h2 className="stack__header font-header">Tech Stack</h2>
      <div className="stack__all">
        {createStackContainer("Languages", LANGUAGES)}
        {createStackContainer("Frontend", FRONTEND)}
        {createStackContainer("Styling", STYLING)}
        {createStackContainer("Backend & APIs", BACKEND)}
        {createStackContainer("Databases", DATABASES)}
      </div>
    </section>
  );
}

function BigLink({ text }: { text: string }) {
  const DELAY = 2;
  const animationContainer = useRef<HTMLDivElement>(null);
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    const container = animationContainer.current;

    if (!container) {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const cols = Math.ceil(width / 50);
    const rows = Math.ceil(height / 20);

    container.style.setProperty("--cols", cols.toString());
    container.style.setProperty("--rows", rows.toString());

    setCellCount(cols * rows);
  }, []);

  return (
    <Link to="/wip" className="big__link box__shadow">
      <h3 className="font-header">{text}</h3>
      <div ref={animationContainer} className="animation-rect_grid">
        {Array.from({ length: cellCount }, (_, index) => (
          <div key={index} className="rect__container">
            <div
              className="rect"
              style={{ animationDelay: `${Math.random() * DELAY}s` }}
            ></div>
          </div>
        ))}
      </div>
      <svg className="icon icon--size-l">
        <use href="icons.svg#arrow" />
      </svg>
    </Link>
  );
}
