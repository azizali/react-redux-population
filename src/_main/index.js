import './index.css';
import React, { useState } from 'react';
import { render } from 'react-dom';

import Year from '../Year/Year';
import Countries from '../Countries/Countries';

function App({ people = 0 }) {
	const [ year, setYear ] = useState(2007);
	return (
		<div className="container mt-5 mx-auto">
			<div className="bg-white border border-dark p-5 rounded">
				<h1 className="text-center">Population:</h1>
				<form className="row">
					<Countries />
					<Year
						selected={year}
						changeCb={(e) => {
							setYear(e.target.value);
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
				<div className="result">{people}</div>
			</div>
		</div>
	);
}

render(<App />, document.querySelector('#app'));
