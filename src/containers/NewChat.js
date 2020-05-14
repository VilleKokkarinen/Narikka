import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp } from '../actions/member';

class NewChat extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.shape({}).isRequired,
  }

  state = {
    errorMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
      location,
    } = this.props;
    const { chatTarget } = location;
    const { errorMessage } = this.state;
    return (
      <Layout
        member={member}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
        chatTarget={chatTarget}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  chatTarget: state.chatTarget,
});

const mapDispatchToProps = {
  onFormSubmit: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChat);
