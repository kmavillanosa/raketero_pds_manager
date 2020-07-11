/** @format */

import React, { Component } from 'react';
import {
	Table,
	Navbar,
	Button,
	Container,
	ButtonToolbar,
	Spinner,
	Badge,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	ViewAccountCollection,
	Update,
} from '../../../redux/actions/account_actions';
import DataTable from '../../extensions/DataTable';
import { toastr } from 'react-redux-toastr';

class AccountRecords extends Component {
	state = {
		isLoading: false,
	};

	componentDidMount() {
		this.reload();
	}

	reload = () => {
		this.setState({ isLoading: true });
		this.props.ViewAccountCollection().then((r) => {
			this.setState({ isLoading: false });
		});
	};

	renderVariant = (status) => {
		switch (status) {
			case 'ACTIVE':
				return 'primary';

			case 'INACTIVE':
				return 'danger';

			case 'NEW':
				return 'success';

			default:
				return 'warning';
		}
	};

	render() {
		return (
			<Container fluid className='mt-2'>
				<Navbar bg='light' className='rounded shadow-sm'>
					<Navbar.Collapse>
						<Button
							onClick={() => {
								this.reload();
							}}
							size='sm'
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
					</Navbar.Collapse>
				</Navbar>
				{this.state.isLoading ? (
					<DataTable />
				) : (
					<Table className='mt-3' size='sm' hover striped borderless responsive>
						<thead>
							<tr>
								<th>Email</th>
								<th>User name</th>
								<th>Status</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{this.props.accountCatalog.data.map((account, idx) => {
								var isPending = account.status === 'NEW';

								var allowActivate = isPending || account.status === 'INACTIVE';
								var allowDeactivate = isPending || account.status === 'ACTIVE';

								return (
									<tr key={idx}>
										<td>{account.email}</td>
										<td>{account.username}</td>
										<td>
											<Badge variant={this.renderVariant(account.status)}>
												{account.status}
											</Badge>
										</td>
										<td>
											<ButtonToolbar>
												{allowActivate ? (
													<Button
														onClick={() => {
															toastr.confirm(
																'Are you sure you want to activate?',
																{
																	okText: 'Yes',
																	onOk: () => {
																		var acc = account;
																		acc.status = 'ACTIVE';
																		this.props.Update(account).then((r) => {
																			this.reload();
																		});
																	},
																}
															);
														}}
														className='m-1'
														size='sm'
														variant='outline-success'
													>
														Activate
													</Button>
												) : (
													''
												)}
												{allowDeactivate ? (
													<Button
														onClick={() => {
															toastr.confirm(
																'Are you sure you want to deactivate?',
																{
																	okText: 'Yes',
																	onOk: () => {
																		var acc = account;
																		acc.status = 'INACTIVE';
																		this.props.Update(account).then((r) => {
																			this.reload();
																		});
																	},
																}
															);
														}}
														className='m-1'
														size='sm'
														variant='outline-danger'
													>
														Deactivate
													</Button>
												) : (
													''
												)}
											</ButtonToolbar>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accountCatalog: state.profile.accountCatalog,
	};
};
const mapDispatchToProps = {
	Update: Update,
	ViewAccountCollection: ViewAccountCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountRecords);
