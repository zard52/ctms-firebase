import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withAuthorization } from '../../session'
import { withFirebase } from '../../firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Icon } from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { Main } from '..'
import { AddSurvey, UpdateSurvey } from '.'
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RateReviewIcon from '@material-ui/icons/RateReview';

import {
  Table,
  Button,
  Container,
  Span,
  

} from '@material-ui/core'


class Survey extends Component {

  actions = [
    {
      icon: <Icon path={mdiPlus} size={1} />,
      onClick: () => this.setState({ openSurvey: true })
    }
  ]

  state = {
    loading: false,
    surveysRef: null,
    survey: null,
    activeId: null,
    openSurvey: false,
    exibitFlight: false,
  }
  

  componentDidMount() {
    this.setState({ loading: true })
    const surveysRefs = this.props.firebase.survey()
    surveysRefs.onSnapshot(surveysRef => {
      this.setState({ surveysRef: surveysRef.docs, loading: false, survey: surveysRef.docs })
    })
    // Search
    document.getElementById('searchKey').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.onSearch(e.target.value);
        e.target.value = '';
      }
    })
  }
  onSearch = (employee) => {
    console.log(employee);
  }
  handleUpdate = (activeId, survey) => {
    this.setState({ activeId, survey, exibitFlight: true })
  }
  handleDelete = (pk) => {
    this.props.firebase.removeSurvey(pk)
  }

  render() {
    const { survey, openSurvey, exibitFlight, activeId } = this.state
    
    return (
      <Main actions={this.actions}>
        <Container className="Maincontainer"  style={{ backgroundColor: '#dddddd' }} maxWidth="large">
           <Container className="Body" style={{ margin : '20px' }} maxWidth="large">
             <span>
             <Tooltip title="Record">
              <IconButton aria-label="View ">
                <StorageIcon style = {{ color : 'black'}}/>
              </IconButton>
            </Tooltip>
                Record</span>
                          <Table >
                            <thead>
                              <tr style = {{ backgroundColor: '#152238', color: 'white'}} >
                                <th>#</th>
                                <th>Date</th>
                                <th>Employee</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody style ={{ textAlign: 'center'}}>
                              {this.renderSurveyCards(survey)}
                            </tbody>
                          </Table>
                      <AddSurvey
                        open={openSurvey}
                        onClose={() => this.setState({ openSurvey: false })} />
                      <UpdateSurvey
                        open={exibitFlight}
                        onClose={() => this.setState({ exibitFlight: false })}
                        pk={activeId}
                        survey={survey}
                      />
            </Container>   
        </Container>
      </Main>
    )
  }

  renderSurveyCards(survey) {
    if (survey) {
      return survey.map((survey, index) => {
        console.log(survey)
        const { date, employee, status } = survey.data();
        return <tr id={index} style={{ borderBottom: '2px outset #152238' }}>
          <td> {++index}</td>
          <td> {moment(date).format("LL")}</td>
          <td>{employee}</td>
          <td>{status}</td>
          <td>
           <Tooltip title="View">
              <IconButton aria-label="View ">
                <VisibilityIcon style = {{ color : 'black'}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Issue">
              <IconButton aria-label="Review ">
                <RateReviewIcon style = {{ color : 'black'}}/>
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      })
    }
  }

}

const condition = authUser => !!authUser;

export default connect()(
  compose(
    withRouter,
    withFirebase,
    withAuthorization(condition),
  )(Survey))