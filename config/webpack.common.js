const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getTemplates, getEntries, production } = require('./utils');
const paths = require('./paths');

module.exports = {
	context: paths.src,
	entry: getEntries(),
	target: 'web',
	output: {
		path: paths.dist,
		filename: production() ? 'assets/scripts/[name].js?[contenthash]' : 'assets/scripts/[name].js',
		publicPath: "/",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				include: paths.src,
				use: [
					{
						loader: 'pug-loader',
						options: {
              method: 'html',
							basedir: paths.src,
							pretty: !production(),
						}
					},
				],
			},
			{
				test: /\js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
        test: [/\.(ico|gif|png|jpg|jpeg|woff(2)?|eot|ttf|otf|svg)$/],
        use: 
          [
            {
              loader: 'file-loader',
              options: {
                outputPath: (url, resourcePath) => {

                  if (/favicon/.test(resourcePath)) {
                    return `${paths.dist}/assets/images/favicon/${url}`;
                  }
                  
                  if (/images/.test(resourcePath)) {
                      return `${paths.dist}/assets/images/${url}`;
                  }

                  if (/fonts/.test(resourcePath)) {
                      return `assets/fonts/${url}`;
                  }
                },
                name: '[name].[ext]'
            }
          }
        ]
      }

		]
	},
	resolve: {
		alias: {
			'@scripts': `${paths.src}/assets/scripts`,
			'@styles': `${paths.src}/assets/styles`,
			'@fonts': `${paths.src}/assets/fonts`,
			'@plugins': `${paths.root}/node_modules`,
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
					{ 
						from: `${paths.src}/assets/`, 
						to: `${paths.dist}/assets/`,
						globOptions: {
							ignore: ["**/scripts/*", "**/styles/*", "**/styles/**"],
						},
					},
					{ 
						from: `${paths.root}/manifest.json`, 
						to: `${paths.dist}/`,
					}
			]
		}),
	].concat(getTemplates()),
}