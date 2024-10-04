// src/App.jsx
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';

const App = () => {
    const [data, setData] = useState([]); // Current data for chart
    const [symbol, setSymbol] = useState('ethusdt'); // Default symbol
    const [interval, setInterval] = useState('1m'); // Default interval
    const [historicalData, setHistoricalData] = useState({
        ethusdt: JSON.parse(localStorage.getItem('ethusdt')) || [],
        bnbusdt: JSON.parse(localStorage.getItem('bnbusdt')) || [],
        dotusdt: JSON.parse(localStorage.getItem('dotusdt')) || []
    });

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const candlestick = message.k; // Assuming this is the structure

            if (candlestick && candlestick.x) { // Only push data if the candle is closed
                const newData = [
                    ...historicalData[symbol],
                    [candlestick.t, candlestick.c] // Assuming t is time and c is close price
                ];

                setHistoricalData((prev) => ({
                    ...prev,
                    [symbol]: newData.length > 100 ? newData.slice(newData.length - 100) : newData
                }));

                // Update local storage
                localStorage.setItem(symbol, JSON.stringify(newData));
                setData(newData); // Update the current data to reflect changes
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close(); // Clean up on unmount
        };
    }, [symbol, interval]); // Removed historicalData from dependency array

    const handleSymbolChange = (e) => {
        const selectedSymbol = e.target.value;
        setSymbol(selectedSymbol);
        setData(historicalData[selectedSymbol]); // Restore historical data for selected symbol
    };

    const handleIntervalChange = (e) => {
        const selectedInterval = e.target.value;
        setInterval(selectedInterval);
        setData(historicalData[symbol]); // Restore historical data for currently selected symbol
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-extrabold text-white mb-8 shadow-lg">Cryptocurrency Live Chart</h1>
            <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-lg shadow-xl p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <label className="mr-3 text-gray-700 font-semibold" htmlFor="coinSelect">Select Coin:</label>
                        <select
                            id="coinSelect"
                            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleSymbolChange}
                        >
                            <option value="ethusdt">ETH/USDT</option>
                            <option value="bnbusdt">BNB/USDT</option>
                            <option value="dotusdt">DOT/USDT</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-3 text-gray-700 font-semibold" htmlFor="intervalSelect">Select Interval:</label>
                        <select
                            id="intervalSelect"
                            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleIntervalChange}
                        >
                            <option value="1m">1 Minute</option>
                            <option value="3m">3 Minutes</option>
                            <option value="5m">5 Minutes</option>
                        </select>
                    </div>
                </div>
                {/* Conditional rendering of the Chart */}
                {data.length > 0 ? (
                    <Chart data={data} />
                ) : (
                    <p className="text-center text-gray-700">Loading data... Please wait.</p>
                )}
            </div>
            {/* Footer */}
            <footer className="mt-8 text-white">
                <p>Project By - { }<a href="" className="underline">Amey Bhagwatkar</a></p>
            </footer>
        </div>
    );
};

export default App;

