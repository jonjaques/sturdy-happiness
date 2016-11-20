import Express from 'express'
import renderer from './middleware/renderer'

const server = Express()

server.use('/assets', Express.static('public'))
server.get('/*', renderer())

export default function start({port}) {
	server.listen(port)
}