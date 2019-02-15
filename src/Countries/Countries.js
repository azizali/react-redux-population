import React from 'react';

export default class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [ 'A', 'B' ]
		};

		this.changeCountry = this.changeCountry.bind(this);
	}
	componentWillMount() {
		const url = 'http://api.population.io:80/1.0/countries';
		fetch(url, {
			headers: {
				accept: 'application/json; charset=utf=8'
			}
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					countries: json.countries
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	changeCountry(e) {
		this.setState({
			selected: e.target.value
		});
	}
	render() {
		const { countries, selected } = this.state;
		return (
			<div className="col">
				<label htmlFor="country">Select Country</label>
				<select value={selected} onChange={this.changeCountry} className="custom-select" id="country">
					{countries.map((item) => {
						return (
							<option key={item} value={item}>
								{item}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}
