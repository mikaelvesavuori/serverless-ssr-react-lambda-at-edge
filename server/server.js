"use strict";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";

import { getHtml } from "./helpers/getHtml.mjs";
import { getPath } from "./helpers/getPath.mjs";
import { style } from "./helpers/style.mjs";

/**
 * @desc This is the Lambda function that's going to run upon the "origin request" event in AWS Cloudfront
 * @param {*} event - Description
 * @param {*} context - Description
 * @param {*} callback - Description
 */
export const handler = async (event, context, callback) => {
	const DATA = JSON.stringify({
		event,
		context,
	});

	const PATH = getPath(event);

	const REACT_HTML = renderToString(
		<StaticRouter location={PATH}>
			<App data={DATA} />
		</StaticRouter>
	);

	const body = getHtml({
		title: "React SSR on AWS Lambda@Edge",
		body: REACT_HTML,
		data: DATA,
		styles: style,
	});

	const headers = {
		"cache-control": [
			{
				key: "Cache-Control",
				value: "max-age=10",
			},
		],
		"content-type": [
			{
				key: "Content-Type",
				value: "text/html",
			},
		],
		"content-encoding": [
			{
				key: "Content-Encoding",
				value: "UTF-8",
			},
		],
	};

	const response = {
		status: "200",
		statusDescription: "OK",
		headers,
		body,
	};

	callback(null, response);
};

export default handler;
