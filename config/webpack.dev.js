const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths.js');

module.exports = merge(common, {
	mode: "development",
  devServer: {
    static: {
      directory: paths.dist,
    },
    watchFiles: [
      `${paths.src}/assets/**/*`, 
      `${paths.src}/pages/**/*`, 
      `${paths.dist}/`, 
      `${paths.dist}/**/**/*`
    ],
    hot: true,
    compress: true,
		open: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: true,
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
          'style-loader',
					{
						loader: "css-loader",
						options: { sourceMap: true }
					},
          {
            loader: "postcss-loader",
            options: { sourceMap: true }
          },
          {
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			}
    ]
  },
  stats: {
    children: true
  }
})