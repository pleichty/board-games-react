import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { BGG_API_BASE_URL } from '../constants/api'
import { parseString } from 'xml2js'
import { htmlDecode } from '../helpers/formatting'

export default function BoardGame(props) {
    const [bggPayload, setBggPayload] = useState({
        name: [],
        thumbnail: '',
        description: ''
    });

    useEffect(() => {
        Axios.get(`${BGG_API_BASE_URL}/thing?id=${props.id}`)
        .then(res => {
            let jsonPayload = {};
            parseString(res.data, {trim: true}, (err, result) => jsonPayload = result.items.item[0]);
            setBggPayload({
                ...jsonPayload,
                name: Object.values(jsonPayload.name[0])[0].value
            })
        })
    });

        return (
            <div>
                <span>{bggPayload.name}</span>
                <img src={bggPayload.thumbnail} alt='cannot load'/>
                <p>{htmlDecode(bggPayload.description)}</p>
            </div>
        )
}

