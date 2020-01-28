import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as d3 from 'd3';
import data from './gw-30days.csv';

let dataArr = [];

d3.csv(data, (data) => {
    if (data){
        dataArr.push(data); 
    } 

    ReactDOM.render(
        <App width={960} height={640} data={dataArr} />,
        document.getElementById('root'),
    )
});



