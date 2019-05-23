import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';
//import survey from './survey.css';

//animation: App-logo-spin infinite 20s linear;
class Answers extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        answers :[]
      };
    }
       
    componentWillMount(){

       
        axios.get('/answers',{headers: {
          Authorization: "Bearer" + Auth.getToken()
       }}).then((response) => {
          console.log(response.data);
          this.setState({
              answers: response.data
          })
        });

/*
        axios.get('/answers').then((response) => {
          console.log(response.data);
          this.setState({
              answers: response.data
          });
        });
        */

    }

      render() {
        let answers = this.state.answers.map((answers) => {
          return(
            //<div className="ans">
              <tr>
                <p>
                  <td className="class">{answers.name}</td>
                </p>
                <p>
                  <td>{answers.answer}</td>
                </p>
                
            </tr>
          )
         // </div>
        });
  
        return(<tbody> {answers}</tbody>);
      }
    
  }

  export default Answers;