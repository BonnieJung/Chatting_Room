import React from 'react'

//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import List from 'material-ui/List/List'
import {orange500, blue500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog'

//customized modules
import TopBar from './topbar'
import UserListForDialog from './user_list_for_dialog'
import styles from './index.scss'
import User from './user'

import io from 'socket.io-client'
//var socket = io(`http://localhost:3020`) //comment out after done
var socket = io()

const styles2 = {
	underlineStyle: {
		borderBottomColor: orange500,
	},
};

class ExerciseComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			open: false,
			isJoinSuccess:false,  //if name valid, true
			userName:'',//jbh.
			isDuplicateName:false,
			duplicateMessage:"",
			isSignInTyped:false,
			usersArray: [],
			bubbleArray: [],
			typingMessage : "",// e.g.)Bonnie is typing....
			messageContent : "",
			myName: "",
		}
	}



componentDidMount = () => {  //anything from server
	socket.on('error', this.errorSignIn)
	socket.on('server join', this.onJoined)
	socket.on('server detected typing', this.onTyping)
	socket.on('server message', this.onEngeringMessage)
	socket.on('server leave', this.onLeft)
	socket.on('serverTypingMessageDone', this.onDone)
}

errorSignIn = (msg) =>{
		this.setState({duplicateMessage: msg})
		this.setState({isJoinSuccess:false})
}


onEngeringMessage=(messageFunc)=>{
	this.state.bubbleArray.push(
		<User key={messageFunc.messageIdx} info={messageFunc} isMe={this.state.myName === messageFunc.userName}/>
	)
	//tell everyone that the state of the bubbleArray changed
	this.setState({bubbleArray : this.state.bubbleArray})
}

onTyping =(typingMessage)=>{
		var typingMLocal=""
		if(typingMessage.includes(this.state.myName)){
			typingMLocal=""
		}else{
			typingMLocal=typingMessage
		}
		this.setState({typingMessage:typingMLocal})
}

onJoined = (messageFunc)=>{
		var usersArrayFromServer = messageFunc.userArrayInServer
	  var NamesArray = []
	  usersArrayFromServer.map(item => NamesArray.push(item.Name))

	console.log(usersArrayFromServer)
	console.log(NamesArray)
	//
	this.setState({usersArray : NamesArray})
	console.log(this.state.usersArray)
	this.state.bubbleArray.push(
       <User key={messageFunc.messageIdx} info={messageFunc} isMe={false}/>
	)
	//tell everyone that the state of the bubbleArray changed
	this.setState({bubbleArray : this.state.bubbleArray})
	//tell everyone the whole users
	this.setState({usersArray : this.state.usersArray})
}//end of onJoined

Joining =()=>{
	socket.emit('join', this.state.userName)
	console.log("server got username")
	this.setState({isJoinSuccess:true})
}


onLeft = (messageFunc)=>{
	this.state.bubbleArray.push(
		<User key={messageFunc.messageIdx} info={messageFunc} isMe={false}/>
	)
	//tell everyone that the state of the bubbleArray changed
	this.setState({bubbleArray : this.state.bubbleArray})
}



handleChange=(event, newValue) =>{
	this.setState({userName: newValue});
	this.setState({myName: newValue});
	if(this.state.isSignInTyped === false)
	{
		this.setState({isSignInTyped: true});
	}
}

	handleChangeForTyping=(event, newValue)=>{
		if(newValue.length ===1){
			socket.emit('someoneTyping', this.state.userName)
		}
		this.setState({messageContent:newValue})
	}

	handleOpenDialog = () => {
		this.setState({open: true});
	}
	handleCloseDialog = () => {
		this.setState({open: false});
	}

	handleNewMessage = (e) =>{
		e.preventDefault()
		socket.emit('chat message', this.state.messageContent)
		this.setState({typingMessage:''})//make it empty(to the server)
		socket.emit('typingMessageDone')
		var frm = document.getElementsByName('msgF')[0];
		frm.reset();
	}

	onDone=()=>{
		this.setState({typingMessage:''})//make it empty
	}



	render() {
		return (
			<MuiThemeProvider>
				<div>
					<div>
						<TopBar style={{position: 'fixed', top: '0', width: '80%'}} viewDialog={this.handleOpenDialog}/>
						<Dialog title="Current Users"  modal={false} open={this.state.open} onRequestClose={this.handleCloseDialog}  >
							<div className={styles2.usersList}>
								<UserListForDialog users={this.state.usersArray} />
							</div>
						</Dialog>
					</div>


						{this.state.isJoinSuccess === false &&
						<Card style={{textAlign: 'center'}}>
							<div className={styles.redBrownTitle}>
								Sign In
							</div>
							<div>
								<TextField underlineFocusStyle={styles2.underlineStyle}
													name="user" hintText="Chat Name"
													 onChange={this.handleChange}
													 errorText={this.state.duplicateMessage}/>
							</div>

							<div>
								<form>
								<RaisedButton type="button" disabled={this.state.userName.length === 0}
															onTouchTap={this.Joining}>
									JOIN CHAT</RaisedButton>
								</form>
							</div>
						</Card>
						}
						{this.state.isJoinSuccess === true &&
						<Card>
							<div className={styles.typingAlarm}>
								{this.state.typingMessage}
							</div>
							<CardText>
								<div >
									<div className={styles.messageList}>
									<List>{this.state.bubbleArray}</List>
									</div>
								</div>
							</CardText>

							<CardActions>
							<div style={{position: 'fixed', bottom: '0%', width: '90%'}}>
								<form name="msgF" onSubmit={this.handleNewMessage}>
								<TextField hintText="Message here" fullWidth={true} onChange={this.handleChangeForTyping}
													 underlineFocusStyle={styles2.underlineStyle}/>
								</form>
							</div>
							</CardActions>
						</Card>
						}
				</div>
			</MuiThemeProvider>
		)
	}
}
export default ExerciseComponent



