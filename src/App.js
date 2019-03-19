import React, { Component } from 'react';
import tabs from './tabs.json'
import Navbar from './navbar'
import './styles/main.css';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home'
import Concepts from './views/Concepts'
import Stories from './views/Stories'
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (

            <div>
                <div key="header" className="app-header">
                    <div className="app-header-label">App Logo</div>
                    <span style={{ float: "right", marginRight: "10px", color: "white", marginTop: "10px" }}>Welcome firstName, lastName</span>
                </div>
                <Navbar key={2} tabs={tabs} />
                <Switch key="securerouteswitch">
                    <Route key="home" exact path='/' render={() => { return (<Home />) }} />
                    <Route key="concepts" exact path='/concepts' render={() => { return (<Concepts />) }} />
                    <Route key="stories" exact path='/stories' render={() => { return (<Stories />) }} />
                </Switch>
            </div>
        )

    }

}

export default App;