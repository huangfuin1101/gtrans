import React, { Component } from 'react'
import Root from '../../Root'

import { LeagueContext } from '../../Root'
import Typography from '@material-ui/core/Typography';

import DB from '../../../helpers/DB'

import styles from './Homepage.css'

class Page extends Component {

  constructor () {
    super()
    this.timer = {}

    this.state = {
      word: '',
      data: [],
      loading: false,
      languages: [
        'chinese',
        'french',
        'greek',
        'hindi',
        'italian',
        'japanese',
        'korean',
        'russian',
        'spanish',
        'thai'
      ]
    }
  }


  translate () {
    this.setState({
      loading: true
    })

    DB.get(`/api/translate/${escape(this.state.word)}`)
      .then(response => {
        this.setState({
          data: response,
          loading: false
        })
      })
  }

  componentDidMount() {
    
  }


  handleChange(event) {
    this.setState({word: event.target.value, data:[]})
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(this.translate.bind(this), 1000)
  }

  render () {
    return (
      <div className={styles.inner}>
        <input className={styles.input} onChange={this.handleChange.bind(this)} value={this.state.word} />

        <div className={styles.container}>
          
            {this.state.languages.map(function(lang,i) {
              return <div className={styles.trans} key={i}>
                <b>{lang}</b>
                <p>{this.state.loading ? 'loading...' : !!this.state.data.length && this.state.data[0][lang]}</p>
                <i>{!!this.state.data.length && this.state.data[1][lang]}</i>
              </div>
            }, this)}
          
        </div>
      </div>

    )
  }
}

class HomePage extends Component {
  render () {
    console.log('render homepage')
    return (
      <LeagueContext.Consumer>
        {props => <Page {...this.props} {...props} />}
      </LeagueContext.Consumer>
    )
  }
}

export default HomePage



