import React from 'react';
import Selector from '../../components/Selector/Selector';
import PropTypes from 'prop-types';
import './IssueFilters.css';

const IssueFilters = props => {
    return (
        <div className="issue-filters">
            <h3 className="title">Repo Issues:</h3>
            {props.filters.map(filter =>
                <Selector
                    changeHandler={props.changeHandler}
                    options={filter}
                    key={filter}
                />
            )}
        </div>
    );
};

export default IssueFilters;

IssueFilters.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired
};
