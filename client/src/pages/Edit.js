import "../style/Login.css";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import axios from "../lib/api";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const {playerID} = useParams()
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const expRef = useRef();

  const getPlayer = async () => {
    try {
      const data = await axios.get("/api/players/" + playerID)
      const {
        username,
        email,
        experience
      } = data.data.message

      usernameRef.current.value = username
      emailRef.current.value = email
      expRef.current.value = experience

    } catch (error) {
      console.log(error )
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      exp: expRef.current.value,
    };

    axios
      .put("/api/players/" + playerID, payload)
      .then((res) => {
        resetValue();
        alert("Updated Success");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        resetValue();
        alert(err.response.data.message);
      });
  };

  const resetValue = () => {
    usernameRef.current.value = null;
    emailRef.current.value = null;
    expRef.current.value = null;
  };

  useEffect(()=>{
    getPlayer()
  })

  return (
    <div className="App">
      <Container className="form" fluid="md">
        <h1 className="text-center">Edit Player</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input innerRef={usernameRef} name="username" type="text" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input innerRef={emailRef} id="exampleEmail" name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <Label>Experience</Label>
            <Input innerRef={expRef} name="exp" type="number" />
          </FormGroup>
          <Button className="mr-2" type="submit" color="warning">
            Submit
          </Button>
          <Button type="reset">Reset</Button>
        </Form>
      </Container>
    </div>
  );
}

export default Edit;
