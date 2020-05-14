import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEvents, getEventTypes } from '../actions/events';

class EventListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    events: PropTypes.shape().isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchEvents: PropTypes.func.isRequired,
    fetchEventTypes: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  /**
    * Fetch Data from API, saving to Redux
    */
   fetchData = (data) => {
     const { fetchEvents, fetchEventTypes } = this.props;
     this.setState({ loading: true });
     return fetchEvents(data)
       .then(() => fetchEventTypes())
       .then(() => this.setState({
         loading: false,
         error: null,
       })).catch(err => this.setState({
         loading: false,
         error: err,
       }));
   }

  render = () => {
    const { Layout, events, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return (
      <Layout
        eventId={id}
        error={error}
        loading={loading}
        events={events.events}
        reFetch={() => this.fetchEvents()}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.events || {},
});

const mapDispatchToProps = {
  fetchEvents: getEvents,
  fetchEventTypes: getEventTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListing);
