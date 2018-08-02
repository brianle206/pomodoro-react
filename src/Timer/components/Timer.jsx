import React, { Component } from 'react';
import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';
import TimerButton from '../../TimerButton/components/TimerButton';
import TimerConfig from '../../TimerConfig/components/TimerConfig';
import TodoInput from '../../TodoInput/components/TodoInput';
import TodoItem from '../../TodoItem/components/TodoItem';
import moment from 'moment';
import * as timerStates from '../../timerStates';

class Timer extends Component {
	constructor(){
		super();
		this.state = {
			currentTime: moment.duration(25, 'minutes'),
			baseTime: moment.duration(25, 'minutes'),
			timerState: timerStates.NOT_SET,
			breakTimer: moment.duration(4, 'minutes'),
			testTimer: moment.duration(5,'seconds'),
			timer: null,
			rounds: 4,
			todos: [],
			nextId: 0
		};

		this.setBaseTime = this.setBaseTime.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.reduceTimer = this.reduceTimer.bind(this);
		this.addTodo = this.addTodo.bind(this);
    	this.removeTodo = this.removeTodo.bind(this);
    	this.breakTime = this.breakTime.bind(this);
	}

	addTodo(todoText){
	    let todos = this.state.todos.slice();
	    todos.push({id: this.state.nextId, text: todoText})
	    this.setState({
	      todos: todos,
	      nextId: ++this.state.nextId
	    });
	  }

	removeTodo(id){
		console.log('Removing: ',id)
		this.setState({
	  	todos: this.state.todos.filter((todo, index) => todo.id !== id)
		})
	}

	setBaseTime(newBaseTime){
		this.setState({
			baseTime: newBaseTime,
			currentTime: newBaseTime
		})
	}

	stopTimer(){
		if(this.state.timer){
			clearInterval(this.state.timer);
		}
		this.setState({
			timerState: timerStates.NOT_SET,
			timer: null,
			currentTime: moment.duration(this.state.baseTime),
		})
	}

	resetTimer(){
		if(this.state.timer){
			clearInterval(this.state.timer);
		}
		this.setState({
			timerState: timerStates.NOT_SET,
			timer: null,
			rounds: 4,
			currentTime: moment.duration(this.state.baseTime),
		})
	}

	startTimer(){
		this.setState({
			timerState: timerStates.RUNNING,
			timer: setInterval(this.reduceTimer, 1000)
		})
	}

	reduceTimer() {
	    if (this.state.currentTime.get('hours') === 0
          	&& this.state.currentTime.get('minutes') === 0
      		&& this.state.currentTime.get('seconds') === 0)
  		 	{
      			this.completeTimer();
	      		return;
	    	}

	    const newTime = moment.duration(this.state.currentTime);
	    newTime.subtract(1, 'second');

	    this.setState({
	      	currentTime: newTime,
	    });
  	}

  	breakTime() {
		this.setState({
			currentTime: this.state.breakTimer,
			timerState: timerStates.BREAK,
			timer: setInterval(this.reduceTimer, 1000)
		});
  	}

	completeTimer() {
	    if (this.state.timer) {
	      	clearInterval(this.state.timer);
	    }
	    console.log(this.state.timerState)
	    this.setState({
	      	timer: null,
	    });
	    if(this.state.rounds != 0 && this.state.timerState === timerStates.BREAK){
	    	console.log("starting round: ", this.state.rounds)
	    	this.setState({
	    		timerState: timerStates.RUNNING,
	    		currentTime: this.state.baseTime
	    	})
	    	console.log("its starting regular timer")
	    	this.startTimer();
	    }else if(this.state.rounds != 0 && this.state.timerState == timerStates.RUNNING){
	    	console.log('its starting break time');
	    	this.setState({
		      	rounds: --this.state.rounds
		    });
	    	this.breakTime();
	    
	    }else if(this.state.rounds === 0){
    	 	this.setState({
		      timerState: timerStates.COMPLETE,
		      timer: null,
		    });
	    }
  	}

	render()
	{
		return (
			<div className='container-fluid'>
			    <TimerHeader />
			    <TimerDisplay 
			    	currentTime={this.state.currentTime}
			    	timerState={this.state.timerState}
			    	rounds={this.state.rounds}
			    />

			    <TimerButton 
			    	startTimer={this.startTimer} 
			    	stopTimer={this.stopTimer}
			    	timerState={this.state.timerState}
			    	resetTimer={this.resetTimer}
			    />

			    {
			    	(this.state.timerState === timerStates.NOT_SET)
			    	&&
				    (<TimerConfig 
				    	baseTime={this.state.baseTime} 
				    	setBaseTime={this.setBaseTime}
				    />)
			    }
			     {
			    	(this.state.timerState === timerStates.COMPLETE)
			    	&&
				    (<TimerConfig 
				    	baseTime={this.state.baseTime} 
				    	setBaseTime={this.setBaseTime}
				    />)
			    }
			    {
			    	(this.state.timerState === timerStates.BREAK)
			    	&&
				    (<h2 className='text-center text-danger'>BREAK TIME did you complete your task?</h2>)
			    }

			    <TodoInput todoText="" addTodo={this.addTodo}/>
			    <ul>
		          {
		            this.state.todos.map((todo) => {
		              return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo} />
		            })
		          }
	          </ul>
			</div>
		);
	}
}


export default Timer;