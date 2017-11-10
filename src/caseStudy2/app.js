import React from 'react';
import ReactDOM from 'react-dom'
import ExerciseComponent from './caseStudy2Chat'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
ReactDOM.render(
	<ExerciseComponent />, document.getElementById('app')
)
