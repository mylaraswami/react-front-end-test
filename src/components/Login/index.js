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
  LockIcon, 
  Typography, 
  FormControl, 
  User, 
  withStyles  
} 
from "../../includes";
import { userLoginSubmit } from "../../includes/actions";
import Snackbar from "../Snackbar";
import styles from '../Common/appStyle'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
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
    }
  }

  validateLoginValues(){
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
    var isValueOk = this.validateLoginValues()
    if(isValueOk){
      this.setState({isWaitingForResponse: true})
      event.preventDefault();
      let values = this.state
      this.props.onLoginSubmit(values)
    }
  }

  navigateToSignUp(){
    this.props.history.push("/signup");
  }

  componentWillReceiveProps(nextProps){
    if(this.state.isWaitingForResponse && nextProps.userOperation.response.status == 'success'){
      this.setState({isWaitingForResponse: false})
      this.props.history.push('/dashboard')
    }
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
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Login</Typography>
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
                Login
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick ={() => this.navigateToSignUp()}
              >
                SignUp
              </Button>
            </ValidatorForm>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  onLoginSubmit: userLoginSubmit
};
const stylesLogin = withStyles(styles)(Login);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(stylesLogin);
