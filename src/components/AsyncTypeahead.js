import React, { Fragment } from "react";

import { AsyncTypeahead as BootStrapTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import fetch from 'isomorphic-fetch';

const SEARCH_URI = 'https://api.github.com/search/users';

export default class AsyncTypeahead extends React.Component {
    state = {
        allowNew: false,
        isLoading: false,
        multiple: true,
        options: [],
    };

    _handleChange = (e) => {
        this.setState({ selectedItem: this.state.multiple ? e : e[0] });
        // handler to provide the value;
        if (this.props.onChange) {
            this.props.onChange((this.state.multiple ? e : e[0]))
        }
    }

    _handleSearch = (query) => {
        this.setState({ isLoading: true });
        this.makeAndHandleRequest(query)
            .then(({ options }) => {
                this.setState({
                    isLoading: false,
                    options,
                });
            });
    }

    makeAndHandleRequest = (query, page = 1) => {
        return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
            .then((resp) => resp.json())
            .then(({ items, total_count }) => { /* eslint-disable-line camelcase */
                const options = items.map((i) => ({
                    avatar_url: i.avatar_url,
                    id: i.id,
                    login: i.login,
                    score: i.score
                }));
                return { options, total_count };
            });
    }

    render() {
        return (
            <Fragment>
                <BootStrapTypeahead
                    {...this.state}
                    labelKey="login"
                    selected={this.props.selected}
                    minLength={3}
                    onSearch={this._handleSearch}
                    placeholder={"Search " + (this.props.placeHolderLabel ? "for a" + this.props.placeHolderLabel : "")}
                    onChange={this._handleChange}
                    renderMenuItemChildren={(option, props) => (
                        <MenuItem key={option.id} user={option} />
                    )}
                />
            </Fragment>
        );
    }




}

const MenuItem = ({ user }) => (
    <div>
        <img
            alt={user.login}
            src={user.avatar_url}
            style={{
                height: '24px',
                marginRight: '10px',
                width: '24px',
            }}
        />
        <span>{user.login}</span>
    </div>
);










