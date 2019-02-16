import './index.css';
import React, { useState } from 'react';
import { render } from 'react-dom';

import Year from '../Year/Year';
import Countries from '../Countries/Countries';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			year: 2017,
			country: '',
			people: 0
		};
		this.changeInputs = this.changeInputs.bind(this);
		this.getPopulation = this.getPopulation.bind(this);
	}

	changeInputs({ year = this.state.year, country = this.state.country }) {
		this.setState(
			{
				year,
				country
			},
			() => {
				this.getPopulation();
			}
		);
	}
	getPopulation() {
		const { year, country } = this.state;
		if (!year || !country) return;

		const url = `http://api.population.io:80/1.0/population/${year}/${country}/`;

		this.setState(
			{
				isLoading: true
			},
			() => {
				fetch(url, {
					headers: {
						accept: 'application/json; charset=utf=8'
					}
				})
					.then((res) => res.json())
					.then((json) => {
						this.setState({
							people: json.reduce((total, item) => {
								return total + item.total;
							}, 0),
							isLoading: false
						});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		);
	}
	render() {
		const { year, people, isLoading } = this.state;
		return (
			<div className="container mt-5 mx-auto">
				<div className="bg-white border border-dark p-5 rounded">
					<h1 className="text-center">Population:</h1>
					<form className="row">
						<Countries
							changeCb={(country) => {
								this.changeInputs({ country });
							}}
						/>
						<Year
							selected={year}
							changeCb={(e) => {
								this.changeInputs({ year: e.target.value });
							}}
						/>
						<div className="col">
							<label htmlFor="minage">Select Min Age</label>
							<select className="custom-select" id="minage">
								<option value="" />
							</select>
						</div>
						<div className="col">
							<label htmlFor="maxage">Select Max Age</label>
							<select className="custom-select" id="maxage">
								<option value="" />
							</select>
						</div>
						<div className="col">
							<label htmlFor="gender">Select Gender</label>
							<select className="custom-select" id="gender">
								<option value="" />
							</select>
						</div>
					</form>
					<div className="alert text-center h2">
						{isLoading ? (
							'Loading...'
						) : (
							`${people.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}`
						)}
					</div>
				</div>
			</div>
		);
	}
}

render(<App />, document.querySelector('#app'));
