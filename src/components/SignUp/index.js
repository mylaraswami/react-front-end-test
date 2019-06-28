import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  ValidatorForm, 
  TextValidator 
} 
from "react-material-ui-form-validator";
import { 
  CssBaseline, 
  Button, 
  Paper, 
  Avatar, 
  PeopleIcon,
  Typography, 
  FormControl, 
  User, 
  withStyles  
} 
from "../../includes";
import { userSignUpSubmit } from "../../includes/actions";
import Snackbar from "../Snackbar";
import styles from '../Common/appStyle'

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      password: ''
    }
  }

  isLogin() {
    if (User.isLogin()) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    this.isLogin();
  }

  componentWillMount() {
    this.isLogin();
  }

  handleChange = event => {
    if (event.target.name === "email") {
      this.setState({email: event.target.value})
    } else if (event.target.name === "password") {
      this.setState({password: event.target.value})
    }else if(event.target.name === "name"){
      this.setState({name: event.target.value})
    }
  }

  validateSignUpValues(){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.state.email) == false) {
      alert('Invalid Email Address');
      return false;
    }else{
      if(this.state.password.length < 5){
        alert('password should be atleast 5 characters')
        return false
      }else{
        return true
      }
    }
  }

  onSubmit(event) {
    var isValuesOk = this.validateSignUpValues()
    if(isValuesOk){
      this.setState({isWaitingForResponse: true})
      event.preventDefault();
      let values = this.state
      let regData = {
        "email": this.state.email,
        "fullname": this.state.name,
        "password": this.state.password
      }
      this.props.onSignUpSubmit(regData)
    }
  }

  componentWillReceiveProps(nextProps){
     if(this.state.isWaitingForResponse && nextProps.userOperation.response.status == 'success'){
      this.setState({isWaitingForResponse: false})
      this.props.history.push('/dashboard')
    }
  }

  navigateToSignIn(){
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Snackbar {...this.props.alert} />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
            <Typography variant="headline">Create Your Account</Typography>
            <ValidatorForm
              className={classes.form}
              onSubmit={this.onSubmit.bind(this)}
              onError={errors => console.log(errors)}
            >
              <FormControl margin="normal" required fullWidth>
                <TextValidator
                  label="Email"
                  validators={["required"]}
                  name="email"
                  id="email"
                  value={this.state.email}
                  errorMessages={["Field Cannot Be Blank"]}
                  onChange={(e)=>{this.handleChange(e)}}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextValidator
                  label="Name"
                  validators={["required"]}
                  name="name"
                  id="name"
                  value={this.state.name}
                  errorMessages={["Field Cannot Be Blank"]}
                  onChange={(e)=>{this.handleChange(e)}}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextValidator
                  label="Password"
                  name="password"
                  type="password"
                  validators={["required"]}
                  errorMessages={["Field Cannot Be Blank"]}
                  id="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={(e)=>{this.handleChange(e)}}
                />
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
              >
                SignUp
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick ={() => this.navigateToSignIn()}
              >
                Have already account ? singin
              </Button>
            </ValidatorForm>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  onSignUpSubmit: userSignUpSubmit
};
const stylesSignUp = withStyles(styles)(SignUp);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(stylesSignUp);
