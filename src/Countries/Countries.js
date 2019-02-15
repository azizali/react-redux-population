import React from 'react';

export default function({ changeCb, selected }) {
	return (
		<div className="col">
			<label htmlFor="country">Select Country</label>
			<select className="custom-select" id="country">
				<option value="" />
			</select>
		</div>
	);
}
