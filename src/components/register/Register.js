import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Box, 
  TextField as MaterialTextField, 
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography 
} from '@material-ui/core'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import RemoveRedEyeOutlined from '@material-ui/icons/RemoveRedEyeOutlined'
import { Button } from '../common'
import { grey } from '@material-ui/core/colors'
import { authAction } from '../../actions'
import { PATHS } from '../../constants';
import campuses from '../../campuses.json'
// import StepWizard from "react-step-wizard";
// import Account from './account'


const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    height: 700,
    width: 450,
    borderRadius: 10,
    border: `1px solid ${grey[400]}`,
    boxSizing: 'border-box',
    padding: '48px 40px 36px',
    position: 'relative',
  },
  buttonOuterContainer: {
    position: 'absolute',
    left: 48,
    right: 48,
    bottom: 36
  },
  buttonInnerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nameContainer: {
    display: 'flex',
    margin: '15px 0px'
  },
  emailContainer: {
    margin: '15px 0px'
  },
  passwordContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 0px'
  }
}

const TextField = (props) => {
  const textFieldStyles = makeStyles({
    input: { height: 20, fontSize: 14, padding: "7px 11px" },
    label: { fontSize: 14, transform: "translate(14px, 10px) scale(1)" }
  })

  const classes = textFieldStyles()
  return <MaterialTextField
    InputProps={{ classes: { input: classes.input } }}
    InputLabelProps={{ classes: { outlined: classes.label } }}
    {...props}
  />
}

class Register extends Component {
  state = {
    campuses: campuses,
    fname: {
      value: null,
      error: null
    },
    mname: {
      value: null,
      error: null
    },
    lname: {
      value: null,
      error: null
    },
    suffix: {
      value: null,
      error: null
    },
    phone: {
      value: null,
      error: null
    },
    campus: {
      value: null,
      error: null
    },
    location: {
      value: null,
      error: null
    },
    email: {
      value: null,
      error: null
    },
    password: {
      value: null,
      error: null,
      confirm: null,
      show: false
    },
  }
  componentWillMount(){
    console.log(campuses)
  }

  render() {
    const { fname, mname, lname, suffix, phone, campus, campuses, location, email, password } = this.state
    let writer = campuses.map((campus, i) => {
      return (<MenuItem id={i} value={campus.code}>{campus.name}</MenuItem>)
    });
    return (
      <div style={styles.body}>
        <Box style={styles.main}>
          <Typography variant="h4">New Account</Typography>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='First Name'
              error={fname.error}
              onChange={(event) => this.setState({ fname: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Middle Name'
              error={mname.error}
              onChange={(event) => this.setState({ mname: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Last Name'
              error={lname.error}
              onChange={(event) => this.setState({ lname: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Suffix'
              error={suffix.error}
              onChange={(event) => this.setState({ suffix: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Phone Number'
              error={phone.error}
              onChange={(event) => this.setState({ phone: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.nameContainer}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="campus-label">Campus</InputLabel>
              <Select
                labelId="campus-label"
                id="campus"             
                error={campus.error}
                onChange={(event) => this.setState({ campus: { value: event.target.value, error: null } })}
                label="Campus"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {writer}
              </Select>
            </FormControl>
          </div>
          <div style={styles.nameContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Office / Department'
              error={location.error}
              onChange={(event) => this.setState({ location: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.emailContainer}>
            <TextField
              fullWidth
              variant='outlined'
              label='Email'
              error={email.error}
              onChange={(event) => this.setState({ email: { value: event.target.value, error: null } })}
            />
          </div>
          <div style={styles.passwordContainer}>
            <TextField
              fullWidth
              style={{ marginRight: 16 }}
              variant='outlined'
              label='Password'
              type={password.show ? 'string' : 'password'}
              onChange={(event) => this.setState({ password: { ...password, value: event.target.value, error: null } })}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='Confirm'
              type={password.show ? 'string' : 'password'}
              onChange={(event) => this.setState({ password: { ...password, confirm: event.target.value, error: null } })}
            />
            <IconButton
              style={{ padding: 6, margin: '0px 6px' }}
              onClick={() => this.setState({ password: { ...password, show: !password.show } })}
            >
              {
                password.show ?
                  <RemoveRedEye />
                  : <RemoveRedEyeOutlined />
              }
            </IconButton>
          </div>
          <div style={styles.buttonOuterContainer}>
            <div style={styles.buttonInnerContainer}>
              <Button
                color='primary'
                onClick={() => this.props.history.push(PATHS.login)}
              >
                Sign in instead
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => this.register()}
              >
                Next
              </Button>
            </div>
          </div>
        </Box>
      </div>
    )
  }

  async register() {
    const { email, password, fname, mname, campus, location, lname, suffix, phone } = this.state

    try {
      const authUser = await this.props.firebase.createUserWithEmailAndPassword(email.value, password.value)
      await authUser.user.updateProfile({
        displayName: `${fname.value} ${lname.value}`
      })
      const userDoc = await this.props.firebase.user(authUser.user.uid)
      userDoc.set({
        email: email.value,
        fname: fname.value,
        mname: mname.value,
        lname: lname.value,
        suffix: suffix.value,
        phone: phone.value,
        campus: campus.value,
        location: location.value,
        role: "user"
      })
      this.props.setUser(authUser)
      this.props.history.push(PATHS.survey) //need proper success screen
    } catch (error) {
      this.setState({
        error: error
      })
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setUser(user) {
      dispatch(authAction.setUser(user))
    }
  })
}

export default connect(null, mapDispatchToProps)(
  compose(
    withFirebase,
    withRouter
  )(Register)
)
