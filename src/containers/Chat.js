import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getChats } from '../actions/chats';

class ChatListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    chats: PropTypes.shape().isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchChats: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => {
    this.fetchData();
  }

  /**
    * Fetch Data from API, saving to Redux
    */
   fetchData = (data) => {
     const { fetchChats, member } = this.props;
     return fetchChats(data)
       .then(() => fetchChats(member.uid))
       .then(() => this.setState({
         loading: false,
         error: null,
       })).catch(err => this.setState({
         loading: false,
         error: err,
       }));
   }

  render = () => {
    const {
      Layout, chats, match, member,
    } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return (
      <Layout
        member={member}
        chatId={id}
        error={error}
        loading={loading}
        chats={chats.chats}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats || {},
  member: state.member || {},
});

const mapDispatchToProps = {
  fetchChats: getChats,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListing);
