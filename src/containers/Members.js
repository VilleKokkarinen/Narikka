import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMembers, setError, getMemberTypes } from '../actions/members';

class MemberListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    members: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      members: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchMembers: PropTypes.func.isRequired,
    fetchMemberTypes: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchMembers();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchMembers = () => {
    const { fetchMembers, showError, fetchMemberTypes } = this.props;
    return fetchMembers()
      .then(() => fetchMemberTypes())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, members, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        memberId={id}
        error={members.error}
        loading={members.loading}
        members={members.members}
        reFetch={() => this.fetchMembers()}
      />
    );
  }
}

const mapStateToProps = state => ({
  members: state.members || {},
});

const mapDispatchToProps = {
  fetchMembers: getMembers,
  fetchMemberTypes: getMemberTypes,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberListing);
