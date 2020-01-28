import React, { Component } from 'react';
import * as d3 from "d3";
import './App.css';


export default class NumberOfVisitors extends Component {

  componentDidUpdate = () => {
    
    if(this.props.data.slice(50).length === 30){
      let data = this.props.data.slice(50);
      this.createNumberOfVisitors(data);
    }
  }

  createNumberOfVisitors = (data) => {
    const width = 650;
    const height = 850;
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 200
  };
    const numOfVisitors = [];
    const accountIDs = [];

    data.map((d) => {
      return (
          numOfVisitors.push(Number(d["Visitors"])),
          accountIDs.push(d["Account ID"])
      )
    })    
    const svg = d3.selectAll("#numberOfVisitors")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("color", "white")
                  .attr("transform", "translate(" + 70 + "," + 50 + ")")
                  .style("margin", 30);

    const x = d3.scaleLinear()
            .domain([0, d3.max((d) => d["Visitors"])])  
            .range([0, width])

    const y = d3.scaleBand()
              .range([height,0])
              .padding(.01)
              .domain(data.map((d) => {
                return d["Account ID"];
              }))    
    
            // Add the x Axis 
    svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))

              // Add the y axis
    svg.append("g")
              .call(d3.axisLeft(y))

    svg.selectAll(".visitor-bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "visitor-bar")
            .attr("width", (d) => d["Visitors"] * 20)  
            .attr("y", (d) => y(d["Account ID"]))
            .attr("height", 25);
  }

  render(){
    return(
      <div>
      </div>
    )
  }
}

