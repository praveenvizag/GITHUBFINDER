import React, { useReducer } from "react";
import GitHubContext from "./gitHubContext";
import GitHubReducer from "./githubReducer";
import axios from "axios";
import {
  SEARCH_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USERS,
  CLEAR_USERS
} from "./../types";
const GitHubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(GitHubReducer, initialState);
  let githubClientId;
  let githubClientSecret;
  if(process.env.NODE_ENV!== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }
  
  //Search Git Hub Users
  const searchUsers = async text => {
    setLoading();
    console.log(" pay", text);
    console.log("url", `https://api.github.com/search/users?q=${text}`);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}
    &client_secret=${githubClientSecret}`);

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };
  //Get Users
  const getUser = async username => {
    setLoading();
    console.log(
      "url",
      `https://api.github.com/users/${username}&client_id=${githubClientId}
    &client_secret=${githubClientSecret}`
    );
    const res = await axios.get(`https://api.github.com/users/${username}`);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  };

  //Get Repos

  const getUserRepos = async userName => {
    console.log("repos ",`https://api.github.com/users/${userName}/repos`);
    setLoading();
    const resp = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
     &client_secret=${githubClientSecret}`);
     console.log(" repos in state", resp.data);
     dispatch({
         type:GET_REPOS,
         payload:resp.data
     })
  };
  //Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        getUser,
        searchUsers,
        clearUsers,
        getUserRepos
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GitHubState;
