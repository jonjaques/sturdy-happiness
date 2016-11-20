import React, {Component} from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

export default class HtmlPage extends Component {

	static docType = '<!doctype html>'

	render() {
		const {scripts, links, component = <div/>} = this.props
		return <html>
			<head>
				{links.map((link, linkIndex)=> {
					return <link href={link} key={linkIndex} rel="stylesheet" />
				})}
			</head>
			<body>
				<div id="application-container" dangerouslySetInnerHTML={{__html: renderToString(component)}}/>
				{scripts.map((script, scriptIndex) => {
					return <script src={script} key={scriptIndex} />
				})}
			</body>
		</html>
	}

	static renderToString(props) {
		let html = renderToStaticMarkup(<HtmlPage {...props} />)
		return `${HtmlPage.docType}${html}`
	}
}