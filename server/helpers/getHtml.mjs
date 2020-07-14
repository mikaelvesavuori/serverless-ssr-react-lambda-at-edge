/**
 * @desc Description
 * @param {*} param0 - Description
 */
export const getHtml = ({ body, styles, title, data }) => {
	const stylesheet = styles ? `<style>${styles}</style>` : "";

	return `
	<!DOCTYPE html>
	<html lang="en-US">
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no"
			/>

			<title>${title}</title>

			<!-- Inline critical CSS -->
			${stylesheet}
			<script>window.__INITIAL__DATA__ = ${JSON.stringify(data)}</script>
		</head>

		<body style="margin:0">
			<div id="root">${body}</div>
			<script src="/assets/app.js"></script>
		</body>
	</html>
  `;
};
