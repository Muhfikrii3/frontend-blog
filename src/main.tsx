import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./assets/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		"Root element not found. Please check your index.html file."
	);
}

const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);
