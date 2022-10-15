import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container, Button } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "../lib/api";
import "../style/Login.css";

function Dashboard() {
  const [players, setPlayers] = useState([]);
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

  useState(() => {
    getPlayers();
  });

  return (
    <div className="Dashboard pt-5">
      <Container fluid="md">
        <div>
          <Link to={"/create"}>
            <Button className="mb-3" color="warning">
              Create Player
            </Button>
          </Link>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
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
                    <Button onClick={() => {if(window.confirm("Are you sure?")) handleDelete(player.id)}} color="none">
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
