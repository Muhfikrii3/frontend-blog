import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

interface MenuItem {
	label: string;
	path: string;
	query?: string;
}

interface ImageProps {
	src: string;
	alt: string;
	w: number;
	h: number;
}

const Image: FC<ImageProps> = ({ src, alt, w, h }) => (
	<img src={src} alt={alt} width={w} height={h} />
);

const menuItems: MenuItem[] = [
	{ label: "Home", path: "/" },
	{ label: "Trending", path: "/posts", query: "sort=trending" },
	{ label: "Most Popular", path: "/posts", query: "sort=popular" },
	{ label: "About", path: "/about" },
];

const Navbar: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
	};

	const generateLinkPath = (item: MenuItem): string => {
		return item.query ? `${item.path}?${item.query}` : item.path;
	};

	const renderMenuItems = (onClickHandler?: () => void) => (
		<>
			{menuItems.map((item) => (
				<Link
					key={item.label}
					to={generateLinkPath(item)}
					onClick={onClickHandler}
					className="hover:text-blue-600 transition-colors duration-200"
				>
					{item.label}
				</Link>
			))}
		</>
	);

	return (
		<nav className="w-full h-16 md:h-20 flex items-center justify-between">
			<Link to="/" className="flex items-center gap-4 text-2xl font-bold">
				<Image src="logo.png" alt="Shinta Logo" w={32} h={32} />
				<span className="text-gray-800">shintalog</span>
			</Link>

			<div className="md:hidden">
				<button
					type="button"
					className="flex flex-col gap-1.5 cursor-pointer focus:outline-none"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
				>
					<span
						className={`h-3px w-6 bg-gray-800 rounded-md transition-all duration-300 ${
							isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
						}`}
					/>
					<span
						className={`h-3px w-6 bg-gray-800 rounded-md transition-all duration-300 ${
							isMobileMenuOpen ? "opacity-0" : "opacity-100"
						}`}
					/>
					<span
						className={`h-3px w-6 bg-gray-800 rounded-md transition-all duration-300 ${
							isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
						}`}
					/>
				</button>

				{isMobileMenuOpen && (
					<div
						className="fixed inset-0 z-50 bg-black bg-opacity-50"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
				)}

				<div
					className={`fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 text-lg font-medium z-50 transition-transform duration-300 ease-in-out ${
						isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					{renderMenuItems(() => setIsMobileMenuOpen(false))}

					<SignedOut>
						<Link to="/login" onClick={handleLinkClick}>
							<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900 transition-colors">
								Login
							</button>
						</Link>
					</SignedOut>

					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>

			<div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
				{renderMenuItems()}

				<SignedOut>
					<Link to="/login">
						<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900 transition-colors">
							Login
						</button>
					</Link>
				</SignedOut>

				<SignedIn>
					<div className="flex items-center">
						<UserButton />
					</div>
				</SignedIn>
			</div>
		</nav>
	);
};

export default Navbar;
