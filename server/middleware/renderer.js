import React from 'react'
import Path from 'path'
import HtmlPage from './html-page'
import { ServerRouter, createServerRenderContext } from 'react-router'

const scripts = [
	'/assets/app.js'
]

const links = []


export default function Renderer(opts = {}) {
	return (req, res)=> {
		const appPath = Path.resolve('public/app-server')

		if (__DEVELOPMENT__ && require.cache[appPath]) {
			delete require.cache[appPath]
		}

		const Application = require(appPath).default

	  // first create a context for <ServerRouter>, it's where we keep the
	  // results of rendering for the second pass if necessary
	  const context = createServerRenderContext()

	  // render the first time
	  let markup = HtmlPage.renderToString({ 
	  	links, 
	  	scripts,
	  	component: <ServerRouter location={req.url} context={context}>
	      <Application />
	    </ServerRouter>
	  })

	  // get the result
	  const result = context.getResult()

	  // the result will tell you if it redirected, if so, we ignore
	  // the markup and send a proper redirect.
	  if (result.redirect) {
	    res.writeHead(301, {
	      Location: result.redirect.pathname
	    })
	    res.end()
	  } else {
	    // the result will tell you if there were any misses, if so
	    // we can send a 404 and then do a second render pass with
	    // the context to clue the <Miss> components into rendering
	    // this time (on the client they know from componentDidMount)
	    if (result.missed) {
	      res.writeHead(404)
	      markup = HtmlPage.renderToString({ 
	      	links, 
	      	scripts,
	      	component: <ServerRouter location={req.url} context={context}>
			      <Application />
			    </ServerRouter>
	      })
	    }
	    res.write(markup)
	    res.end()
	  }
	}
}