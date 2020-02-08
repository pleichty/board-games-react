import React, { Component } from 'react'
import axios from 'axios'
import { BGG_API_BASE_URL } from '../constants/api'
import Suggestions from './Suggestions'
import { parseString } from 'xml2js'

class Search extends Component {
 state = {
   query: '',
   results: []
 }

 getInfo = () => {
  axios.get(`${BGG_API_BASE_URL}/search?query=${this.state.query}`)
    .then(res => {
      let jsonPayload = {};

      parseString(res.data, {trim: true}, (err, result) => jsonPayload = result.items);
      // setBggPayload({
      //     ...jsonPayload,
      //     name: Object.values(jsonPayload.name[0])[0].value
      // })

      this.setState({
        results: jsonPayload.item
      })
      
    })
}

handleInputChange = () => {
  this.setState({
    query: this.search.value
  }, () => {
    if (this.state.query && this.state.query.length > 4) {
      if (this.state.query.length % 2 === 0) {
        this.getInfo()
      }
    } 
  })
}

render() {
  return (
    <form>
      <input
        placeholder="Search for..."
        ref={input => this.search = input}
        onChange={this.handleInputChange}
      />
      <Suggestions results={this.state.results} />
    </form>
  )
}
}

export default Search