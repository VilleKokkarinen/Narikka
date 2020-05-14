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
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Error from '../UI/Error';

const MemberListing = ({ error, loading, members }) => {
  // Error
  if (error) return <Error content={error} />;
  // Build Cards for Listing
  const cards = members.map(item => (
    <Card className="member-card" key={`${item.id}`}>
      <Popup
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
        closeOnDocumentClick
        modal
        trigger={(
          <CardBody className="body">
            <img
              className="img"
              src="https://i.imgur.com/Dxkqw0C.png"
              alt=" "
            />
            <CardText className="text">
              {item.userName}
            </CardText>
          </CardBody>
        )}
      >
        <Card className="popup-card">
          <CardBody className="popup-body">
            <img
              className="popup-img"
              src="https://i.imgur.com/Dxkqw0C.png"
              alt=" "
            />
            <CardBody className="popup-text-body">
              <CardText className="popup-title">
                <Link to={`/member/${item.id}`}>
                  {`${item.userName}'s Profile Page`}
                </Link>
              </CardText>
              <CardText className="popup-text">
                <Link to={{ pathname: '/newchat', chatTarget: item }}>
                  {'Send a private message'}
                </Link>
              </CardText>
            </CardBody>
          </CardBody>
        </Card>
      </Popup>

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

MemberListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

MemberListing.defaultProps = {
  error: null,
};

export default MemberListing;
