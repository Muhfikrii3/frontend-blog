import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MainLayout: FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<Navbar />
			</div>
			<main className="flex-1 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
