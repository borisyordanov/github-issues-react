import React from 'react';
import Selector from '../../components/Selector/Selector';
import PropTypes from 'prop-types';
import './RepoSelector.css';

const RepoSelector = props => {
    return (
        <div className="repo-selector">
            <h3 className="title">Choose Repo</h3>
            <Selector
                changeHandler={props.changeHandler}
                options={props.repos}
            />
        </div>
    );
};

export default RepoSelector;

RepoSelector.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};
