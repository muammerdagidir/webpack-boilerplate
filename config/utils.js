const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require('./paths');

/**
 * @returns {Object}
 */

const getEntries = () => {
	let entries = {
			app: [`${paths.src}/assets/scripts/app.js`, `${paths.src}/assets/styles/app.scss`]
	}
	fs.readdirSync(`${paths.src}/pages`).map(file => {
		entries[file] = {
			import: []
		}
		const items = [`${paths.src}/pages/${file}/${file}.js`, `${paths.src}/pages/${file}/${file}.scss`]
		items.forEach(item => fs.existsSync(item) ? entries[file].import.push(item) : '')
	})
	return entries
}

/**
 * @returns {Array}
 */
const getTemplates = () => fs.readdirSync(`${paths.src}/pages`).map(file => template(file))


/**
 * @param {String} file
 * @returns {Function}
 */
const template = (file) => {
	return new HtmlWebpackPlugin({
		template: `${paths.src}/pages/${file}/${file}.pug`,
		filename: `${file}.html`,
		inject: 'body',
		chunks: ['app', file],
		cache: false,
		minify: {
			removeComments: false,
			collapseWhitespace: false,
			removeRedundantAttributes: false,
			removeScriptTypeAttributes: false,
			removeStyleLinkTypeAttributes: false,
		}
	})
}

/**
 * @returns {Boolean}
 */
const production = () => process.env.NODE_ENV === "production"

module.exports = {
	getEntries,
	getTemplates,
	production
}