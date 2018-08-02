import React from 'react';
import * as timerStates from '../../timerStates';


const leftPad = (val)=> {
	if(val < 10) return `0${val}`;

	return `${val}`;
}
const TimerDisplay = (props) => (
 	<div>
	    <div className="row center-block">
	      {
	        (props.timerState === timerStates.COMPLETE)
	        && <iframe className="center-block youtube-responsive-width" height="315" src="https://www.youtube.com/embed/3GwjfUFyY6M?list=RDwQWVRfMAEEM?autoplay=0&start=0&controls=0&showinfo=0"></iframe>
	      }
	    </div>
	    <div className="row">
	    	<h2 className="text-center">
	    		<span className="text-primary">Rounds </span>{props.rounds}
	    	</h2>
	      <h2 className="text-center">
	        {`${leftPad(props.currentTime.get('hours'))}:${leftPad(props.currentTime.get('minutes'))}:${leftPad(props.currentTime.get('seconds'))}`}
	      </h2>
	    </div>
  	</div>
);

export default TimerDisplay;
