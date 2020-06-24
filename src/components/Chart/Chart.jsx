import React, { useState, useEffect } from "react";
import { fetchdailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
// import { Line, Bar } from "chart.js";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchdailyData());
		};
		console.log(dailyData);
		fetchAPI();
	}, []);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: "Affected",
						borderColor: "rgba(255,0,0,0.7)",
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: "Deaths",
						borderColor: "silver",
						borderColor: "rgba(192,192,192,0.7)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ["Affected", "Recovered", "Deaths"],
				datasets: [
					{
						label: "People",
						backgroundColor: [
							"rgba(255, 0, 0, 0.7)",
							"rgba(86, 160, 86, 0.7)",
							"rgba(192, 192, 192, 0.7)",
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Chart;
