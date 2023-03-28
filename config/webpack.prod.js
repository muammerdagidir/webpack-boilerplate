const { merge } = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: "production",
	module: {
    rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader, 
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
				],
			},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
              maxSize: 10 * 1024 
          }
        }
      },
		]
  },
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/styles/[name].css?[contenthash]'
		}),
		new StylelintPlugin({ 
			failOnError: false 
		}),
		new ESLintPlugin({
			files: ['.', 'src', 'config'],
			exclude: [],
			formatter: 'table'
		}),
		new PrettierPlugin(),
	],
	optimization: {
		minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['imagemin-gifsicle', { interlaced: true }],
              ['imagemin-jpegtran', { progressive: true }],
              ['imagemin-optipng', { optimizationLevel: 5 }],
              [
                'imagemin-svgo',
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    }
                  ]
                }
              ]
            ]
          }
        },
      })
    ],
  },
})