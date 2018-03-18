// 

const eyes = require('eyes')
eyes.defaults.maxLength = 65536
eyes.defaults.showHidden = true
const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const package = require('./package.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin



global.NODE_ENV = process.env.NODE_ENV || 'development'
global.DEVELOPMENT = NODE_ENV == 'development'
global.PRODUCTION = NODE_ENV == 'production'



module.exports = {

	outputDir: 'dist/client',
	dll: true, // faster incremental recompilation, slower initial build
	css: { sourceMap: false }, // only enable when needed
	vueLoader: { hotReload: false }, // hot reload makes debugging difficult

	configureWebpack: function(config) {
		config.entry.app = './src/client/main.ts'
		config.devtool = 'source-map' // increases build size, but needed to debug
		delete config.node.process // required for `got` http client

		config.output.filename = '[name].bundle.[hash].js'
		config.output.chunkFilename = '[chunkhash].chunk.[hash].js'

		if (DEVELOPMENT) {
			// if (process.env.NODE_ENV == 'development') config.watch = true;
			config.output.filename = '[name].bundle.js'
			config.output.chunkFilename = 'chunk.[name].js'
			// assets should not be bundled as long URI strings inside .js bundles
			config.module.rules.forEach(function(rule) {
				if (!Array.isArray(rule.use)) return;
				rule.use.forEach(function(use) {
					if (use.loader != 'url-loader') return;
					use.loader = 'file-loader'
					delete use.options.limit
				})
			})
			// improves memory usage by reducing number of fs.stat calls
			config.plugins.push(new webpack.WatchIgnorePlugin([/node_modules/, /dist/, /server/]))
		}

		// isolate node_modules
		config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor', minChunks: ({ context }) => context && context.includes('node_modules'),
		}))
		// isolate meta manifests
		config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest', minChunks: Infinity,
		}))

		// bundle size debugger
		// config.plugins.push(new BundleAnalyzerPlugin())

	},

	chainWebpack: function(config) {
		config.plugin('define').tap(function(args) {
			// apply package properties as env variables
			args[0]['process.env'].NAME = `"${package.name}"`
			args[0]['process.env'].VERSION = `"${package.version}"`
			args[0]['process.env'].DOMAIN = `"${(DEVELOPMENT ? 'http://dev.' : 'https://') + package.domain}"`
			// import variables defined in config/ 
			let env = dotenv.config({ path: path.resolve(process.cwd(), 'config/client.' + NODE_ENV + '.env') }).parsed || {}
			Object.keys(env).forEach(k => args[0]['process.env'][k] = `"${env[k]}"`)
			return args
		})
		config.plugin('fork-ts-checker').tap(function(args) {
			args[0].tsconfig = 'config/.client.tsconfig.json'
			return args
		})
		config.plugins.delete('no-emit-on-errors')
		config.plugin('friendly-errors').tap(function(args) {
			// don't clear my terminal/console... lol
			args[0].clearConsole = false
			return args
		})
	},

}


