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
	Badge,
	Spinner,
} from 'react-bootstrap';
import RecordForm from './profileForm';
import { GetAllProfiles } from '../../../redux/services/profile_service';
import DataTable from '../../extensions/DataTable';
import userdefault from '../../../images/userdefault.png';
import { updateProfile } from '../../../redux/actions/profile_actions';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import PdsProfile from './pdsProfile';
import { check, error, time } from '../../../images';

class Records extends Component {
	state = {
		mode: null,
		isLoading: false,
		isModalOpen: false,
		modalTitle: 'add title',
		modalContent: null,
		list: [],
	};

	componentDidMount() {
		this.reload();
	}

	// print
	printDocument(file) {
		var prtContent = document.getElementById(file);
		var WinPrint = window.open(
			'',
			'',
			'left=0,top=0,width=800,height=500,toolbar=0,scrollbars=0,status=0'
		);
		WinPrint.document.write(
			`<html><head><link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
		  </head><body>`
		);

		// WinPrint.document.write(
		// 	document.getElementById('cp_report_toPrintDetails').innerHTML
		// );

		WinPrint.document.write(prtContent.innerHTML);
		WinPrint.document.write(
			'<script type="text/javascript">window.print();window.close();</script>'
		);

		WinPrint.document.write('</body></html>');
		WinPrint.document.close();
		WinPrint.focus();
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
		return (
			<Container fluid className='mt-2'>
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
				<Navbar bg='light' className='rounded shadow-sm'>
					<Navbar.Collapse>
						<Nav>
							<Nav.Item>
								<ButtonToolbar>
									<Button
										size='sm'
										className='m-1'
										variant='primary'
										onClick={() => {
											this.setState({ mode: 'add' });
											this.openModal({
												title: 'Add Customer Profile',
												content: (
													<RecordForm
														mode='add'
														reload={this.reload}
														closeModal={this.closeModal}
													/>
												),
											});
										}}
									>
										Create Profile
									</Button>
									<Button
										size='sm'
										onClick={() => {
											this.reload();
										}}
										className='m-1'
										variant='secondary'
									>
										<Spinner
											className='mr-1'
											animation='border'
											size='sm'
											hidden={!this.state.isLoading}
										/>
										Refresh
									</Button>
								</ButtonToolbar>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{!this.state.isLoading ? (
					<div>
						<Table
							className='mt-5'
							size='sm'
							hover
							striped
							borderless
							responsive
						>
							<thead>
								<tr>
									<th>Profile Picture</th>
									<th>Full Name</th>
									<th>Birth Date</th>
									<th>Street Address</th>
									<th>Barangay</th>
									<th>City/Municipality</th>
									<th>State/Province</th>
									<th>Zip Code</th>
									<th>Contact Number</th>
									<th>Status</th>
									<th />
								</tr>
							</thead>
							<tbody style={{ height: '200', overflow: 'auto' }}>
								{this.state.list.map((item, idx) => {
									var isPending = item.status === 'PENDING';

									var allowActivate = isPending || item.status === 'DECLINED';
									var allowDeactivate = isPending || item.status === 'APPROVED';

									return (
										<tr
											onDoubleClick={() => {
												this.setState({ mode: 'edit' });
												this.openModal({
													title: 'Modify Customer Profile',
													content: (
														<RecordForm
															mode='edit'
															item={item}
															reload={this.reload}
															closeModal={this.closeModal}
														/>
													),
												});
											}}
											style={{
												borderLeftWidth: '2px',
												borderLeftColor:
													item.status === 'DECLINED' ? '#FFCCBC' : 'white',
											}}
											key={idx}
										>
											<td>
												<img
													alt='noImage'
													height={70}
													width={75}
													src={item.image_url ? item.image_url : userdefault}
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
											<td>
												<Badge pill variant={this.renderVariant(item.status)}>
													<img
														className='m-1'
														height='20'
														alt='stat'
														src={
															item.status === 'APPROVED'
																? check
																: item.status === 'PENDING'
																? time
																: error
														}
													/>
													<span>{item.status}</span>
												</Badge>
											</td>
											<td>
												<div>
													<ButtonToolbar>
														<div hidden={true}>
															<PdsProfile
																title={`profile-${item.firstname}`}
																item={item}
															/>
														</div>
														<Button
															onClick={() => {
																this.printDocument(`profile-${item.firstname}`);
															}}
															className='m-1'
															variant='outline-dark'
															size='sm'
														>
															Download Profile
														</Button>
														{allowActivate
															? this.renderApproveButton(item)
															: ''}
														{allowDeactivate
															? this.renderDeclineButton(item)
															: ''}
													</ButtonToolbar>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				) : (
					<DataTable />
				)}
			</Container>
		);
	}

	renderVariant = (status) => {
		switch (status) {
			case 'APPROVED':
				return 'success';

			case 'DECLINED':
				return 'dark';

			case 'PENDING':
				return 'secondary';

			default:
				return 'warning';
		}
	};

	renderApproveButton = (item) => {
		return (
			<Button
				size='sm'
				onClick={() => {
					toastr.confirm('Are you sure you want to approve?', {
						okText: 'Yes',
						onOk: () => {
							var currentItem = item;
							currentItem.status = 'APPROVED';
							this.props.updateProfile(currentItem).then((r) => {
								toastr.success('Status Changed to APPROVED');
								this.reload();
							});
						},
					});
				}}
				variant='outline-success'
				className='m-1'
			>
				Approve
			</Button>
		);
	};

	renderDeclineButton = (item) => {
		return (
			<Button
				size='sm'
				onClick={() => {
					toastr.confirm('Are you sure you want to decline?', {
						okText: 'Yes',
						onOk: () => {
							var currentItem = item;
							currentItem.status = 'DECLINED';
							this.props.updateProfile(currentItem).then((r) => {
								toastr.success('Status Changed to DECLINED');
								this.reload();
							});
						},
					});
				}}
				variant='outline-danger'
				className='m-1'
			>
				Decline
			</Button>
		);
	};
}

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = {
	updateProfile: updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Records);
