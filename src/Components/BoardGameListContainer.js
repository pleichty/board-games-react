import React, { Component } from 'react'
import BoardGame from './BoardGame'
import SearchBox from './SearchBox';
  
export class BoardGameListContainer extends Component {
    render() {
        return (
            <>
            <SearchBox />
            <div>
                <BoardGame id='56961'/>
                <BoardGame id='264505'/>
                <BoardGame id='134671'/>
                <BoardGame id='134652'/>
                <BoardGame id='134671'/>
            </div>
            </>
        )
    }
}

export default BoardGameListContainer
