import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import NotFound from "./components/NotFound/index.js";

const SomeRoute = loadable(() => import("./routes/SomeRoute"));
const AnotherRoute = loadable(() => import("./routes/AnotherRoute"));

const Root = () => <h1>React SSR on Lambda@Edge</h1>;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data,
			isOpen: false,
		};
	}

	handleOpenModal = () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};

	render() {
		return (
			<Switch>
				<Route exact path="/someroute">
					<SomeRoute />
				</Route>
				<Route exact path="/anotherroute">
					<AnotherRoute />
				</Route>
				<Route exact path="/" component={Root} />
				<Route component={NotFound} />
			</Switch>
		);
	}
}

App.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

App.defaultTypes = {
	data: {},
};

export default App;
