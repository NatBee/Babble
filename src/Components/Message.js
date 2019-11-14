import React, {Component} from 'react';
import './Message.css';
import socketIOClient from 'socket.io-client';

let socket;

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                message: '',
                timeStamp: '',
                fromUserId: ''
            },
            allMessages: [],
            users: [],
            endpoint: 'http://localhost:3001/'
        };
        socket = socketIOClient(this.state.endpoint)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        socket.on('message', (message) => {
            let user = this.state.users.filter(user => user.id === parseInt(message.fromUserId));
            message.fromUserId = user[0].name;
            this.setState({ allMessages: [...this.state.allMessages, message] })
        })
    }

    async componentDidMount() {
        await fetch('/users')
            .then((response) => response.json())
            .then((users) => this.setState( { users: users.users }))
            .catch((e) => console.log(e));

        await fetch('/message')
            .then((response) => response.json())
            .then((messages) => {
                messages.message.map(msg => {
                    let user = this.state.users.filter(user => user.id === parseInt(msg.fromUserId));
                    msg.fromUserId = user[0].name;
                    return msg;
                })
                this.setState({ allMessages: messages.message });
            })
            .catch((e) => console.log(e));
    }

    handleChange(event) {
        this.setState({
            message: {
                message: event.target.value,
                timeStamp: new Date().toLocaleString(),
                fromUserId: 1
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        socket.emit('message', this.state.message);
        this.setState({
            message: {
                message: '',
                timeStamp: '',
                fromUserId: ''
            }
        });
    }

    render() {
        return (
            <div className="Message">
                <header className="Message-header">
                    <ul className="Message-ul">
                        {
                            this.state.allMessages.map((msg) => {
                                return <li>
                                            <div>{msg.fromUserId}: {msg.message}</div>
                                        </li>;
                            })
                        }
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            id="message"
                            type="text"
                            value={this.state.message.message}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Send</button>
                    </form>
                </header>
            </div>
        );
    }
}

export {Message, socket};
