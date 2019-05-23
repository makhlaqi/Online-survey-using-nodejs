import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';
import Submit from './submit';
import Login from './login';
import Survey from './survey';
import Answers from './answers';

class Homepage  extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.refreshPage = this.refreshPage.bind(this);
    }

    toggle() {
		this.setState({
			shown: !this.state.shown
		});
    }
    
    handelLogout (){

        localStorage.removeItem("token");
        window.location = "/";
            }
    refreshPage(){
        this.forceUpdate();
    }

    componentWillMount(){
        console.log('Check if is token:', Auth.isUserAuthenticated());
    }

    render() {
        var shown = {
			display: this.state.shown ? "none" : "block"
		};

		var hidden = {
            display: this.state.shown ? "block" : "none"
        };
       //<Login/> 
        return (
           
           <div>
            {Auth.isUserAuthenticated() ? (
                <div>
                    
                    <button onClick={this.handelLogout} >log out </button>
            <Answers  />
            
                </div>
             ) : (
               <div id="login">
                 <div style={ shown }>
                    <Login refreshPage={this.refreshPage} />
                    
                <button style={hidden} onClick={this.toggle.bind(this)}>Admin Login</button>
                
                 </div>
             
                  

               </div>
           )}
           </div>
        );
    }
}

export default Homepage;