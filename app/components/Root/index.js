import React, { Component } from 'react'
import Menu from '../Menu'
import Footer from '../Footer'

import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {Helmet} from "react-helmet";
import styles from './Root.css'

import MomentUtils from 'material-ui-pickers/utils/moment-utils';

export const LeagueContext = React.createContext()

const drawerWidth = 240;

// const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class Root extends Component {
  constructor () {
    super()
    this.state = {
      isLoggedIn: false,
      nickname: '',
      loginError: {},
      loading: true,
      loginLoading: false,
      registerLoading: false
    }
  }

  componentDidMount () {
    const host = document.location.hostname
    const leagueShort = host.split('.')[0].toUpperCase()
    const seasonPeriod = document.location.pathname.split('/')[1]
    //this.initialise(leagueShort, seasonPeriod)
    this.checkLogin()
  }

  

  checkLogin = () => {
    console.log('check login...')
    const token = localStorage.getItem('jwtToken')
    const nickname = localStorage.getItem('nickname')
    console.log(token, nickname)
    if (token && nickname) {
      this.doLogIn(nickname)
    }
  }

  doLogIn = (nickname) => {
    console.log('do log in')
    this.setState({
      nickname: nickname,
      isLoggedIn: true,
      loginLoading: false
    })
  }

  doLogOut = () => {
    localStorage.removeItem('jwtToken');    
    this.setState({
      isLoggedIn: false,
      loginError: {}
    })
  }

  doRegister = (email) => {
    console.log('do register')
    this.setState({
      email: email,
      registerLoading: false
    })
  }

  render () {
    const context = {
      league: this.state.league,
      season: this.state.season,
      seasons: this.state.seasons,
      startLoad: () => {
        console.log('-- start load --')
        this.setState({
          loading: true
        })
      },
      stopLoad: () => {
        console.log('-- stop load --')
        this.setState({
          loading: false
        })
      },
      login: (email, password) => {
        this.setState({
          loginLoading: true
        })
        axios.post('/api/auth/login', { email, password })
          .then((result) => {
            const nickname = result.data.nickname
            localStorage.setItem('jwtToken', result.data.token);
            localStorage.setItem('nickname', nickname);
            axios.defaults.headers.common['Authorization'] = result.data.token;
            this.doLogIn(nickname)
          })
          .catch((error) => {
            console.log('error = ', error.response)
            if(error.response.status === 401) {
              this.setState({
                loginError: error.response.data,
                loginLoading: false
              })
            }

          });
      },
      register: (nickname, email, password) => {
        this.setState({
          registerLoading: true
        })
        axios.post('/api/auth/register', { nickname, email, password })
          .then((result) => {
            this.doRegister(email)
          })
          .catch((error) => {
            console.log('error = ', error.response)
            if(error.response.status === 401) {
              this.setState({
                registerError: error.response.data,
                registerLoading: false
              })
            }

          });
      },
      isLoggedIn: this.state.isLoggedIn,
      nickname: this.state.nickname,
      loginError: this.state.loginError,
      loading: this.state.loading,
      loginLoading: this.state.loginLoading,
      registerError: this.state.registerError,
      registerLoading: this.state.registerLoading,
      user: {}
    }

    return (
      
        <LeagueContext.Provider value={context}>
          {
            this.state.league && 
            <Helmet>
              <title>Maidenhead Station</title>
            </Helmet>
          }
          <div className={styles.outer}>
            <div className={styles.inner}>
              
              <Menu loading={this.state.loading} isLoggedIn={this.state.isLoggedIn} doLogOut={this.doLogOut} nickname={this.state.nickname} league={this.state.league} season={this.state.season} seasons={this.state.seasons} />
              
              <div className={styles.content}>
                {this.props.children}
              </div>

              <Footer league={this.state.league} />
            </div>
          </div>
        </LeagueContext.Provider>

    )
  }
}

export default Root

