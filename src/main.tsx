import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import LoginPage from "./pages/auth/Login.tsx";
import MainLayout from "./layouts/mainLayout.tsx";
import { publishableKey } from "./services/api.ts";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = publishableKey;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <App />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		"Root element not found. Please check your index.html file."
	);
}

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</QueryClientProvider>
		</ClerkProvider>
	</StrictMode>
);
