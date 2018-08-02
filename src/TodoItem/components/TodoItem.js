import React, { Component } from 'react'; 

class TodoItem extends Component{
	constructor(props){
		super(props);

	}

	removeTodo(id){
		this.props.removeTodo(id)
	}

	render(){
		return(
			<div className='row'>
				<div className='col-sm-3'>
				<button className='btn btn-success' onClick={(e)=> this.removeTodo(this.props.id) }>Complete!</button>
				</div>
				<div className='col-sm-9'>{this.props.todo.text}</div>
			</div>
		)
	}
}

export default TodoItem;