import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withAuthorization } from '../../session'
import { withFirebase } from '../../firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Icon } from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { Main } from '..'
import airport from 'airport-codes'
import { AddSurvey, UpdateSurvey } from '.'
import moment from 'moment'

class Survey extends Component {

  actions = [
    {
      icon: <Icon path={mdiPlus} size={1} />,
      onClick: () => this.setState({ openFlight: true })
    }
  ]

  state = {
    loading: false,
    surveysRef: null,
    survey: null,
    activeId: null,
    openFlight: false,
    exibitFlight: false,
  }

  componentDidMount() {
    this.setState({ loading: true })
    const surveysRefs = this.props.firebase.survey()
    surveysRefs.onSnapshot(surveysRef => {
      console.log('surveysRef:', surveysRef.docs);
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
  onSearch = (country) => {
    const iatas = this.renderAirports(country)
    const survey = this.state.surveysRef.filter(survey => {
      if (iatas.find(aita => aita === survey.data().origin) ||
        iatas.find(aita => aita === survey.data().destination)) {
        return survey;
      }
      return null
    })
    this.setState({ survey })
  }
  renderAirports(country) {
    if (country) {
      const airportModelsCountry = airport.filter((model) => model.get('country') === country)
      const airports = airportModelsCountry.map((city) => city.iata !== "" && city.get('iata'))
      return airports;
    }
    return null;
  }
  // Callback function
  handleLike = (pk, survey, userId) => {
    if (survey.likes.find(like => like === userId)) {
      alert('Already Voted!')
    } else {
      survey.likes.push(userId);
      this.props.firebase.addLikeOnSurvey(pk, survey.current, survey.likes)
    }
  }
  handleUpdate = (activeId, survey) => {
    this.setState({ activeId, survey, exibitFlight: true })
  }
  handleDelete = (pk) => {
    this.props.firebase.removeSurvey(pk)
  }

  render() {
    const { survey, openFlight, exibitFlight, activeId } = this.state
    return (
      <Main actions={this.actions}>
        <table>
          <thead>
            <tr><th>#</th></tr>
          </thead>
          <tbody>
            {this.renderSurveyCards(survey)}
          </tbody>
        </table>

        <AddSurvey open={openFlight} onClose={() => this.setState({ openFlight: false })} />
        <UpdateSurvey
          open={exibitFlight}
          onClose={() => this.setState({ exibitFlight: false })}
          pk={activeId}
          survey={survey}
        />
      </Main>
    )
  }

  renderSurveyCards(survey) {
    if (survey) {
      return survey.sort((a, b) => a.data().current < b.data().current ? 1 : -1) // highest number of votes to lowest 
        .map((survey) => {
          const { date, destination } = survey.data();
          return <tr>
            <td> {moment(date).format("LL")}</td>
            <td>{destination}</td>

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