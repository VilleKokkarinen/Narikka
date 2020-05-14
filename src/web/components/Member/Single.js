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
import { Link } from 'react-router-dom';
import { errorMessages } from '../../../constants/messages';
import Loading from '../UI/Loading';
import Error from '../UI/Error';

const MemberView = ({
  error,
  loading,
  members,
  memberId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this member from all members
  let member = null;
  if (memberId && members) {
    member = members.find(item => item.id === memberId);
  }

  // member not found
  if (!member) return <Error content={errorMessages.member404} />;

  /* Build Details listing
  const details = member.details.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  // Build Info listing
  const info = member.info.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));
*/
  return (
    <div>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-primary" to="/members">
            <i className="icon-arrow-left" />
            {' Back'}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <h1>
            {(`${member.userName}`)}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="members-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> About this member </CardHeader>
            <CardBody style={{ backgroundColor: '#606060' }}>
              <CardText>
                {member.userName}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="members-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> Details </CardHeader>
            <CardText style={{ backgroundColor: '#606060' }}>
              {member.userName}
            </CardText>
          </Card>
        </Col>
        <Col lg="4" className="members-view-card">
          <Card style={{ backgroundColor: '#6A6E74' }}>
            <CardHeader> info </CardHeader>
            <CardText style={{ backgroundColor: '#606060' }}>
              {member.userName}
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

MemberView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  memberId: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

MemberView.defaultProps = {
  error: null,
};

export default MemberView;
