import React, { Component } from 'react';
import "./App.css";
import * as d3 from 'd3';

export default class ScatterPlot extends Component {
   
    componentDidUpdate = () => {
        if (this.props.data.slice(50).length === 30){
            this.drawScatter();
        }
    }
    drawScatter = () => {
        const data = this.props.data;

        const guideArray = this.createCXCYArray(data);
        // Get the content for the tooltips 
        const accountId = [];
        const timeOnApp = [];
        const publishedGuides = [];
        const nps = [];
        // Map over full data array to grab other info for tooltips
        data.map((v) => {
            return (
                accountId.push(v["Account ID"]),
                timeOnApp.push(v["Time on App (minutes)"]),
                publishedGuides.push(v["Published Guides Count (All Apps)"]),
                nps.push(v["NPS Guides Published (All Apps)"])
            ) 
        })

        const w = 550;  
        const h = 350;
        const padding = 60;

        const xScale = d3.scaleLinear()
                        .domain([d3.min(guideArray,(d) => d[1]), d3.max(guideArray,(d) => d[1])])
                        .range([padding, w-padding])

        const yScale = d3.scaleLinear() 
                        .domain([d3.min(guideArray,(d) => d[0]), d3.max(guideArray,(d) => d[0])])  
                        .range([h-padding, padding])

        const xAxis = d3.axisBottom(xScale);

        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select("#scatter-plot")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h)

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
        .append("text")
            .attr("x",(w-50))
            .attr("y", -6)
            .style("text-anchor", "end")
            .style("fill", "white")
            .attr("class", "label")
            .text("Guides Published (Last 30)")
    

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(50, -10)")
            .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("class", "label")
            .attr("y", 0 - 54)
            .attr("x",0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .style("fill", "white")
            .text("Time in App");
        
        // Create tooltip
       let foWidth = 145;
       let t = 50, k = 15;
       let tip = {'w': (3/4 * t), 'h': k};

        let tipMouseover = (data) => {
     
            let fo = svg.append('foreignObject')            
                .attr("x", (d3.event.pageX - 170))
                .attr("y", (d3.event.pageY - (h-120)))
                .attr('width', foWidth)
                .attr('class', 'svg-tooltip')
                .attr('border-radius', "8px")
                
            let div = fo.append('xhtml:div')
                .append('div')
                .attr('class', 'tooltip')
                .attr('border-radius', "8px")
            
            div.append('p')
                .attr('class', 'lead')
                .html("<b>" + data["Account ID"] + "</b>");

            div.append('p')
                .html('Time on App (Last 30 Days): <b>' + data["Time on App (minutes)"] + "</b>");

            div.append('p')
                .html('Published Guides (Last 30 Days): <b>' + data["Published Guides Count (All Apps)"] + "</b>");

            div.append("p")
                .html("NPS Guides Published: <b>" + data["NPS Guides Published (All Apps)"] + "</b>")
            
            let foHeight = 115;
            fo.attr('height', foHeight);

            // Tooltip shape 
            svg.insert('polygon', '.svg-tooltip')
                .attr('points', "0,0 0," + foHeight + " " + foWidth + "," + foHeight + " " + foWidth + ",0 " + (t) + ",0 " + tip.w + "," + 0 + " " + (t/2) + ",0")
                .attr('height', foHeight + tip.h) 
                .attr('width', foWidth)
                .attr('fill','#D8D8D8')
                .attr('opacity', 0.75)
                .attr('transform', 'translate(' + (d3.event.pageX - 170) + ',' + (d3.event.pageY - (h-120)) + ')')
        }  
        
       const tipMouseout = () => {
            svg.selectAll('.svg-tooltip').remove();
            svg.selectAll('polygon').remove();               
        };
        
        svg.selectAll("circle")
            .data(guideArray)
            .enter()
            .append("circle")
            // Y is the time on app, x is num of guides published
            .attr("cx", (d) => Math.round(xScale(d[1]) + 10))
            .attr("cy", (d) => Math.round(yScale(d[0])-10))
            .attr("r", 5)
            .attr("class", "circle")
            .attr("fill", "#D89205")
            .data(data)    
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
    }

    createCXCYArray = (props) => {
        const data = [];
        props.map((v) => {
            return (
                data.push([Math.floor(Number(v["Time on App (minutes)"])),(Number(v["Published Guides Count (All Apps)"]))])
            )
        })
        return data;
    }

        render(){
            return(
                <div>
                </div>    
            )
        }
}


/*

https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3

inspo:
https://apexcharts.com/javascript-chart-demos/dashboards/realtime/#


use this: https://stackoverflow.com/questions/11102795/d3-node-labeling
and this, https://stackoverflow.com/questions/24032397/inserting-new-line-in-html-using-d3

To do:
- variabilize the d3.event.pageY and X so to keep state easier to maintain 
- react and d3 -  https://www.youtube.com/watch?v=xyyI6EytvZk&t=799s


 */


