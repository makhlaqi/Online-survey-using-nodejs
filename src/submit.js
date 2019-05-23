import React, {Component} from 'react';
import Axios from 'axios';


class Submit extends Component {
    constructor(props) {
      super(props);
      this.state = {name: '',answer: ''};
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
  
    handleChangeAnswer(event) {
        this.setState({answer: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name and an answer was submitted: ' + this.state.name +' - '+ this.state.answer);
      event.preventDefault();
      const {name,answer} = this.state;
      //Send a post request
      Axios.post('/answers',{name,answer}).then((result)=>{
          //access resutls
          console.log(result);
      });
      }
    
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleChangeName} required/>
          </label>
          <label>
          Answer:
          <input type="text" value={this.state.answer} onChange={this.handleChangeAnswer} required/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}
  
  export default Submit;