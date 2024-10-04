// src/components/TimeIntervalSelector.js
import React from 'react';
import PropTypes from 'prop-types';

const TimeIntervalSelector = ({ selectedInterval, setSelectedInterval }) => {
    const intervals = ['1m', '3m', '5m'];

    return (
        <select 
            className="border border-gray-300 rounded-lg p-2"
            onChange={(e) => setSelectedInterval(e.target.value)} 
            value={selectedInterval}
        >
            {intervals.map(interval => (
                <option key={interval} value={interval}>{interval}</option>
            ))}
        </select>
    );
};

TimeIntervalSelector.propTypes = {
    selectedInterval: PropTypes.string.isRequired,
    setSelectedInterval: PropTypes.func.isRequired,
};

export default TimeIntervalSelector;

