import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from '../UI/Error';

const ChatsListing = ({ error, loading, chats }) => {
  // Error
  if (error) return <Error content={error} />;
  // Build Cards for Listing
  const cards = chats.map(chat => (
    <Card className="chat-card" key={`${chat.id}`}>
      <CardBody className="chat-body">
        <Link key={chat.id} style={{ width: '100%' }} to={`/chat/${chat.id}`}>
          <CardText className="chat-card-title">
            {chat.name}
          </CardText>
        </Link>
        <CardBody className="chat-participants">
          {chat.authorizedUsers.map(user => (
            <Link key={user.id} className="chat-card-text" to={`/member/${user.id}`}>
              <CardText className="chat-card-text">
                {'<'}
                {user.userName}
                {'>'}
              </CardText>
            </Link>
          ))}
        </CardBody>
      </CardBody>
    </Card>
  ));

  // Show Listing
  return (
    <div>
      <Row className={loading ? 'content-loading' : ''}>
        <Col sm="12">
          {cards}
        </Col>
      </Row>
    </div>
  );
};

ChatsListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ChatsListing.defaultProps = {
  error: null,
};

export default ChatsListing;
