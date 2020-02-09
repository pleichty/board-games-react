import React, { Component, useState} from 'react'
import axios from 'axios'
import { BGG_API_BASE_URL } from '../constants/api'
import Suggestions from './Suggestions'
import { parseString } from 'xml2js'

export default function Search(props) {
 const [query, setQuery] = useState('');
 const [results, setResults] = useState([]);
 
 const getInfo = () => {
  axios.get(`${BGG_API_BASE_URL}/search?query=${query}`)
    .then(res => {
      let jsonPayload = {};

      parseString(res.data, {trim: true}, (err, result) => jsonPayload = result.items);
      setResults(jsonPayload.item);  
    });
}

const handleInputChange = (event) => {
  setQuery(event.target.value);
    if (query && query.length > 3) {
        getInfo()
    } 
}

  return (
    <form>
      <input
        placeholder="Search for..."
        value={query}
        onChange={handleInputChange}
      />
      <Suggestions results={results} />
    </form>
  )
}