import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'
import ContactIcon from 'material-ui/svg-icons/Action/account-box'
class UserForDialog extends React.Component {
	constructor() {
		super()
	}
	componentDidMount = () => {
		var messageDOM = ReactDOM.findDOMNode(this)
		messageDOM.scrollIntoView({block: "end", behavior: "smooth"})
		messageDOM.blur()
	}
	render() {
		var userInputFromProps = this.props.user
		const iconStyles = {
				height: 50,
				width: 50,
				marginTop: -10
			}
		return (
			<ListItem ref='user'  style={{textAlign: 'left'}} disabled={true}
				leftIcon={<ContactIcon className={iconStyles}/>}
				primaryText={userInputFromProps}
			/>
		)
	}
}
export default UserForDialog
