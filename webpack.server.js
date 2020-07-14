const webpack = require("webpack");
const path = require("path");
const slsw = require("serverless-webpack");

console.log("Webpack config is in", __dirname);
console.log("slsw found Entries: ", slsw.lib.entries);

module.exports = {
	mode: "production",
	optimization: {
		minimize: true,
	},
	/*
	externals: [],
	externals: {
		react: "React",
	},
	*/
	entry: slsw.lib.entries,
	target: "node",
	output: {
		libraryTarget: "commonjs2",
		library: "index",
		path: path.resolve(__dirname, ".webpack"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".mjs"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)/,
				loader: "babel-loader",
				include: [
					path.resolve(__dirname, "./"),
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "server"),
				],
				exclude: [path.resolve(__dirname, "node_modules")],
			},
		],
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
	],
};
