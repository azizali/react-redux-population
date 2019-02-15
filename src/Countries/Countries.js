import React from 'react';

export default class Countries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [ 'A', 'B' ]
		};

		this.changeCountry = this.changeCountry.bind(this);
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
