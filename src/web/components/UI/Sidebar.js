/* global window */
import React from 'react';
import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SidebarNavItems = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" />
        {' '}
        <span>Home</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/event') && 'active'}`} to="/events">
        <i className="icon-notebook" />
        {' '}
        <span>Events</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/chats') && 'active'}`} to="/chats">
        <i className="icon-notebook" />
        {' '}
        <span>Priv. Chats</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/member') && 'active'}`} to="/members">
        <i className="icon-notebook" />
        {' '}
        <span>Members</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/create-event') && 'active'}`} to="/create-event">
        <i className="icon-notebook" />
        {' '}
        <span className={`text ${window.location.pathname.startsWith('/create-event') && 'active'}`} >New Event</span>
      </Link>
    </NavItem>
  </div>
);

const Sidebar = () => (
  <Col sm="2" md="2" className="d-none d-sm-block sidebar">
    <Nav vertical>
      {SidebarNavItems()}
    </Nav>
  </Col>
);

export { Sidebar, SidebarNavItems };
