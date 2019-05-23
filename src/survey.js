import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';
//import survey from './survey.css';

//animation: App-logo-spin infinite 20s linear;
class Survey extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        questions :[]
      };
      }
       
      componentWillMount(){
        
       /* 
        axios.get('/answers',{headers: {
          Authorization: "Bearer" + Auth.getToken()
       }}).then((response) => {
          console.log(response.data);
          this.setState({
              questions: response.data
          })
        });
*/

        axios.get('/questions').then((response) => {
          console.log(response.data);
          this.setState({
              questions: response.data
          })
        });

      }
      render() {
        let questions = this.state.questions.map((question) => {
          return(
            //<div className="ans">
              <tr>
                <p>
                  <td className="Option1">{question.question}</td>
                </p>
                <p>
                  <td>{question.option1}</td>
                </p>
                <p>
                  <td>{question.option2}</td>
                </p>
                <p>
                  <td>{question.option3}</td>
                </p>
            </tr>
          )
         // </div>
        });
  
        return(<tbody> {questions}</tbody>);
      }
    
  }

  export default Survey;