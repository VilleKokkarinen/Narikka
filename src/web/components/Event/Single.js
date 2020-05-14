import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { errorMessages } from '../../../constants/messages';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

const EventView = ({
  error,
  loading,
  events,
  eventId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this event from all events
  let event = null;
  if (eventId && events) {
    event = events.find(item => item.id === eventId);
  }
  // event not found
  if (!event) return <Error content={errorMessages.event404} />;
  /*
  // Build Ingredients listing
  const ingredients = recipe.ingredients.map(item => (
    <ListGroupItem key={`${item}`}>{item}</ListGroupItem>
  ));

  // Build Method listing
  const method = recipe.method.map(item => (
    <ListGroupItem key={`${item}`}>{item}</ListGroupItem>
  ));
*/

  return (
    <div>
      <Helmet>
        <title>{event.title}</title>
      </Helmet>

      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-primary" to="/events">
            <i className="icon-arrow-left" />
            {' Back'}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <h1>
            {event.title.length >= 100 ? `${event.title.substring(0, 100)} ...` : event.title}
          </h1>
          <p>
            {'by: '}
            {event.author}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="event-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> About this event </CardHeader>
            <CardBody style={{ backgroundColor: '#606060' }}>
              <CardText>
                {event.body}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="event-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> Details </CardHeader>
            <CardText style={{ backgroundColor: '#606060' }}>
              {event.details}
            </CardText>
          </Card>
        </Col>
        <Col lg="4" className="event-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> info </CardHeader>
            <CardText style={{ backgroundColor: '#606060' }}>
              {event.info}
            </CardText>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

EventView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  eventId: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

EventView.defaultProps = {
  error: null,
};

export default EventView;
