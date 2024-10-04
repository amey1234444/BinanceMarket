// // src/components/Chart.js
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import PropTypes from 'prop-types';

// const Chart = ({ data }) => {
//     const chartData = {
//         labels: data.map(item => new Date(item[0]).toLocaleTimeString()),
//         datasets: [
//             {
//                 label: 'Candlestick Data',
//                 data: data.map(item => item[1]),
//                 borderColor: 'rgba(75,192,192,1)',
//                 borderWidth: 2,
//                 fill: false,
//             },
//         ],
//     };

//     return (
//         <div className="w-full">
//             <Line 
//                 data={chartData} 
//                 options={{
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             display: true,
//                         },
//                     },
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Time',
//                             },
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Price',
//                             },
//                         },
//                     },
//                 }} 
//             />
//         </div>
//     );
// };

// // Define PropTypes for the Chart component
// Chart.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.arrayOf(PropTypes.oneOfType([
//             PropTypes.number, // Timestamp or prices (open, high, low, close)
//             PropTypes.string, // In case you have any string values
//         ]))
//     ).isRequired,
// };

// export default Chart;


// // src/components/Chart.jsx
// import React from "react";
// import { Line } from "react-chartjs-2";
// import PropTypes from "prop-types";

// const Chart = ({ data }) => {
//     if (!data.length) {
//         return <div className="text-center">Loading...</div>; // or any other loading indicator
//     }

//     const chartData = {
//         labels: data.map(item => new Date(item[0]).toLocaleTimeString()),
//         datasets: [
//             {
//                 label: 'Candlestick Data',
//                 data: data.map(item => parseFloat(item[1])), // Ensure the close price is a float
//                 borderColor: 'rgba(75,192,192,1)',
//                 borderWidth: 2,
//                 fill: false,
//             },
//         ],
//     };

//     return (
//         <div className="w-full">
//             <Line
//                 data={chartData}
//                 options={{
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             display: true,
//                         },
//                     },
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Time',
//                             },
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Price',
//                             },
//                         },
//                     },
//                 }}
//             />
//         </div>
//     );
// };

// Chart.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.arrayOf(PropTypes.oneOfType([
//             PropTypes.number, 
//             PropTypes.string,
//         ]))
//     ).isRequired,
// };

// export default Chart;


// Chart.jsx
// import React, { useEffect } from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register the necessary components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

// const Chart = ({ data }) => {
//     const chartData = {
//         labels: data.map(item => new Date(item[0]).toLocaleString()), // Adjust the labels according to your data
//         datasets: [
//             {
//                 label: 'Price',
//                 data: data.map(item => item[1]), // Assuming the second item is the price
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 fill: true,
//             },
//         ],
//     };

//     return (
//         <div>
//             <Line data={chartData} />
//         </div>
//     );
// };

// export default Chart;


// // src/components/Chart.jsx
// import React from 'react';
// import { Chart, registerables, Filler, Line } from 'chart.js';

// Chart.register(...registerables); // Register all necessary components
// Chart.register(Filler); // Register Filler plugin

// const ChartComponent = ({ data }) => {
//   const chartData = {
//     labels: data.map(item => new Date(item[0]).toLocaleTimeString()), // Convert timestamp to readable format
//     datasets: [
//       {
//         label: 'Close Price',
//         data: data.map(item => item[1]), // Extract close prices
//         fill: true, // Enable filling
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: false,
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default ChartComponent;


// Chart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
    // Prepare data for the chart
    const chartData = {
        labels: data.map((point) => new Date(point[0]).toLocaleTimeString()), // Format timestamps for labels
        datasets: [
            {
                label: 'Price',
                data: data.map((point) => point[1]), // Extract the price
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true, // Fill area under the line
            },
        ],
    };

    // Chart options (customize as needed)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USDT)',
                },
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Chart;
