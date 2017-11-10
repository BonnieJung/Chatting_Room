import React from 'react'

const Triangle = (props) => {
	if(props.isMe === true){
		return (
			<div
				style={{content:"", /* triangle */
					position:'absolute',
					bottom:'-10px', /* value = - border-top-width - border-bottom-width */
					left: '50px', /* controls horizontal position */
					borderWidth: '10px 10px 0', /* vary these values to change the angle of the vertex */
					borderStyle: 'solid',
					borderColor: `${props.color} transparent`}} className=""/>
		)
	}
	else
	{
		return (
			<div
				style={{content:"", /* triangle */
					position:'absolute',
					bottom:'-10px', /* value = - border-top-width - border-bottom-width */
					left: '45%', /* controls horizontal position */
					borderWidth: '10px 10px 0', /* vary these values to change the angle of the vertex */
					borderStyle: 'solid',
					borderColor: `${props.color} transparent`}} />
		)
	}
}
export default Triangle
