import React from 'react'
import { PropTypes } from 'prop-types';
import RepoItem from './RepoItem';


const Repos = ({repos}) => {
    if(repos) {
        return repos.map(repo=> <RepoItem key = {repo.id} repo = {repo}/>)
    }  else {
        return (
            <div>
                No Reposorities Found
            </div>
             ) 
    }
       
       
   
   
}

Repos.propTypes = {
    repos:PropTypes.array.isRequired,
}

export default Repos;
