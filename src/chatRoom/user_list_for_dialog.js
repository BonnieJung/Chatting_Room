import React from 'react'
import List from 'material-ui/List/List'
import UserForDialog from './user_for_dialog'


var userIdxForDialog = 0;
const UserList = (props) => {

	const users = props.users.map((user) => {
		userIdxForDialog++;
		return (<UserForDialog key={userIdxForDialog} user={user}/>);
	})

	return (
		<List>
			{users}
		</List>
	)
}
export default UserList
