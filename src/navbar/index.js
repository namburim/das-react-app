import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './navbarStyle.css';
import { NavLink, withRouter } from 'react-router-dom';

export class NavBarItem extends Component {

    setSelected = (e) => {
        if (this.props.handleClick) {
            this.props.handleClick();
        }
    }


    render() {

        return (
            <li className="navBar-tab" onClick={this.setSelected}>
                <NavLink
                    to={{
                        pathname: this.props.url,
                        state: { isNavBarClick: true, tabGroup: this.props.tabGroup }
                    }}
                    // to={this.props.url}
                    className="navBar-tab-link"
                    activeClassName={this.props.isCurrent ? 'tabPrimary selectedTab' : 'tabPrimary'}
                    isActive={this.isActive}
                >{this.props.displayText}
                </NavLink>
            </li>
        );
    }
}

NavBarItem.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    isCurrent: PropTypes.bool,
    handleClick: PropTypes.func
}


class Navbar extends Component {
    constructor(props) {
        super(props)
        props.history ? props.history.listen(this.navBarTabRouteChange) : null;
        this.state = {
            currentTab: null
        }
    }




    handleClick(tab) {
        if (this.props.changeTab) {
            this.props.changeTab(tab);
        }
        this.setState({ currentTab: tab })
    }

    render() {
        if (!this.props.tabs || this.props.tabs.length <= 0) {
            return null;
        }
        this.props.tabs.sort(function (a, b) {
            return a.id - b.id
        })
        let results = this.props.tabs.map(function (tab, index) {
            return (
                <NavBarItem
                    handleClick={this.handleClick.bind(this, tab)}
                    isCurrent={(this.state.currentTab && this.state.currentTab.id === tab.id)}
                    key={tab.id}
                    url={tab.url}
                    tabGroup={tab.group}
                    displayText={tab.displayText.toUpperCase()}
                />
            );
        }.bind(this));

        return (
            <div id="navBar">
                <ul className="navBar-nav">
                    {results}
                </ul>

            </div >
        );
    }
}

Navbar.propTypes = {
    tabs: PropTypes.array,
    currentTab: PropTypes.object,
    onChange: PropTypes.func
}

export default withRouter(Navbar);