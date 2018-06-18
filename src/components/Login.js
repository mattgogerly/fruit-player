import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Button, Alert } from 'reactstrap';
import './css/Login.css'

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col m="12" md={{ size: 6, offset: 3 }}>
            <Jumbotron className="jumbo">
              <h1 className="display-3">Hi there!</h1>
              <p className="lead">Fruit Player is a web player for Apple Music built with React and Apple MusicKit.</p>
              <hr className="my-2" />
              <p>It&apos;s currently under development as a side project by <a href="https://github.com/mattgogerly">Matt Gogerly</a>,
              a student at the University of Southampton. Please expect there to be bugs
              aplenty; please raise anything you find as an <a href="TODO">issue on GitHub</a>.</p>

              <p className="mt-5 mb-5 text-center">
                <Button outline color="info" size="lg" block onClick={this.props.onAuthorize}>Sign in to Apple Music</Button>
              </p>

              <Alert color="warning">
                <h5 className="alert-heading">Beware!</h5>
                MusicKit is an Apple API that is still in BETA. Features
                may stop working at any time.
              </Alert>

              <p className="text-muted text-center disclaimer mt-5 mb-0">
                Apple and Apple Music are trademarks of Apple Inc., registered in the U.S. and other countries.
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login;
