import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'
import Bubble from './bubble'
import Triangle from './triangle'
class User extends React.Component {
	constructor() {
		super()
	}
	componentDidMount = () => {
		var messageDOM = ReactDOM.findDOMNode(this)
		messageDOM.scrollIntoView({block: "end", behavior: "smooth"})
		messageDOM.blur()
	}
	render() {
		var user = this.props.user
		const iconStyles = {
				height: 50,
				width: 50,
				marginTop: -10
			}
		return (
			<ListItem ref='user'  style={{textAlign: 'left'}} disabled={true}>
				<Bubble user={this.props.info} color={this.props.info.colour} isMe={this.props.isMe}/>
				<Triangle color={this.props.info.colour} isMe={this.props.isMe}/>
			</ListItem>
		)
	}
}
export default User
