import React from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import TopMenu from './TopMenu'

import db from "./firebase"
import { collection, query, getDocs } from "firebase/firestore";
import { Navigate } from 'react-router-dom';

import Toast from './Toast'

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      authenticated: false,
      failed: false,
    };
  }


  loginUser = async () => {
    const first = query(
      collection(db, "users"),
    );
    const snapshot = await getDocs(first);
    var users = snapshot.docs.map(doc => doc.data());

    users.forEach(user => {

      if (this.state.email === user.email) {
        if (this.state.password === user.password) {

          this.setState({
            authenticated: true
          });
          return
        }
      }

      this.setState({
        password: "",
        failed: true
      });

    });
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    if (this.state.authenticated) {
      return <Navigate to='/' />;
    }

    return (
      <div>
        <TopMenu/>
        <Grid textAlign='center' style={{ height: '800px' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment textAlign='left'>
                <a style={{ textAlign: "right"}} href='/signup'>Sign Up</a>
                <br />
                Your email
                <Form.Input fluid onChange={this.updateInput} value={this.state.email} name="email" />
                Your password
                <Form.Input fluid type='password' onChange={this.updateInput} value={this.state.password} name="password"
                />
                <Button primary fluid onClick={this.loginUser}>
                  Login
                </Button>
              </Segment>
              {this.state.failed && <Toast />}
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
export default Login
