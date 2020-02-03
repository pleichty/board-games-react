import React, { Component } from 'react'
import Axios from 'axios'
import { BGG_API_BASE_URL } from '../constants/api'
import { parseString } from 'xml2js'

export class BoardGame extends Component {
    state = {
        thumbnail: '',
        image: '',
        name: [],
        description: ''
    }
    htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }
      
    componentDidMount() {
        Axios.get(`${BGG_API_BASE_URL}/thing?id=${this.props.id}`)
        .then(res => {
            let jsonPayload = {};
            parseString(res.data, {trim: true}, (err, result) => jsonPayload = result.items.item[0]);
            this.setState({
                ...this.state,
                ...jsonPayload,
                name: Object.values(jsonPayload.name[0])[0].value
            })
        })
    }



    render() {
        return (
            <div>
                <span>{this.state.name}</span>
                <img src={this.state.thumbnail} alt='cannot load'/>
                <p>{this.htmlDecode(this.state.description)}</p>
            </div>
        )
    }
}

export default BoardGame
