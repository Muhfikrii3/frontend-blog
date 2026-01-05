import { StrictMode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth/Login.tsx";
import MainLayout from "./layouts/mainLayout.tsx";
import { publishableKey } from "./services/api.ts";
import Homepage from "./pages/home/Home.tsx";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = publishableKey;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

function App() {
	return (
		<StrictMode>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<Homepage />} />
							<Route path="login" element={<LoginPage />} />
						</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
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
}

export default App;
