/** @format */

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { logo, userdefault } from '../../../images';

export default class PdsProfile extends Component {
	render() {
		return (
			<canvas id={this.props.title}>
				<div>
					<img height='80' alt='logo' src={logo} />
					<h2 className='float-right'>Personal Data Sheet</h2>
				</div>

				<div className='mt-3'>
					<img
						alt='img'
						height='200'
						width='200'
						src={
							this.props.item.image_url !== null ||
							this.props.item.image_url !== ''
								? this.props.item.image_url
								: userdefault
						}
					/>
					<h1>{`${this.props.item.firstname} ${this.props.item.middlename} ${this.props.item.lastname}`}</h1>

					<h3 className='mt-3'>Profile Details</h3>
					<Table className='mt-3'>
						<tbody>
							<tr>
								<td className='strong'>Contact Number</td>
								<td>{this.props.item.contact_number}</td>
							</tr>
							<tr>
								<td className='strong'>Birth Date</td>
								<td>{this.props.item.birthdate}</td>
							</tr>
							<tr>
								<td className='strong'>Street Address</td>
								<td>{this.props.item.street_address}</td>
							</tr>
							<tr>
								<td className='strong'>Barangay</td>
								<td>{this.props.item.barangay}</td>
							</tr>
							<tr>
								<td className='strong'>City/Municipality</td>
								<td>{this.props.item.city_municipality}</td>
							</tr>
							<tr>
								<td className='strong'>State/Province</td>
								<td>{this.props.item.state_province}</td>
							</tr>
							<tr>
								<td className='strong'>Zip Code</td>
								<td>{this.props.item.zip_code}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</canvas>
		);
	}
}
