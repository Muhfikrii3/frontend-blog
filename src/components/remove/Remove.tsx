import { useEffect, useRef, type ReactNode } from "react";

interface RemoveElementsProps {
	selectors: string[];
	children: ReactNode;
}

const RemoveElements = ({ selectors, children }: RemoveElementsProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const removeElements = () => {
			selectors.forEach((selector) => {
				try {
					if (selector.includes(":contains(")) {
						const textMatch = selector.match(
							/:contains\(["']?(.+?)["']?\)/
						);
						if (textMatch) {
							const textToFind = textMatch[1].toLowerCase();
							const allElements =
								containerRef.current!.querySelectorAll("*");

							allElements.forEach((el) => {
								const text =
									el.textContent?.toLowerCase() || "";
								if (text.includes(textToFind)) {
									(el as HTMLElement).style.display = "none";
								}
							});
						}
					} else {
						const elements =
							containerRef.current!.querySelectorAll(selector);
						elements.forEach((el) => {
							(el as HTMLElement).style.display = "none";
						});
					}
				} catch (err) {
					console.warn(`Selector "${selector}" error:`, err);
				}
			});
		};

		const timers = [
			setTimeout(removeElements, 100),
			setTimeout(removeElements, 500),
			setTimeout(removeElements, 1000),
		];

		const observer = new MutationObserver(removeElements);
		if (containerRef.current) {
			observer.observe(containerRef.current, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			timers.forEach(clearTimeout);
			observer.disconnect();
		};
	}, [selectors]);

	return (
		<div ref={containerRef} style={{ display: "contents" }}>
			{children}
		</div>
	);
};

export default RemoveElements;
