import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart.js';
import ScatterPlot from "./ScatterPlot.js";
import NumberOfVisitors from "./NumberOfVisitors.js"

class App extends Component {
  
  render(){
    return(
      <div className="App">
        <div>
          <h4 className="dashboard-title">OBS Charts</h4>
          <BarChart data={this.props.data} />
          <ScatterPlot data={this.props.data}/>
          <NumberOfVisitors data={this.props.data} />
        </div>
      </div>
    )
  }
}

export default App;


/*
 
updateData(){
    d3.csv(data).then(function(data){
      for(let i = 0; i < data.length; i++){
        console.log("Days active is " + data[i]["Days Active"])
        setState
      } 
    }).catch(function(err){
      throw err;
    })
  }

   data ={this.props.data}
    active = {this.props.active}
*/