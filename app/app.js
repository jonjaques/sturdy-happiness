import React from 'react'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import Link from 'react-router/Link'

export default function Application(props) {
	return <div id="application">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>
    <hr/>
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/about" component={About} />
    <Match pattern="/topics" component={Topics} />
    <Miss component={NotFound} />
	</div>
}

const Home = props => <h1>Home</h1>
const About = props => <h1>About</h1>
const Topics = props => <h1>Topics</h1>
const NotFound = props => <h1>Not Found</h1>