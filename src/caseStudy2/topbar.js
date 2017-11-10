import React from 'react'; // pulls Component object out of React library
import ContactIcon from 'material-ui/svg-icons/Action/account-box'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
const TopBar = (props) => {
	const iconStyles = {
			height: 50,
			width: 50,
			marginTop: -10
		},
		onIconClicked = () => {
			props.viewDialog(); // notify the parent
		}
	return (
		<Toolbar style={{backgroundColor: '#795548', color: 'white', marginBottom:20}}>
			<ToolbarTitle text='Chat It Up'/>
			<IconButton tooltip="Wanna check the current users?;-)"
									tooltipPosition="bottom-left"
									onClick={onIconClicked}
									iconStyle={iconStyles}
			>
				<ContactIcon style={iconStyles} color='white' />
			</IconButton>
		</Toolbar>
	)
}
export default TopBar
