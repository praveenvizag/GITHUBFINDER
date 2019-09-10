import React,{useContext} from "react";
import UserItem from "./UserItem";
import { PropTypes } from "prop-types";
import Spinner from "./../layouts/Spinner";
import GitHubContext from './../../context/github/gitHubContext';
const Users = () => {
  const gitHubContext =  useContext(GitHubContext);
  const { loading,users} = gitHubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} users={user} />
        ))}
      </div>
    );
  }
};
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
};

Users.prototype = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
export default Users;