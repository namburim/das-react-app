import React, { Component } from 'react';
import AsyncTypeahead from '../components/AsyncTypeahead'
export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedGitUsers: []
        }
    }
    onGitUserSelect = (selectedList) => {
        console.log(selectedList)
        this.setState({ selectedGitUsers: selectedList })
    }

    render() {
        return (
            <div style={{ padding: "10px" }}>

                <div>
                    <label> Search Github user:
                        <span><AsyncTypeahead onChange={this.onGitUserSelect} selected={this.state.selectedGitUsers} /></span>
                    </label>
                </div>

                <div style={{ marginTop: "20px" }}><UserCards users={this.state.selectedGitUsers} /></div>
            </div>
        )

    }

}


const UserCards = (props) => {

    const { users } = props;

    var cards = [];
    users.map(user => {
        var card = <div className="git-user-card">
            <img src={user.avatar_url} width="40px" />
            <span style={{ float: "right", marginRight: "5px;", color: "#3d3d3d" }}>score: {user.score.toFixed(2)}</span>
        </div>
        cards.push(card)
    })

    return cards;
}