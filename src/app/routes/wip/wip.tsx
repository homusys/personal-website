import { NavLink } from "react-router";

export default function WIP() {
  return (
    <div id="wip">
      <span>
        <h3 className="font-header">Currently in development 🚧</h3>
      </span>
      <NavLink to="/" className="link--strong-true">
        Go back
      </NavLink>
    </div>
  );
}
