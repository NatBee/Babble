import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                password: '',
                loggedIn: false
            }
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({user: {name: event.target.value}});
    }

    handlePasswordChange(event) {
        this.setState({
            user: {
                name: this.state.user.name,
                password: event.target.value
            }
        });
    }

    async login(event) {
        event.preventDefault();
        await this.setState( {
            user: {
                name: this.state.user.name,
                password: this.state.user.password,
                loggedIn: true
            }
        })
        await fetch('/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
        this.setState({
            user: this.state.user
        });
    }

    render() {
        return (
            <div className="Login">
                <header className="Login-header">
                    {!this.state.user.loggedIn ? (
                        <form onSubmit={this.login}>
                            <label>Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                            <label>Password</label>
                            <input
                                id="password"
                                type="text"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <button type="submit">Sign in</button>
                        </form>
                    ) : (
                        <div> Welcome {this.state.user.name} </div>
                    )}
                </header>
            </div>
        );
    }
}

export {Login};
