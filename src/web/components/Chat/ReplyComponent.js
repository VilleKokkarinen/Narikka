import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Form,
  Input,
  Button,
  CardBody,
  FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';

class ReplyComponent extends React.Component {
  static propTypes = {
    handleCounter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      reply: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  OnSubmit = () => {
    const { handleCounter } = this.props;
    const { reply } = this.state;
    handleCounter(reply);
    this.setState({ reply: '' });
  }

  render() {
    const {
      reply,
    } = this.state;

    return (
      <Card className="reply-card">
        <CardBody>
          <Form>
            <FormGroup>
              <Input
                className="text-area"
                type="textarea"
                rows="10"
                name="reply"
                id="reply"
                placeholder="...enter a body..."
                value={reply}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button onClick={() => { this.OnSubmit(); }} color="primary">
              {'Reply to conversation'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  reply: state.reply || '',
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComponent);
