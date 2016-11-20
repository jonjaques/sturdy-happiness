var webpack = require('webpack')

module.exports = function(env = 'development') {

	const browser = {
		context: __dirname,
		entry: {
			app: [
				'./app/index'
			]
		},
		target: 'web',
		output: {
			filename: '[name].js',
			path: `${__dirname}/public`
		},
		devtool: 'source-map',
		module: {
		  loaders: [
		    { test: /\.jsx?$/, 
		    	loaders: ['babel-loader'], 
		    	include: `${__dirname}/app` }
		  ]
		},
		plugins: [
			new webpack.EnvironmentPlugin([
			  'NODE_ENV'
			])
		]
	}

	const server = {
		context: browser.context,
		entry: [
			'./app/app'
		],
		target: 'node',
		output: Object.assign({}, browser.output, {
			libraryTarget: 'commonjs2',
			filename: 'app-server.js',
			devtoolModuleFilenameTemplate: '[absolute-resource-path]'
		}),
		module: Object.assign({}, browser.module),
		devtool: 'inline-source-map',
		node: {},
		plugins: [
			new webpack.EnvironmentPlugin([
			  'NODE_ENV'
			])
		]
	}

	if (env === 'production') {
		browser.plugins.push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}))
	}

	return [browser, server]
}