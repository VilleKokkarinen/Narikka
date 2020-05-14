import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from '../UI/Error';

const EventListing = ({ error, loading, events }) => {
  // Error
  if (error) return <Error content={error} />;
  // Build Cards for Listing
  const cards = events.map(item => (

    <Card className="p-card" key={`${item.id}`}>
      <CardBody>
        <CardTitle>
          {item.title.length >= 60 ? `${item.title.substring(0, 60)} ...` : item.title}
        </CardTitle>
        <CardText>
          {item.body.length >= 120 ? `${item.body.substring(0, 100)} ...` : item.body}
        </CardText>
        <Link className="btn btn-primary" to={`/event/${item.id}`}>
          {'View Event '}
          <i className="icon-arrow-right" />
        </Link>
      </CardBody>
    </Card>
  ));

  // Show Listing
  return (
    <div>
      <Row className={loading ? 'content-loading' : ''}>
        {cards}
      </Row>
    </div>
  );
};

EventListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

EventListing.defaultProps = {
  error: null,
};

export default EventListing;
