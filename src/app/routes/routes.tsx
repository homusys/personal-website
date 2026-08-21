import { createHashRouter } from "react-router";
import Experiences from "./my_exp/experience";
import Home from "./my_home/home";
import WIP from "./wip/wip";

const router = createHashRouter([
  {
    path: "/",
    Component: Home,
    index: true,
  },
  {
    path: "/certifications",
    Component: WIP,
  },
  {
    path: "/experiences",
    Component: Experiences,
  },
  {
    path: "/projects",
    Component: WIP,
  },
  {
    path: "/wip",
    Component: WIP,
  },
]);

export default router;
