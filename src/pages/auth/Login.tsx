import { SignIn } from "@clerk/clerk-react";
import RemoveElements from "../../components/remove/Remove";

const LoginPage = () => {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-80px)]">
			<RemoveElements
				selectors={[
					".cl-footer",
					".cl-footerAction",
					'[class*="footer"]',
				]}
			>
				<SignIn signUpUrl="/register" />
			</RemoveElements>
		</div>
	);
};

export default LoginPage;
