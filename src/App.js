import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/layouts/navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setTimeout } from "timers";
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    loading: false,
    user:{},
    repos :[],
    alert: null
    
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }

  //Search Git Hub Users
  searchUsers = async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  };
  //getSingl git hub user
  getUser = async (username) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({user:res.data,loading:false});

  }

  //getUserRepos

  getUserRepos = async (userName) => {
     console.log(`https://api.github.com/users/${userName}/repos`);
     const resp = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: resp.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  //set Alerts
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, alert,user,repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            {alert &&  <Alert alert={alert} /> }
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path = "/about" component = {About}/>
              <Route exact path = "/user/:login" render = {props=>(
                <User {...props} user = {user} getUser = {this.getUser} loading = {loading} getUserRepos = {this.getUserRepos} repos = {repos}></User>
              )}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
