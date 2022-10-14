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
  const passwordRef = useRef();
  const expRef = useRef();

  // const getPlayer = async () => {
  //   try {
  //     const data = await axios.get("/api/players/")
  //   } catch (error) {
      
  //   }
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      exp: expRef.current.value,
    };

    axios
      .post("/api/players", payload)
      .then((res) => {
        resetValue();
        alert("Success");
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
    passwordRef.current.value = null;
    expRef.current.value = null;
  };
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
