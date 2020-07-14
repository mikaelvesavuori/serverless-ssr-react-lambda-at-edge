import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AnotherRoute = () => (
	<>
		<h1>AnotherRoute</h1>
		<Link to="/someroute">Go to "SomeRoute"</Link>
	</>
);

AnotherRoute.propTypes = {};

AnotherRoute.defaultTypes = {};

export default AnotherRoute;
