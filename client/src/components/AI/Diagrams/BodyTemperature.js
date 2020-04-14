import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
import axios from 'axios';
import "./Style.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class BodyTemperature extends Component {

	constructor(props) {
        super(props);
        this.state = {
			options: [],
			points: [] 
        };
	}
	componentDidMount() {
        console.log("email = " + localStorage.email);
        axios.get('http://localhost:5000/reports/patientReports/' + localStorage.email)
            .then(res => {
                this.setState({reports: res.data.reports});
				console.log(this.state.reports);
				var i = 1;
				var firstDay;
				console.log(this.state.points);
				res.data.reports.forEach( r => {
					if(r.body_temperature > 30 && r.body_temperature < 50){
						const point = {
							x: i,
							y:r.body_temperature * 1
						}
						this.state.points.push(point);
						if(i===1){
							firstDay = 'First date of data is ' + r.report_time
						}
						i++;
					}

				});
				console.log(this.state.points);
				this.setState({
					options: {
						animationEnabled: true,
						exportEnabled: true,
						theme: "light2", // "light1", "dark1", "dark2"
						title:{
							text: "Body Temperature"
						},
						axisY: {
							title: "Centigrade",
							includeZero: false,
							suffix: "C"
						},
						axisX: {
							title: firstDay,
							prefix: "",
							interval: 1
						},
						data: [{
							type: "line",
							toolTipContent: "Day {x}: {y}%",
							dataPoints: this.state.points
						}]
					}
				});
				console.log(this.state.points);
				console.log(this.state.options);
            }).catch(function (error) {
                console.log(error);
            })
    }
	render() {
		
		return (
		<div className="canvas">
			<CanvasJSChart options = {this.state.options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BodyTemperature;                           