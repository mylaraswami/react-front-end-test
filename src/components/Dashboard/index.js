import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  ValidatorForm, 
  TextValidator 
} 
from "react-material-ui-form-validator";
import { 
  Button, 
  Typography, 
  Input,
  Table,
  TableCell,
  TableRow,
  TableBody  
} 
from "../../includes";
import appStyle from '../Common/appStyle'
import { findFactorialValue } from "../../includes/actions";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: '',
      result: '',
    }
  }

  handleChange = (event) => {
    if(event.target.name == 'input'){
      this.setState({number: event.target.value})
    }
  }

  findFactorial(){
    this.props.findFactorialValue(this.state.number)
  }

  componentWillReceiveProps(nextProps){
    var response = nextProps.userOperation.response
    if(response){
      this.setState({
        result: response.encryptFact
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Typography variant="display1" gutterBottom component="h2">
        Do Your calculation
      </Typography>
      <div>
        <p style={{fontSize: 20,fontWeight: 600}}>Enter number to get factorial - </p>
      </div>
      <Table>
         <TableBody>
            <TableRow key='1' style={{border: 'none'}}>
              <TableCell align="left">
                 <Input 
                    type="number"
                    label="input"
                    validators={["required"]}
                    name="input"
                    id="input"
                    value={this.state.number}
                    onChange={(e)=>{this.handleChange(e)}}
                  />
              </TableCell>
              <TableCell align="left">
                <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{width: '40%'}}
                onClick ={() => this.findFactorial()}
              >
                Find Factorial
              </Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
             <TableRow key='2' style={{marginTop: 30}} style={{border: 'none'}}>
              <TableCell align="left">
                <span style={{fontWeight: 600}}>Result</span>
              </TableCell>
              <TableCell align="left">
               <span style={{fontWeight: 600}}>{this.state.result}</span>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
        </TableBody>
      </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};


export default connect(
  mapStateToProps,
  {findFactorialValue}
)(Dashboard);
