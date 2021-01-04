const mix = require("laravel-mix");
const purgecss = require("@fullhuman/postcss-purgecss");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
	.sass("resources/scss/app.scss", "public/css")
	.options({
		postCss: [
			require("postcss-import"),
			require("autoprefixer"),
			purgecss({
				content: ["./resources/js"],
				content: [
					"app/**/*.php",
					"resources/**/*.html",
					"resources/**/*.js",
					"resources/**/*.jsx",
					"resources/**/*.ts",
					"resources/**/*.tsx",
					"resources/**/*.php",
					"resources/**/*.vue",
					"resources/**/*.twig",
				],
				defaultExtractor(content) {
					const contentWithoutStyleBlocks = content.replace(
						/<style[^]+?<\/style>/gi,
						""
					);
					return (
						contentWithoutStyleBlocks.match(
							/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
						) || []
					);
				},
				safelist: [
					/-(leave|enter|appear)(|-(to|from|active))$/,
					/^(?!(|.*?:)cursor-move).+-move$/,
					/^router-link(|-exact)-active$/,
					/data-v-.*/,
				],
			}),
		],
	})
	.webpackConfig(require("./webpack.config"));
