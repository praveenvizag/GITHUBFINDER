import React, { useState, useContext } from "react";
import GitHubContext from "../../context/github/gitHubContext";
import AlertContext from "./../../context/alert/alertContext";

const Search = () => {
  const [text, setText] = useState("");
  const githubContext = useContext(GitHubContext);
  const alertContext = useContext(AlertContext);
  const onChange = e => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const onSubmit = e => {
    console.log("submitted");
    e.preventDefault();
    if (text === "") {
      alertContext.showAlert("Please enter Something", "light");
    } else {
      githubContext.searchUsers(text);
      alertContext.showAlert(null, null);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users...."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
