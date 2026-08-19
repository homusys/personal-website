import { NavLink } from "react-router";
import Curtains from "../../components/curtains/curtains";

import "./wip.css";

export default function WIP() {
  return (
    <>
      <Curtains />
      <div id="wip">
        <span>
          <h3 className="font-header">Currently in development 🚧</h3>
        </span>
        <NavLink to="/" className="link--strong-true">
          Go back
        </NavLink>
      </div>
    </>
  );
}
