import { Box, Container, Typography, Button, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([{ id: 1 }]);

  const getData = () => {
    axios
      .get("http://localhost:9000/users")
      .then((u) => setUsers(u.data))
      .catch((error) => alert(error));
  };
  const makeAdmin = (admin) => {
    const updatedAdmin = { ...admin, role: "admin" };
    axios({
      method: "put",
      url: `http://localhost:9000/users/${admin.id}`,
      data: updatedAdmin,
    });
    getData();
  };
  const removeAdmin = (admin) => {
    const updatedAdmin = { ...admin, role: "member" };
    axios({
      method: "put",
      url: `http://localhost:9000/users/${admin.id}`,
      data: updatedAdmin,
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = (user) => {
    Swal.fire({
      title: `Are you sure to delete (${user.username}) ?`,
      imageUrl: user.image,
      icon: "warning",
      iconColor: "red",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: user.name,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `http://localhost:9000/users/${user.id}`,
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getData();
      }
    });
  };
  return (
    <Container>
      <Typography variant="h3" color="initial" textAlign={"center"}>
        Users
      </Typography>
      <Box>
        <Link to="users/adduser">
          <Button
            variant="contained"
            color="success"
            className="text-white my-4"
          >
            Add New User
          </Button>
        </Link>
        <Box>
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="text-center  shadow"
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody className="bg-[#212529f2] align-middle">
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user?.username}</td>
                    <td>{user?.role}</td>
                    <td
                      className="flex justify-around"
                      style={{ padding: "1rem" }}
                    >
                      <Link to={`users/viewuser/${user.id}`}>
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ color: "#fff" }}
                        >
                          View
                        </Button>
                      </Link>
                      <Link to={`users/edituser/${user.id}`}>
                        {" "}
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ color: "#fff" }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteUser(user)}
                      >
                        Delete
                      </Button>
                      {user.role === "admin" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ color: "#fff" }}
                          onClick={() => removeAdmin(user)}
                        >
                          Remove Admin
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ color: "#fff" }}
                          onClick={() => makeAdmin(user)}
                        >
                          Make Admin
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default Users;
