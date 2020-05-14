import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Config from '../../../constants/config';

class Header extends Component {
  static propTypes = {
    member: PropTypes.shape({
      userName: PropTypes.string,
      email: PropTypes.string,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    Items: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => {
    const { history, logout } = this.props;
    logout().then(() => history.push('/login'));
  }

  toggleDropDown = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { member, Items } = this.props;
    const { isOpen } = this.state;
    const loggedIn = !!(member && member.email);
    return (
      <header style={{ height: 60 }}>
        <Navbar dark expand="sm" className="fixed-top" style={{ minHeight: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/" className="navbar-brand" style={{ color: '#ffd970', height: 40 }}>
            <img
              src="https://i.imgur.com/Dxkqw0C.png"
              alt="header"
              className="header-image"
            />
            {' '}
            {Config.appName}
          </Link>
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {Items}
              </div>
              <UncontrolledDropdown nav>
                <DropdownToggle style={{ color: '#ffd970', margin: '0.5rem 0.75rem', padding: 0 }} nav caret>
                  {loggedIn ? `Hi, ${member.userName}` : 'My Account'}
                </DropdownToggle>
                <DropdownMenu style={{ backgroundColor: '#1c1f25', padding: 0, margin: 0, border: '2px solid #66531d' }}>
                  {!loggedIn
                    && (
                    <div>
                      <DropdownItem style={{ borderBottom: '1px solid #66531d' }} tag={Link} to="/login">Login</DropdownItem>
                      <DropdownItem tag={Link} to="/sign-up">Sign Up</DropdownItem>
                    </div>
                    )
                  }
                  {loggedIn
                    && (
                    <div>
                      <DropdownItem style={{ borderBottom: '1px solid #66531d' }} tag={Link} to="/update-profile">Update Profile</DropdownItem>
                      
                      <DropdownItem tag="button" onClick={this.onLogout}>Logout</DropdownItem>
                    </div>
                    )
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
