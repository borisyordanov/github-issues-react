import React from 'react';
import PropTypes from 'prop-types';
import './RepoStats.css';

const RepoStats = props => {
    return (
        <div className="repo-stats">
            <h3 className="title">Repo Stats</h3>
            <p className="stat"><strong>Name:</strong> {props.name}</p>
            <p className="stat"><strong>Forks:</strong> {props.forks}</p>
            <p className="stat"><strong>Watchers:</strong> {props.watchers}</p>
            <p className="stat"><strong>Stars:</strong> {props.stars}</p>
            <p className="stat">
                <strong>Total Issues:</strong> {props.totalIssues}
            </p>
            <p className="stat"><strong>Open Issues:</strong> {props.openIssues}</p>
            <p className="stat">
                <strong>Closed Issues:</strong> {props.closedIssues}
            </p>
        </div>
    );
};

export default RepoStats;

RepoStats.propTypes = {
    name: PropTypes.string.isRequired,
    forks: PropTypes.number,
    watchers: PropTypes.number,
    stars: PropTypes.number,
    totalIssues: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    openIssues: PropTypes.number,
    closedIssues: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
