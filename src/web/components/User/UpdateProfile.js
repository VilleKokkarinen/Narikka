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

class UpdateProfile extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      userName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: props.member.userName || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.setState({ [e.target.name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onFormSubmit } = this.props;

    onFormSubmit(this.state).catch(() => {});
  }

  render() {
    const { loading, success, error } = this.props;
    const {
      userName, changeEmail, email, changePassword, password, password2,
    } = this.state;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card className="profile">
              <CardHeader className="header">Update Profile</CardHeader>
              <CardBody>
                {!!error && <Alert color="danger">{error}</Alert>}
                {!!success && <Alert color="success">{success}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="userName" style={{ margin: 0 }}>
                      {'Username'}
                    </Label>
                    <Input
                      className="text"
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="John"
                      value={userName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup check style={{ marginTop: 20, marginBottom: 10 }}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="changeEmail"
                        checked={changeEmail}
                        onChange={this.handleChange}
                      />
                      {' Change my email '}
                    </Label>
                  </FormGroup>
                  {changeEmail && (
                    <FormGroup>
                      <Label for="email" style={{ margin: 0 }}>
                        {'New Email address'}
                      </Label>
                      <Input
                        className="text"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john@doe.corp"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  )}
                  <FormGroup check style={{ marginTop: 20, marginBottom: 10 }}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="changePassword"
                        checked={changePassword}
                        onChange={this.handleChange}
                      />
                      {' Change my password '}
                    </Label>
                  </FormGroup>
                  {changePassword && (
                    <div>
                      <FormGroup>
                        <Label for="password" style={{ margin: 0 }}>
                          {' New password'}
                        </Label>
                        <Input
                          className="text"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password2" style={{ margin: 0 }}>
                          {'Confirm Password'}
                        </Label>
                        <Input
                          className="text"
                          type="password"
                          name="password2"
                          id="password2"
                          placeholder="••••••••"
                          value={password2}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                  )}
                  <Button style={{ marginTop: 20 }} color="primary" disabled={loading}>
                    {loading ? 'Loading' : 'Update Profile'}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateProfile;
