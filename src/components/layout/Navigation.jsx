/** @format */
import React, { Component } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { logo } from '../../images';
import { connect } from 'react-redux';
import { Logout } from '../../redux/actions/account_actions';

import { history } from '../../history';
import { Link } from 'react-router-dom';

class AppNavigation extends Component {
	render() {
		return (
			<Navbar
				expand='lg'
				sticky='top'
				bg='light'
				variant='light'
				className='shadow-sm alignt-content-between'
			>
				<Container>
					<Navbar.Brand className='text-dark d-inline'>
						<img
							alt='logo'
							height={60}
							src={logo}
							className='d-inline-block m-2'
						/>
						Raketero Back Office Manager
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<Link className='nav-link' to='/records'>
								Records
							</Link>
						</Nav>
						<Nav>
							<Button
								variant='dark'
								onClick={() => {
									this.props.logout();
									history.push('/');
									this.setState({ isLogged: false });
									window.location.reload(false);
								}}
							>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = {
	logout: Logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
