import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import profileImg from "../../../assets/profile.png";
import Curtains from "../../components/curtains/curtains";
import MouseGlow from "../../components/mouse_glow/mouse-glow";
import AppLayout from "../../layouts/app_layout/app_layout";
import "./home.css";

export default function Home() {
	const FULLNAME = "Carl Arzadon";
	const ROLES = `${getCurrentAge()} y/o computer engineering graduate from the Philippines.`;
	const INTRO =
		"I have a strong interest in both software and hardware and enjoy \
  integrating both into one system.";

	/**
	 * Calculate my current age. If either monthCompare or dayCompare are are false
	 * (by having a negative value), then I still havent had my birthday for that
	 * year. Otherwise both would be true.
	 *
	 * @returns the correct computed age
	 */
	function getCurrentAge(): number {
		const dateOfBirth = new Date(2000, 12, 16);
		const currentDate = new Date(Date.now());

		const monthCompare = currentDate.getMonth() - dateOfBirth.getMonth() >= 0;
		const dayCompare = currentDate.getDay() - dateOfBirth.getDay() >= 0;
		const computedAge = currentDate.getFullYear() - dateOfBirth.getFullYear();

		let correctAge = computedAge;

		if (!monthCompare || !dayCompare) {
			--correctAge;
		}

		return correctAge;
	}

	return (
		<>
			<Curtains />
			<MouseGlow />
			<AppLayout>
				{/* <NavBar /> */}
				<HeroSection
					heroFullname={FULLNAME}
					heroRoles={ROLES}
					heroIntroduction={INTRO}
				/>
				{/* <TechStackSection /> */}
				<BigLink id="experiencesBtn" text="Experiences" path="/experiences" />
			</AppLayout>
		</>
	);
}

type HeroLinkProps = {
	text: string;
	href: string;
	iconRef: string;
	emphasize: boolean;
};

function HeroLink({ text, href, iconRef, emphasize }: HeroLinkProps) {
	return (
		<a
			href={href}
			className={emphasize ? "hero__link link--strong-true" : "hero__link"}
			target="_blank"
		>
			<svg className="icon icon--size-l icon__shadow">
				<use href={iconRef} />
			</svg>
			<span>{text}</span>
		</a>
	);
}

type HeroSectionProps = {
	heroFullname: string;
	heroRoles: string;
	heroIntroduction: string;
};

function HeroSection({
	heroFullname,
	heroRoles,
	heroIntroduction,
}: HeroSectionProps) {
	const [isRunning, setIsRunning] = useState(true);

	function handleAnimationEnd(event: React.AnimationEvent<HTMLHeadingElement>) {
		if (event.target !== event.currentTarget.lastElementChild) {
			return;
		}
		setIsRunning(false);
		setTimeout(() => setIsRunning(true), 4000);
	}

	const heroAnimatedMainText = heroFullname.split("").map((value, index) => {
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
			<div className="hero__roles text__shadow">{heroRoles}</div>
			<div className="hero__roles text__shadow">{heroIntroduction}</div>
			<div className="hero__links">
				<HeroLink
					text="Resume"
					href=""
					iconRef="icons.svg#download"
					emphasize={true}
				/>
				<HeroLink
					text="homusys"
					href="https://github.com/homusys"
					iconRef="icons.svg#github"
					emphasize={false}
				/>
				<HeroLink
					text="Carl Arzadon"
					href="https://www.linkedin.com/in/arzadoncarl/"
					iconRef="icons.svg#linkedin"
					emphasize={false}
				/>
				<HeroLink
					text="arzadoncarl (at) gmail (dot) com"
					href="mailto:arzadoncarl@gmail.com"
					iconRef="icons.svg#email"
					emphasize={false}
				/>
			</div>
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

function BigLink({
	id,
	text,
	path,
}: {
	id: string;
	text: string;
	path: string;
}) {
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
		<Link id={id} to={path} className="big__link box__shadow">
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
