import "./navbar.css";

export default function NavBar() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="" className="nav__link nav__container">
          <span className="font-display"> Carl </span>
        </a>
        <div className="nav__container">
          <ul className="nav__links">
            <li>
              <a href=""> About </a>
            </li>

            <li>
              <a href=""> Skills </a>
            </li>

            <li>
              <a href=""> Work Experience </a>
            </li>

            <li>
              <a href=""> </a>
            </li>

            <li>
              <a href=""> Others </a>
            </li>

            <li>
              <a href=""> Contact </a>
            </li>
          </ul>

          <button
            id="navBurger"
            className="nav__burger icon__button icon__button--size-l"
          >
            <svg className="icon icon--size-m">
              <use href="icons.svg#burger" />
            </svg>
          </button>

          <button
            id="navThemer"
            className="nav__themer icon__button icon__button--size-l"
          >
            <svg className="icon icon--size-m">
              <use href="icons.svg#sun" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
