import React from 'react'

const Suggestions = (props) => {
    let options;
    
    if(props.results) {
        const boardGames = props.results.filter(item => Object.values(item)[0].type === 'boardgame');
        // console.log('board games',boardGames)
        options = boardGames.map(r => (
          <li key={Object.values(r)[0].id}>
            {Object.values(r.name[0])[0].value}
          </li>
        ))
    }
  return <ul>{options}</ul>
}

export default Suggestions