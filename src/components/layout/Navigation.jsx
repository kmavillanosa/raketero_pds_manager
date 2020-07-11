/** @format */
import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logo } from '../../images';
import { connect } from 'react-redux';
import { Logout } from '../../redux/actions/account_actions';

import { history } from '../../history';
import { Link } from 'react-router-dom';

class AppNavigation extends Component {
	render() {
		return (
			<Navbar
				style={{ backgroundColor: '#ff6908' }}
				expand='lg'
				sticky='top'
				variant='light'
				className='shadow-sm alignt-content-between'
			>
				<Navbar.Brand className='text-dark d-inline'>
					<img
						alt='logo'
						height={60}
						src={logo}
						className='d-inline-block m-2'
					/>
					<span>RAKETERO ADMIN PORTAL</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Link className='nav-link' to='/profile'>
							Profile
						</Link>
						<Link className='nav-link' to='/accounts'>
							Accounts
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
