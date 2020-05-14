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
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;
    onFormSubmit(this.state)
      .then(() => history.push('/login'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { error } = this.props;
    const {
      userName,
      email,
      password,
      password2,
    } = this.state;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                Sign Up
              </CardHeader>
              <CardBody>
                {!!error && (
                  <Alert color="danger">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="john@doe.corp"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userName">
                      UserName
                    </Label>
                    <Input
                      type="username"
                      name="userName"
                      id="userName"
                      placeholder="John"
                      value={userName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password2">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      value={password2}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button color="primary">
                    Sign Up!
                  </Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="12">
                    Already have an account?
                    <Link to="/login">
                      Login
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SignUp);
