import React from "react";
import { render, hydrate } from "react-dom";
import { StaticRouter, BrowserRouter } from "react-router-dom";

import App from "./App";

const data = window ? window.__INITIAL__DATA__ : "";

render(
	<BrowserRouter>
		<App data={data} />
	</BrowserRouter>,
	document.getElementById("root")
);
