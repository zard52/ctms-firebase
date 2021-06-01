import React, { Component } from 'react'
import { Button } from '../common'
import { withRouter } from 'react-router-dom'
import { home_image } from '../../assets'
import { PATHS } from '../../constants'

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: '100%',
    marginTop: 80,
    backgroundImage: `url(${home_image}), linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.7))`,
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  titleContainer: {
    width: 500,
    marginBottom: 50,
    color: '#FFFFFF'
  },
  title: {
    fontFamily: 'Oswald',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 500,
    color : '#DC9202'
  
  },
  subtitle: {
    textAlign: 'center'
  },
  subtitlemain: {
    fontFamily: 'Oswald',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 500
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 80,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

class Home extends Component {
  render() {
    return (
      
      <div>
        <div style={styles.body}>
          <div style={styles.header}>
            <Button
              variant="outlined"
              style={{ margin: 25 }}
              onClick={() => this.props.history.push(PATHS.login)}
            >
              Sign In
            </Button>
          </div>
          <div style={styles.main}>
            <div style={styles.titleContainer}>
              <div style={styles.title}>
               NUEVA ECIJA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </div> 
              <div style={styles.subtitlemain}>
               Contact Traicing 
              </div>
              <div style={styles.subtitle}>
                Monitor on demand. Anytime. Anywhere.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: 25 }}>
              <footer> <small> Copyright MIS Devteam</small> </footer> 
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    )
  }
}

export default withRouter(Home)