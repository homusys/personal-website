import { type ReactNode } from "react";

import "./app_layout.css";

export default function AppLayout({ children }: { children: ReactNode[] }) {
	return <div className="app__layout">{children}</div>;
}
