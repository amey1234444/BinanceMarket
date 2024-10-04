// src/components/CoinSelector.js
import React from 'react';
import PropTypes from 'prop-types';

const CoinSelector = ({ selectedCoin, setSelectedCoin }) => {
    const coins = [
        { symbol: 'ethusdt', name: 'ETH/USDT' },
        { symbol: 'bnbusdt', name: 'BNB/USDT' },
        { symbol: 'dotusdt', name: 'DOT/USDT' },
    ];

    return (
        <select 
            className="border border-gray-300 rounded-lg p-2"
            onChange={(e) => setSelectedCoin(e.target.value)} 
            value={selectedCoin}
        >
            {coins.map(coin => (
                <option key={coin.symbol} value={coin.symbol}>{coin.name}</option>
            ))}
        </select>
    );
};

CoinSelector.propTypes = {
    selectedCoin: PropTypes.string.isRequired,
    setSelectedCoin: PropTypes.func.isRequired,
};

export default CoinSelector;

