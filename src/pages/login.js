import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, BrowserRouter} from 'react-router-dom';
import $ from 'jquery';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._getUserInfo();
    }

    handleChange(e) {
        e.preventDefault();
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        };

        this._login(data);
    }

    _login(data) {
        $.ajax({
            url: "/login",
            type: "POST",
            dataType: "json",
            data: data,
            success: res => {
                if (res === null) {
                    console.log("用户名或密码错误");
                } else {
                    this.props.history.push('/index');
                }
            },
            error: err => {
                alert(err.responseText);
            }
        });
    }

    _getUserInfo() {
        const that = this;
        $.ajax({
            url: '/getUserInfo',
            type: 'GET',
            dataType: 'json',
            success: data => {
                if (data.isLogin === 1) {
                    this.props.history.push('/index');
                }
            },
            error: err => {
                console.log(err);
            }

        });
    }

    render() {
        return (
            <div>
                <div className="login-left">
                    <img src="/images/main_page_logo.png"/>
                </div>
                <div className="login-container">
                    <h1>查看这个世界正在发生的事</h1>
                    <Link to="/register">还没有注册？立即加入>></Link>
                    <form ref="loginForm" onSubmit={this.handleSubmit}
                          className="login-form-container">
                        <label>账号:</label>
                        <input type="text" name="username" ref="username"
                               onChange={this.handleChange}/><br/>
                        <label>密码:</label>
                        <input type="password" name="password" ref="password"
                               onChange={this.handleChange}/><br/>
                        <input type="submit" value="登录" className="submit-login"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;