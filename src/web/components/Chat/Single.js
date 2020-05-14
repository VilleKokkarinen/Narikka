import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  Button,
  Form,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { errorMessages } from '../../../constants/messages';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import ReplyListing from './ReplyComponent';
import { FirebaseRef } from '../../../lib/firebase';

export function ReplyToPrivateConvo(chatId, messagetext, author, timestamp) {
  FirebaseRef.child('chat-messages/').child(chatId).push({
    id: FirebaseRef.child('chat-messages/').child(chatId).push().key,
    messagetext,
    author,
    timestamp,
  })
    .catch((e) => {
      console.log(e);
    });
}

const ChatView = ({
  error,
  loading,
  chats,
  chatId,
  member,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this chat from all chats
  let chat = null;
  if (chatId && chats) {
    chat = chats.find(item => item.id === chatId);
  }
  const msgAuthorUserName = (id) => {
    let msgauthor = null;
    if (id && chat.authorizedUsers) {
      msgauthor = chat.authorizedUsers.find(item => item.id === id);
    }
    return msgauthor.userName;
  };

  const MessageListing = () => {
    const cards = chat.messages.map(message => (
      <Card className="chat-card-body" key={`${message.id}`}>
        <CardBody className="chat-card-timestamp-body">
          <CardText className="chat-card-timestamp-text">
            {new Date(+message.timestamp).toLocaleString()}
          </CardText>
        </CardBody>
        <CardBody className="chat-card-main-body">
          <CardBody className="chat-card-author-body">
            <img
              className="chat-card-author-img"
              src="https://i.imgur.com/Dxkqw0C.png"
              alt=" "
            />
            <Link style={{ width: '100%' }} to={`/member/${message.author.id}`}>
              <CardText className="chat-card-author-text">
                {msgAuthorUserName(message.author.id)}
              </CardText>
            </Link>
          </CardBody>
          <CardBody className="chat-card-message-body">
            <CardText className="chat-card-message-text">
              {message.message}
            </CardText>
          </CardBody>
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

  const BackButton = () => (
    <Row className="pb-3">
      <Col sm="12">
        <Link className="btn btn-primary" to="/chats">
          <i className="icon-arrow-left" />
          {' Back'}
        </Link>
      </Col>
    </Row>
  );

  // chat not found
  if (!chat) return <Error content={errorMessages.chat404} />;
  const handleCounter = (_State) => {
    const replymessage = _State;
    const author = {
      id: member.uid,
    };
    const timestamp = new Date().getTime();
    ReplyToPrivateConvo(chatId, replymessage, author, timestamp);
    reFetch();
  };

  return (
    <div>
      <BackButton />
      <Row className={loading ? 'content-loading' : ''}>
        <Col sm="12">
          <MessageListing />
        </Col>
        <ReplyListing handleCounter={handleCounter} />
      </Row>
    </div>
  );
};

ChatView.propTypes = {
  reFetch: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.shape({}).isRequired,
};
ChatView.defaultProps = {
  error: null,
};

export default ChatView;
