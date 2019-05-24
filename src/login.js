import React, {Component} from 'react';
import Axios from 'axios';
import "./login.css"
import Auth from './Auth';
import Answers from './answers';

class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }
    
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }

      handleLogin(event) {
        event.preventDefault();
        const {name,password} = this.state;
        alert("login");
        
        Axios.post('/login',{name,password}).then((response)=>{
          console.log('Result:', response);
            Auth.authenticateUser(response.data.token);
            console.log('token:', Auth.getToken());
            this.setState({name:'', password:''});
            this.props.refreshPage();

            if(Auth.isUserAuthenticated){
              window.location ="/";
            }
        });       
        
      }

      render() {
        return (
         
            <form onSubmit={this.handleLogin}>
            
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
            </label>
            
            <label>
            Password: 
            <input type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
            </label>
            
            <input type="submit" value="Admin-Login" />
            
            
            </form>
            
        );
      }
}

export default Login;