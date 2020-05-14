import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/Templates/Nothing';
import TemplateSidebar from '../components/Templates/Sidebar';

// Routes
import Home from '../components/Home';

import EventsContainer from '../../containers/Events';
import EventListingComponent from '../components/Event/Listing';
import EventSingleComponent from '../components/Event/Single';

import ChatContainer from '../../containers/Chat';
import ChatListingComponent from '../components/Chat/Listing';
import ChatSingleComponent from '../components/Chat/Single';

import MembersContainer from '../../containers/Members';
import MemberListingComponent from '../components/Member/Listing';
import MemberSingleComponent from '../components/Member/Single';

import CreateEventComponent from '../components/Event/Create';
import CreateEventContainer from '../../containers/CreateEvent';

import NewChatComponent from '../components/Chat/NewChat';
import NewChatContainer from '../../containers/NewChat';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/User/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/User/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/User/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/User/UpdateProfile';

import Error from '../components/UI/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateSidebar>
          <Home {...props} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing pageTitle="Sign Up">
          <SignUpContainer {...props} Layout={SignUpComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateNothing pageTitle="Login">
          <LoginContainer {...props} Layout={LoginComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing pageTitle="Forgot Password">
          <ForgotPasswordContainer {...props} Layout={ForgotPasswordComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar pageTitle="Update Profile">
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/newchat"
      render={props => (
        <TemplateSidebar pageTitle="Send a message">
          <NewChatContainer {...props} Layout={NewChatComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/events"
      render={props => (
        <TemplateSidebar pageTitle="Events">
          <EventsContainer {...props} Layout={EventListingComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/event/:id"
      render={props => (
        <TemplateSidebar pageTitle="Event View">
          <EventsContainer {...props} Layout={EventSingleComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/create-event"
      render={props => (
        <TemplateSidebar pageTitle="Create a Event">
          <CreateEventContainer {...props} Layout={CreateEventComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/members"
      render={props => (
        <TemplateSidebar pageTitle="Members">
          <MembersContainer {...props} Layout={MemberListingComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/member/:id"
      render={props => (
        <TemplateSidebar pageTitle="Member View">
          <MembersContainer {...props} Layout={MemberSingleComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/chats"
      render={props => (
        <TemplateSidebar pageTitle="Chats">
          <ChatContainer {...props} Layout={ChatListingComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/chat/:id"
      render={props => (
        <TemplateSidebar pageTitle="Chat View">
          <ChatContainer {...props} Layout={ChatSingleComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      render={props => (
        <TemplateSidebar pageTitle="404 - Page not found">
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />
  </Switch>
);

export default Index;
