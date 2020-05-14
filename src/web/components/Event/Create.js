import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  CardImg,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FirebaseRef } from '../../../lib/firebase';

export function MakeEvent(title, body, author, category, image, info, details) {
  FirebaseRef.child('events/').push({
    id: FirebaseRef.child('events/').push().key,
    slug: title.replace(/\s/g, '-'),
    title,
    body,
    author,
    category,
    image,
    info,
    details,
  }).catch((e) => {
    console.log(e);
  });
}

class CreateNewEvent extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      userName: PropTypes.string,
    }),
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      details: '',
      info: '',
      category: 0,
      imageurl: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { member } = this.props;
    const {
      title,
      body,
      details,
      info,
      imageurl,
      category,
    } = this.state;

    return (
      <div>
        <Row>
          <Col sm="12">
            <Link className="btn btn-primary" to="/">
              <i className="icon-arrow-left" />
              {' Back'}
            </Link>
          </Col>
          <Col>
            <Card style={{ backgroundColor: '#606060', top: 25 }}>
              <CardHeader style={{ backgroundColor: 'black' }}> Create a new event </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="title"> title </Label>
                    <Input
                      className="text-area"
                      type="title"
                      name="title"
                      id="title"
                      placeholder="...enter a title..."
                      value={title}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="imageurl"> image </Label>
                    <Input
                      className="text-area"
                      type="imageurl"
                      name="imageurl"
                      id="imageurl"
                      placeholder="...enter image url.."
                      value={imageurl}
                      onChange={this.handleChange}
                    />
                    <FormGroup style={imageurl ? { height: '100', width: '100%', marginTop: 15 } : { marginTop: 15 }}>
                      <CardImg style={imageurl ? { height: '25%', width: '25%' } : { }} top src={imageurl} alt="" />
                    </FormGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="body"> Body </Label>
                    <Input
                      className="text-area"
                      type="textarea"
                      rows="10"
                      name="body"
                      id="body"
                      placeholder="...enter a body..."
                      value={body}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="details"> details </Label>
                    <Input
                      className="text-area"
                      type="textarea"
                      rows="4"
                      name="details"
                      id="details"
                      placeholder="...enter details..."
                      value={details}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="info"> info </Label>
                    <Input
                      className="text-area"
                      type="textarea"
                      rows="2"
                      name="info"
                      id="info"
                      placeholder="...enter info ..."
                      value={info}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button onClick={() => {
                  MakeEvent(title, body, member.userName, category, imageurl, info, details);
                }}
                  color="primary"> Submit new event</Button>
                  </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateNewEvent;
