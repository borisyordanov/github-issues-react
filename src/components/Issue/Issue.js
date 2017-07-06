import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/dateFormat';
import './Issue.css';

const Issue = props => {
	return (
		<div className="issue">
			<p>Title: {props.title}</p>
			<p>State: {props.state}</p>
			<p>Update: {formatDate(props.updateDate)}</p>
			<p>Comments: {props.comments}</p>
		</div>
	);
};

export default Issue;

Issue.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string.isRequired,
	state: PropTypes.string,
	updateDate: PropTypes.string,
	comments: PropTypes.number
};
