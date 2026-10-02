import React, { useEffect, useRef, useState, type ReactNode } from "react";
import BlocksShuffle3Icon from "@iconify-react/svg-spinners/blocks-shuffle-3";

import profileImg from "../../../assets/profile.png";
import Curtains from "../../components/curtains/curtains";
import MouseGlow from "../../components/mouse_glow/mouse-glow";
import AppLayout from "../../layouts/app_layout/app_layout";
import "./home.css";

import experienceData from "./experience.json";

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
				<ExperienceSection />
				{/* <TechStackSection /> */}
				{/* <BigLink id="experiencesBtn" text="Experiences" path="/experiences" /> */}
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
			{text && <span>{text}</span>}
			<svg className="icon icon--size-l icon__shadow">
				<use href={iconRef} />
			</svg>
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
			<div className="hero__fullname">
				<h1
					className={`font-display animation-tippy_toes text__shadow ${isRunning ? "running" : ""}`}
					onAnimationEnd={handleAnimationEnd}
				>
					{heroAnimatedMainText}
				</h1>
			</div>
			<div className="hero__roles text__shadow">{heroRoles}</div>
			<div className="hero__intro text__shadow">{heroIntroduction}</div>
			<div className="hero__links">
				<HeroLink
					text="Resume"
					href=""
					iconRef="icons.svg#download"
					emphasize={true}
				/>
				<HeroLink
					text=""
					href="https://github.com/homusys"
					iconRef="icons.svg#github"
					emphasize={false}
				/>
				<HeroLink
					text=""
					href="https://www.linkedin.com/in/arzadoncarl/"
					iconRef="icons.svg#linkedin"
					emphasize={false}
				/>
				<HeroLink
					text=""
					href="mailto:arzadoncarl@gmail.com"
					iconRef="icons.svg#email"
					emphasize={false}
				/>
			</div>
		</section>
	);
}

type FilterType = "work" | "academic";

type Experience = {
	title: string;
	organization: string;
	type: string;
	location: string;
	start_date: string;
	end_date: string;
	accomplishments: string[];
	project_links: {
		label: string;
		url: string;
	}[];
	image_links: {
		caption: string;
		url: string;
	}[];
	technologies: string[];
};

function ExperienceSection() {
	const [filter, setFilter] = useState<FilterType>("work");

	const experienceNode = experienceData
		.sort((a: Experience, b: Experience) => {
			const aStartYear = Number(a.start_date.substring(0, 4));
			const aStartDay = Number(a.start_date.substring(5));

			const bStartYear = Number(b.start_date.substring(0, 4));
			const bStartDay = Number(b.start_date.substring(5));

			let result = 0;
			result = aStartYear - bStartYear;

			if (result === 0) {
				result = aStartDay - bStartDay;
			}

			return result;
		})
		.reverse()
		.map((data: Experience, index: number) => {
			if (filter !== data.type) {
				return null;
			}
			return <ExperienceItem key={index} data={data} />;
		});

	return (
		<section className="experience">
			<ExperienceFilterButtonGroup
				filterState={filter}
				updateFilter={(newVal) => setFilter(newVal)}
			/>
			<ExperienceList>{experienceNode}</ExperienceList>
		</section>
	);
}

type ExperienceFilterButtonGroupProps = {
	filterState: FilterType;
	updateFilter: (newVal: FilterType) => void;
};

function ExperienceFilterButtonGroup({
	filterState,
	updateFilter,
}: ExperienceFilterButtonGroupProps) {
	function onClickHandle(event: React.MouseEvent<HTMLButtonElement>) {
		const index = Number(event.currentTarget.dataset.index);
		updateFilter((["work", "academic"] as FilterType[])[index]);
	}

	return (
		<div className="experience__filter__button__group box__shadow">
			<button
				data-index={0}
				className={`${filterState === "work" ? "active" : ""} text-header`}
				onClick={onClickHandle}
			>
				Work
			</button>
			<button
				data-index={1}
				className={`${filterState === "academic" ? "active" : ""}`}
				onClick={onClickHandle}
			>
				Academic
			</button>
		</div>
	);
}

type ExperienceListProps = {
	children: (ReactNode | null)[];
};

function ExperienceList({ children }: ExperienceListProps) {
	return <div className="experience__list">{children}</div>;
}

type ExperienceItemProps = {
	data: Experience;
};

function ExperienceItem({ data }: ExperienceItemProps) {
	const [storyVisible, setStoryVisible] = useState(false);
	const storiesModal = useRef<HTMLDialogElement>(null);

	function hasProjectLinks() {
		return data.project_links.length > 0;
	}

	function hasImages() {
		return data.image_links.length > 0;
	}

	function showStory() {
		const current = storiesModal.current;

		if (current !== null) {
			current.showModal();
			setStoryVisible(true);
		}
	}

	function closeStory() {
		const current = storiesModal.current;

		if (current !== null) {
			current.close();
			setStoryVisible(false);
		}
	}

	return (
		<div className="experience__item box__shadow">
			<h3 className="item__title">{data.title}</h3>
			<div className="item__group">
				<span className="icon__span">
					<svg className="icon">
						<use href="icons.svg#calendar-1" />
					</svg>
					{data.start_date}
				</span>

				<span className="icon__span">
					<svg className="icon">
						<use href="icons.svg#calendar-2" />
					</svg>
					{data.end_date}
				</span>
			</div>
			<span className="icon__span">
				<svg className="icon">
					<use href="icons.svg#organization" />
				</svg>
				{data.organization}
			</span>
			<span className="icon__span">
				<svg className="icon">
					<use href="icons.svg#map-pin" />
				</svg>
				{data.location}
			</span>
			<ul className="item__accomplishments">
				{data.accomplishments.map((entry: string, index: number) => (
					<li key={index}>{entry}</li>
				))}
			</ul>

			{(hasProjectLinks() || hasImages()) && (
				<div className="item__actions">
					{hasProjectLinks() &&
						data.project_links.map((project, index) => (
							<a
								key={index}
								href={project.url}
								target="_blank"
								className="action font-mono"
							>
								<svg className="icon">
									<use href="icons.svg#source-code" />
								</svg>
								{project.label}
							</a>
						))}
					{hasImages() && (
						<button className="action font-mono" onClick={() => showStory()}>
							<svg className="icon">
								<use href="icons.svg#images" />
							</svg>
							view story
						</button>
					)}

					{hasImages() && (
						<Story
							ref={storiesModal}
							images={data.image_links}
							storyVisible={storyVisible}
							onClose={() => closeStory()}
						/>
					)}
				</div>
			)}

			<div className="item__technologies">
				{data.technologies.map((tech: string, index: number) => (
					<span key={index} className="technology__item font-mono">
						{tech}
					</span>
				))}
			</div>
		</div>
	);
}

type StoryProps = {
	ref: React.RefObject<HTMLDialogElement | null>;
	images: {
		caption: string;
		url: string;
	}[];
	storyVisible: boolean;
	onClose: VoidFunction;
};

function Story({ ref, images, storyVisible, onClose }: StoryProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [imageLoading, setImageLoading] = useState(false);

	useEffect(() => {
		if (!storyVisible) {
			return;
		}

		// Preload and cache images
		images.forEach((image) => {
			const img = new Image();
			img.src = image.url;
		});
	}, [images]);

	// Compute the width percentange of the mini progress bar depending on the time.
	// ( currentTime / totalTime ) * 100 => the width of the mini progress bar.
	useEffect(() => {
		if (!storyVisible || imageLoading) {
			return;
		}

		const TOTAL_DURATION_S = 5000;
		const startDuration = Date.now();

		const interval = setInterval(() => {
			const currentDuration = Date.now() - startDuration;
			const percentage = Math.min(
				(currentDuration / TOTAL_DURATION_S) * 100,
				100,
			);

			setProgress(percentage);

			if (percentage >= 100) {
				clearInterval(interval);
				nextImage();
			}
		}, 16);

		return () => clearInterval(interval);
	}, [currentImageIndex, storyVisible, imageLoading]);

	useEffect(() => {
		if (!storyVisible) {
			return;
		}
		setImageLoading(true);
	}, [currentImageIndex]);

	function previousImage() {
		if (currentImageIndex <= 0) {
			return;
		}

		setCurrentImageIndex((c) => --c);
		setProgress(0);
	}

	function nextImage() {
		if (currentImageIndex >= images.length - 1) {
			return;
		}

		setCurrentImageIndex((c) => ++c);
		setProgress(0);
	}

	return (
		<dialog
			ref={ref}
			className="story"
			onClose={() => {
				setCurrentImageIndex(0);
				onClose();
			}}
		>
			<div className="duration__container">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentImageIndex(index)}
						className="duration"
						style={
							{
								"--progress":
									currentImageIndex > index
										? "100%"
										: currentImageIndex === index
											? `${progress}%`
											: "0%",
							} as React.CSSProperties
						}
					></button>
				))}
			</div>

			<div className="main">
				<div className="controls">
					<button aria-label="previous-image" onClick={previousImage}></button>
					<button aria-label="nex-image" onClick={nextImage}></button>
				</div>
				<figure>
					<img
						src={images[currentImageIndex].url}
						alt=""
						loading="lazy"
						onLoad={() => setImageLoading(false)}
					/>
					<figcaption>{images[currentImageIndex].caption}</figcaption>

					{imageLoading && (
						<div className="spinner__container">
							<BlocksShuffle3Icon className="icon" />
						</div>
					)}
				</figure>
			</div>
		</dialog>
	);
}
