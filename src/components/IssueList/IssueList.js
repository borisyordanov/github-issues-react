import React from 'react';
import PropTypes from 'prop-types';
import Issue from '../../components/Issue/Issue';
import './IssueList.css';

const IssueList = props => {
	return (
		<div className="issue-list">
			{props.issues.map(issue => <Issue key={issue.key} {...issue} />)}
		</div>
	);
};

export default IssueList;

IssueList.propTypes = {
	issues: PropTypes.array.isRequired
};
