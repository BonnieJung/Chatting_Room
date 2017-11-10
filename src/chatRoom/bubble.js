import React from 'react'
import styles from './index.scss'

var styleWhat = styles.userBubble
const Bubble = (props) => {
	if(props.isMe===true){
		styleWhat = styles.userBubble
	}else{
		styleWhat = styles.BubbleOnTheRight
	}
		return (
			<div className={styleWhat} style={{backgroundColor: props.color, color:'white'}}>
				<span style={{fontSize:'x-small', fontWeight:'bold'}}>At: {props.user.time}</span>
				<br />
				<span style={{fontSize: 'smaller'}}>{props.user.userName} says</span>
				<br />
				<span>{props.user.message}</span>
			</div>
		)
	}

export default Bubble
