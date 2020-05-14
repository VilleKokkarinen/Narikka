import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../../../actions/member';

class Header extends Component {
  static propTypes = {
    Items: PropTypes.shape().isRequired,
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  }

  render = () => {
    const { Layout, member, memberLogout, Items } = this.props;

    return <Layout member={member} logout={memberLogout} Items={Items} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
