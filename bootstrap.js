require('source-map-support').install()
require('babel-register')()
require('babel-polyfill')

global.__PRODUCTION__ = process.env.NODE_ENV === 'production'
global.__DEVELOPMENT__ = !global.__PRODUCTION__
global.__SERVER__ = true
global.__BROWSER__ = false

require('./server').default({port: process.env.PORT || 3000})