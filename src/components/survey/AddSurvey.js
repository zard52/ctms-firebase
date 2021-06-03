import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from '../../firebase'
import {
  createMuiTheme,
  Dialog,
  Box,
  Divider,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  FormHelperText,
  Input, Checkbox,
  DialogTitle,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/styles';
import { OutlinedSelect } from '../common'
import MomentUtils from "@date-io/moment"
import moment from 'moment'
import { COLORS } from '../../constants'
import surveys from '../../survey.json'

const customPostTheme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary
    },
    secondary: {
      main: COLORS.green
    },
  },
})

const styles = {
  container: {
    height: '100%',
    width: 550,
    backgroundColor: '#dddddd',
    padding: 20,
  },
  collapsedContainer: {
    height: 470,
    width: 700,
    padding: 20,
  },
  selectCountry: {
    width: '100%',
    transition: 'width .35s ease-in-out'
  },
  selectAirport: {
    width: 240,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}

const initialState = {
  loading: false,
  success: false,
  date: new Date(),
  surveys: surveys,
  questions: surveys.length,
  ActiveIndex: 0,
  hasDone: false,
  agree: false,
  answer: [],
  error: 0,
  level: 0
}

class AddSurvey extends Component {
  state = initialState

  renderYesNo(model) {
    const { question, id, required = undefined } = model;
    console.log('question :', question);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
        <FormControl component="fieldset" className="MuiFormControl-fullWidth">
          <FormLabel htmlFor={id}>{required ? "* " : ""}{question}</FormLabel>
          <RadioGroup row aria-label={question} name={id} value={model.answers} onChange={(e, t) => { model.answers = t }}>
            <FormControlLabel name="answer" value="0" control={<Radio />} label="No" />
            <FormControlLabel name="answer" value="1" control={<Radio />} label="Yes" />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }

  renderShortanswers(model) {
    const { question, id, followup, required = undefined } = model;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
        <FormControl size="medium" className="MuiFormControl-fullWidth">
          <InputLabel htmlFor={id}>{question} {followup}</InputLabel>
          <Input id={id} name="answer" aria-describedby="my-helper-text" onChange={(e) => { model.answers = e.target.value }} />
        </FormControl>
      </div>
    )
  }
  renderDate(model, selected = 1) {
    const { question, id, required = undefined } = model;
    let label = question;
    if (required) {
      label = "* " + question;
    }
    let style = { display: 'flex', justifyContent: 'space-between', margin: '20px 0px' };
    if (selected === 0) {
      style = { display: 'none', justifyContent: 'space-between', margin: '20px 0px' };
    }
    return (
      <div style={style}>
        <FormControl size="medium" className="MuiFormControl-fullWidth">
          <TextField
            id={id}
            label={label}
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </div>
    )
  }
  renderCheckboxes(model, hint = "") {
    const { question, id, options, required = undefined } = model;
    let writer = options.map((option, i) => {
      return (<FormControlLabel name="antoine" 
        control={<Checkbox  color="default"  name="answer" onChange={(e) => {
            e.target.checked ?
              model.answers.push(option) :
              model.answers.splice(model.answers.indexOf(option), 1)
          }} 
        />}
        label={option}
      />)
    });
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
        <FormControl component="fieldset" className="">
          <FormLabel component="legend">{required ? "* " : ""}{question}</FormLabel>
          <FormGroup>
            {writer}
          </FormGroup>
          <FormHelperText>{hint}</FormHelperText>
        </FormControl>
      </div>
    )
  }

  validateSurvey() {
    let {model, error, level }= this.state.surveys;
    model.map((survey, i) => {
      if (survey.required === 1 && (survey.answers === undefined || survey.answers.length === 0)) {
        error++
      }
      if (survey.type === "temperature" && survey.answers >= 38) {
        level++
      }
      else if (survey.type === "true or false" && survey.answers === "1") {
        level++
      }
    });

    console.log("model-", model)
    console.log("ERROR-", error)
    console.log("LEVEL-", level)
  }

  async postSurvey() {
    if (!this.state.success) {
      // this.validateSurvey()
      if(this.state.error === 0){
        this.setState({ loading: true })
        const flightsRef = this.props.firebase.survey()
        const flightRef = await flightsRef.doc()
        const userRef = await this.props.firebase.user(this.props.userId)
        await flightRef.set({
          surveys: this.state.surveys,
          date: moment(new Date()).startOf('day').toDate().toString(),
          poster: userRef,
        })
        this.props.onClose()
        this.setState({ loading: false, success: true })
      }
      else
        alert(this.state.error - "Field(s) need to update")
    }
  }

  render() {
    const { open } = this.props
    const { surveys, ActiveIndex, hasDone } = this.state

    return (
      <Dialog
        open={open}
        onClose={this.handleClose.bind(this)}
        maxWidth={false}
        
      >
        <Box
          style={styles.container}
        >
          <DialogTitle style={{textAlign: 'center', backgroundColor: '#152238', borderRadius : '10px', color: 'white'}}>NEUST Health Survey Form</DialogTitle>
          {hasDone ? this.confirmSubmit() :
            <>
              {this.ActiveQuestion(surveys, ActiveIndex)}
              {ActiveIndex > 0 &&
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.handlesBack(ActiveIndex)}
                >Back</Button>
              }

              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handlesNext(ActiveIndex)}
              >Next</Button>
            </>
          }
          
        </Box>
      </Dialog>
    )
  }
  handlesBack(ActiveIndex) {
    this.setState({ ActiveIndex: --ActiveIndex })
  }
  handlesNext(ActiveIndex) {
    const { questions } = this.state;
    if (++ActiveIndex < questions) {
      this.setState({ ActiveIndex })
    } else {
      this.setState({ hasDone: true })
    }
  }
  ActiveQuestion(surveys, ActiveIndex) {
    const question = surveys[ActiveIndex];
    if (question.type === "checkboxes")
      return this.renderCheckboxes(question);
    else if (question.type === "follow-up question")
      return this.renderShortanswers(question);
    else if (question.type === "short answers")
      return this.renderShortanswers(question);
    else if (question.type === "true or false")
      return this.renderYesNo(question);
    else if (question.type === "date")
      return this.renderDate(question);
    else return this.renderShortanswers(question);
  }
  confirmSubmit() {
    const { success, loading } = this.state
    return <>
      <div style={{ display: 'flex' }}>
        <Checkbox
          style={{ margin: "10px 0px" }}
          format='LL'
          value='false'
          onChange={(e) => { this.setState({ agree: e.target.checked }); }}
        />
        <div style={{ marginRight: 10, transform: 'translate(0px, 10px)' }}>
          I certify that the above facts are true to the best of my knowledge and belief
          and I understand that I subject myself to disciplinary action in the event that
          the above facts are found to be falsified.
              </div>
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', margin: '20px 0px' }}>
        <ThemeProvider theme={customPostTheme}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.onClose()}
          >Cancel</Button>
          <Button
            variant={success ? "outlined" : "contained"}
            color={success ? "secondary" : "primary"}
            disabled={loading}
            onClick={() => this.postSurvey()}
            // onClick={() => this.validateSurvey(this.state.surveys)}
          >
            {success ? 'Submitted' : 'Submit'}
            {loading && <CircularProgress size={24} style={styles.buttonProgress} />}
          </Button>
        </ThemeProvider>
      </div>
    </>
  }
  handleClose() {
    this.setState({ ...initialState })
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.user.uid
})

export default connect(
  mapStateToProps
)(withFirebase(AddSurvey))