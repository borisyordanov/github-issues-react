import React from 'react';
import PropTypes from 'prop-types';
import './Selector.css';

const Selector = props => {
    return (
        <select onChange={props.changeHandler} className="selector">
            {props.options.map((option, index) =>
                <option value={option.fullName || option.value} key={index}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Selector;

Selector.propTypes = {
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    value: PropTypes.string
};
