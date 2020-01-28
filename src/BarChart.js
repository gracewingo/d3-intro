import React, { Component } from 'react';
import * as d3 from "d3";
import "./App.css";

export default class BarChart extends Component {
    state = {
      daysActive: [],
    }

  componentDidUpdate = () => {
    if (this.props.data.slice(50).length === 30){
      this.getActive();
  }
}
  
  getActive = () => {
    const dataArr = this.props.data;
    let activeArr = [];
    let accountArr = [];
    dataArr.map(function(v){
      return (
        activeArr.push(Number(v["Days Active"])),
        accountArr.push(v["Account ID"])
      )
    })
    this.drawChart(activeArr,accountArr);
  }

  drawChart = (active,accountId) => {
    const data = active;
    const width = 550;
    const height = 350;

    // Select the body element in the doc 
    const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin-left", 30);
                  
    // Grab all svg elements 
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 17)
      .attr("y", (d) => (height-40) - 8 * d)
      .attr("width", 10)
      .attr("height", (d) => d * 8)
      .attr("fill", "#19888A")
      .attr("class", "bar")
      // Add account id on hover 
      .append("title").text(function(d,i){
        return accountId[i];
      })

    // Add the data points as text appearing above the bars
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text").text((d) => d)
        .attr("x", (d,i) => i * 17)
        .attr("y", (d,i) => (height-40) - (d * 8 + 10))
        .attr("fill", "#F0F3F3")      
  } 

  render(){
    return (
      <div>
      </div>
    );
  }
}


