/** @format */
import React, { Component } from 'react';
import {
	Container,
	Navbar,
	Nav,
	Button,
	Table,
	ButtonToolbar,
	Modal,
} from 'react-bootstrap';
import RecordForm from './recordForm';
import {
	GetAllProfiles,
	DeleteProfile,
} from '../../../redux/services/profile_service';
import DataTable from '../../extensions/DataTable';
import userdefault from '../../../images/userdefault.png';
import { ToastsStore } from 'react-toasts';

class Records extends Component {
	state = {
		isLoading: false,
		isModalOpen: false,
		modalTitle: 'add title',
		modalContent: null,
		list: [],
	};

	componentDidMount() {
		this.reload();
	}

	reload = () => {
		this.setState({ isLoading: true });
		GetAllProfiles().then((resp) => {
			this.setState({ list: resp.data.data, isLoading: false });
		});
	};

	openModal = (options) => {
		this.setState({
			isModalOpen: true,
			modalTitle: options.title,
			modalContent: options.content,
		});
	};

	closeModal = () => {
		this.setState({ isModalOpen: false });
	};

	render() {
		return this.state.isLoading ? (
			<Container>
				<DataTable />
			</Container>
		) : (
			<Container className='mt-2'>
				<Modal
					backdrop='static'
					size='lg'
					show={this.state.isModalOpen}
					onHide={this.closeModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.modalTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.state.modalContent}</Modal.Body>
				</Modal>
				<Navbar>
					<Navbar.Collapse>
						<Nav>
							<Nav.Item>
								<ButtonToolbar>
									<Button
										className='m-1'
										variant='primary'
										onClick={() => {
											this.openModal({
												title: 'Add Customer Profile',
												content: (
													<RecordForm mode='add' closeModal={this.closeModal} />
												),
											});
										}}
									>
										Create Profile
									</Button>
									<Button
										onClick={() => {
											this.reload();
										}}
										className='m-1'
										variant='secondary'
									>
										Refresh
									</Button>
								</ButtonToolbar>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Table responsive>
					<thead>
						<th />
						<th>Profile Picture</th>
						<th>Full Name</th>
						<th>Birth Date</th>
						<th>Stree Address</th>
						<th>Barangay</th>
						<th>City/Municipality</th>
						<th>State/Province</th>
						<th>Zip Code</th>
						<th>Contact Number</th>
					</thead>
					<tbody>
						{this.state.list.map((item, idx) => {
							return (
								<tr key={idx}>
									<td className='w-25'>
										<div>
											<ButtonToolbar>
												<Button
													variant='outline-secondary'
													className='m-1'
													onClick={() => {
														this.openModal({
															title: 'Modify Customer Profile',
															content: (
																<RecordForm
																	mode='edit'
																	item={item}
																	closeModal={this.closeModal}
																/>
															),
														});
													}}
												>
													Edit
												</Button>
												{/* <Button
													variant='outline-danger'
													className='m-1'
													onClick={() => {
														DeleteProfile({
															account_id: item.user_id,
														}).then((r) => {
															ToastsStore.success('Profile Deleted');
														});
													}}
												>
													Delete
												</Button> */}
											</ButtonToolbar>
										</div>
									</td>
									<td>
										<img
											alt='noImage'
											height={60}
											width={70}
											src={item.image_url}
											onError={(e) => {
												e.target.src = userdefault;
											}}
										/>
									</td>

									<td>{`${item.firstname} ${item.middlename} ${item.lastname}`}</td>
									<td>{item.birthdate}</td>
									<td>{item.street_address}</td>
									<td>{item.barangay}</td>
									<td>{item.city_municipality}</td>
									<td>{item.state_province}</td>
									<td>{item.zip_code}</td>
									<td>{item.contact_number}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		);
	}
}
export default Records;
