var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

	entry: {
		bundle: ['webpack-hot-middleware/client', './index']
	},

	output: {
		filename: 'bundle.js', // Will output App_wp_bundle.js
		path: path.join(__dirname, "static"),
		publicPath: '/static/' // Required for webpack-dev-server
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file?name=[name].[ext]?[hash]'
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				loader: 'file?name=[name].[ext]?[hash]'
			}
		]
	},

	resolve: {
		root: [
			path.join(__dirname, "../markup")
		]
	},

	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			'React': 'react',
			'U': 'utils/basic.utils.js',
			'G': 'components/game/game.init.js',
			'_': 'lodash',
			'i18n': 'i18next-client',  // http://i18next.com
			'moment': 'moment'
		})
	]
};
