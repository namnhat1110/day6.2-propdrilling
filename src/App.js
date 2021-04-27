import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  Form,
  Card,
  Button,
  Navbar,
  Container,
  ListGroup,
  FormControl,
  ListGroupItem,
} from "react-bootstrap";

import Modal from "react-modal";
import DarkModeToggle from "react-dark-mode-toggle";
import "./App.css";

import { COMMENTS } from './utils'

const Avatar = (props) => {
  return (
    <img
      alt="profile"
      className="rounded-circle"
      style={{ height: 50, width: 50 }}
      src={
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      }
    />
  );
};

const DarkmodeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
  )
}

const PostForm = (props) => {
  return (
    <Form inline className="d-flex align-items-center">
      <Form.Control
        type="text"
        className="mr-3"
        style={{ width: '90%' }}
        placeholder={"What's on your mind, " + props.currentUser.email + "?"}
      />
      <Button variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
}

const CommentForm = (props) => {
  return (
    <Form inline>
      <Form.Control type="text" placeholder={"What's on your mind, " + props.currentUser.email + "?"} className="w-75 mr-3" />
      <Button variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
}

const Comment = ({ body, user }) => {
  return (
    <ListGroupItem className="d-flex flex-row align-items-center border-bottom-0 pr-0 py-0">
      <Avatar url={user.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{user.name}</div>
          <p>{body}</p>
        </div>
      </div>
      <hr />
    </ListGroupItem>
  );
};

const Comments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush py-3">
        {props.comments.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

const Post = (props) => {
  return (
    <Card style={{ width: "100%", padding: "1%" }}>
      <Card.Title>PrimeTimeTran</Card.Title>
      <p>
        1. Make it so when we sign in the text inside the form says 'Whats on
        your mind email'
      </p>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
      />
      <Card.Body>
        <Comments comments={COMMENTS} />
        <CommentForm currentUser={props.currentUser} />
      </Card.Body>
    </Card>
  );
}

const Navbarr = (props) => {
  const [email, setEmail] = useState('')
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Prop Drilling</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        {props.currentUser.email ? (
          < Button
            variant="outline-danger"
            onClick={props.onSignout}
          >
            Sign Out - {props.currentUser.email}
          </Button>
        ) : (
          <Form inline onSubmit={(e) => props.onSignIn(e, email)}>
            <FormControl
              type="text"
              placeholder="Email"
              className="mr-sm-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button
              type="submit"
              variant="outline-success"
              onClick={(e) => props.onSignIn(e, email)}
            >
              Sign In
          </Button>
            <DarkmodeToggle />
          </Form>
        )}

      </Navbar.Collapse>
    </Navbar >
  );
};



const Friends = () => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Friends
    </div>
  );
}
const Photos = () => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Photos
    </div>
  );
}

const Hobbies = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Hobbies
      <button className="w-25" onClick={props.openModal}>Add Hobbies</button>
    </div>
  );
};
const Intro = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Introduction
      <button className="w-25" onClick={props.openModal}>Edit Details</button>
    </div>
  );
};

const Left = (props) => {
  const [open, setOpen] = React.useState(false);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <Intro openModal={openModal} />
      <Hobbies openModal={openModal} />
      <Photos />
      <Friends />
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>Change my email!</div>
        <form>
          <input onChange={props.updateEmail} />
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </Col>
  );
}

const Right = (props) => {
  return (
    <Col className="d-flex align-items-center justify-content-center">
      <Post currentUser={props.currentUser} />
    </Col>
  )
}

const Main = (props) => {
  return (
    <Container className="border pt-5 mt-5">
      <Row className="mb-5">
        <Col>
          <PostForm currentUser={props.currentUser} />
        </Col>
      </Row>
      <Row>
        <Left updateEmail={props.updateEmail} />

        <Right currentUser={props.currentUser} />
      </Row>
    </Container>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState({ email: "" });

  const onSignIn = (e, email) => {
    e.preventDefault()
    setCurrentUser({ email: email })
  }

  const onSignout = () => {
    setCurrentUser({ email: "" })
  }

  const updateEmail = (e) => {
    e.preventDefault();
    setCurrentUser({ email: e.target.value });
  };

  return (
    <div className="main">
      <Navbarr
        currentUser={currentUser}
        onSignIn={onSignIn}
        onSignout={onSignout}
      />
      <Main currentUser={currentUser} updateEmail={updateEmail} />
    </div>
  );
}

export default App;
