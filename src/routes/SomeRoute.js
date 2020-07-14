import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SomeRoute = () => (
	<>
		<h1>SomeRoute</h1>
		<Link to="/anotherroute">Go to "AnotherRoute"</Link>
	</>
);

SomeRoute.propTypes = {};

SomeRoute.defaultTypes = {};

export default SomeRoute;
