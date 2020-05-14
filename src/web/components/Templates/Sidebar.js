import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import HeaderContainer from '../UI/HeaderContainer';
import Header from '../UI/Header';
import Footer from '../UI/Footer';
import { Sidebar, SidebarNavItems } from '../UI/Sidebar';

const Template = ({ pageTitle, children, props }) => (
  <div>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>

    <HeaderContainer {...props} Layout={Header} Items={SidebarNavItems()} />
    <Container fluid>
      <Row>
        <Sidebar />
        <Col className="SideBarTemplateCol">
          {children}
          <Footer />
        </Col>
      </Row>
    </Container>
  </div>
);

Template.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Template.defaultProps = {
  pageTitle: 'React App',
};

export default Template;
