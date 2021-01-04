const path = require("path");

module.exports = {
	resolve: {
		alias: {
			"@": path.resolve("resources/js"),
		},
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: "pug-plain-loader",
			},
		],
	},
};
