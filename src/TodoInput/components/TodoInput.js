import React, { Component } from 'react';

class TodoInput extends Component {
	constructor(props){
		super(props)

		this.state ={value: "Test"};

		this.handleChange = this.handleChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}

	handleChange(e){
		this.setState({value: e.target.value})
	}
	addTodo(todo){
		if(todo.length > 0){
			this.props.addTodo(todo);
			this.setState({value: ''});
		}
	}

	render(){
		return(

			<div className='row control-row'>
			<h2 className='text-primary'>Todo List</h2>
				<div className='form-group'>
					<div className='col-sm-9'>
						<input className='form-control' type='text' value={this.state.value} onChange={this.handleChange} />
					</div>
				</div>
				
				<div className='col-sm-3'>
					<button className='btn btn-primary' onClick={()=> this.addTodo(this.state.value)}>Add</button>
				</div>
			</div>
		)
	}

}

export default TodoInput;