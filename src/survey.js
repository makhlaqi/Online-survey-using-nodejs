import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';



class Survey extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        questions :[]
      };
      }
       
      componentWillMount(){
        
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
         
        });
  
        return(<tbody> {questions}</tbody>);
      }
    
  }

  export default Survey;