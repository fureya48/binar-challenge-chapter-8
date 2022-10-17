import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container, Button, Form, Input } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../lib/api";
import "../style/Login.css";

function Dashboard() {
  const [players, setPlayers] = useState([]);
  const usernameRef = useRef();
  const emailRef = useRef();
  const expRef = useRef();
  const lvlRef = useRef();

  const getPlayers = async () => {
    try {
      const data = await axios.get("/api/players");
      setPlayers(data.data.result);
    } catch (err) {}
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/players/" + id);
      getPlayers();
      alert("Delete success!");
    } catch (error) {}
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const experience = expRef.current.value;
    const lvl = lvlRef.current.value;

    const data = await axios.get(`/api/players?username=${username}&email=${email}&experience=${experience}&lvl=${lvl}`)
    setPlayers(data.data.result);
  };

  useState(() => {
    getPlayers();
  }, []);

  return (
    <div className="Dashboard pt-5">
      <Container fluid="md">
        <div>
          <Link to={"/create"}>
            <Button className="mb-3" color="warning">
              Create Player
            </Button>
          </Link>
          <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Input innerRef={usernameRef} name="username" placeholder="username" bsSize="sm" type="text" />
            <Input innerRef={emailRef} name="email" placeholder="email" bsSize="sm" type="email" />
            <Input innerRef={expRef} name="experience" placeholder="experience" bsSize="sm" type="number" />
            <Input innerRef={lvlRef} name="lvl" placeholder="lvl" bsSize="sm" type="number" />
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </Form>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {players &&
              players.map((player, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.username}</td>
                  <td>{player.email}</td>
                  <td>{player.experience}</td>
                  <td>{player.lvl}</td>
                  <td className="d-flex">
                    <Link to={"/edit/" + player.id} className="mr-3">
                      <FaEdit color="orange" size="1.5rem" />
                    </Link>
                    <Button
                      onClick={() => {
                        if (window.confirm("Are you sure?")) handleDelete(player.id);
                      }}
                      color="none"
                    >
                      <MdDelete color="red" size="1.5rem" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Dashboard;
