import React from 'react'
import { Button, Form, Grid, Input, Header, Segment } from 'semantic-ui-react'
import TopMenu from './TopMenu'

import db from "./firebase"
import { addDoc, collection } from 'firebase/firestore'

import { Navigate } from 'react-router-dom';


class Signup extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      redirect: false
    };
  }

  signup = async () => {
    const collectionRef = collection(db, 'users');

    const payload = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    }

    await addDoc(collectionRef, payload);

    this.setState({
      redirect: true
    });

    alert("Sign up successfully!");
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to='/login' />;
    }

    return (
      <div>
        <TopMenu/>
        <Grid textAlign='center' style={{ height: '800px' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment textAlign='left'>
                <Header size='medium' color="blue">Create a DEV@Deakin Account</Header>
                <Form.Field inline required>
                  <label>Name</label>
                  <Input fluid name="name" placeholder='Name' onChange={this.updateInput} value={this.state.name} />
                </Form.Field>
                <Form.Field inline required>
                  <label>Last Name</label>
                  <Input fluid name="lastname" placeholder='Last Name' onChange={this.updateInput} value={this.state.name} />
                </Form.Field>
                <Form.Field inline required>
                  <label>Email</label>
                  <Input fluid name="email" placeholder='Email' onChange={this.updateInput} value={this.state.email} />
                </Form.Field>
                <Form.Field inline required>
                  <label>Password</label>
                  <Input fluid name="password" placeholder='Password' type='password' onChange={this.updateInput} value={this.state.password} />
                </Form.Field>
                <Button primary fluid onClick={this.signup}>
                  Create
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
}
export default Signup