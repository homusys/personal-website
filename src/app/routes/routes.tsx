import { createHashRouter } from "react-router";
import Home from "./my_home/home";
import WIP from "./wip/wip";

const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/wip",
    Component: WIP,
  },
]);

export default router;
