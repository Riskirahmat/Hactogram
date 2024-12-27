import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, VStack, Container } from "@chakra-ui/react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        fullname,
        desc: description,
        profilePic: profilePicture,
      }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <Container className="register-page" centerContent>
      <VStack spacing={4}>
        <Input
          data-testid="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          data-testid="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          data-testid="fullname"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          data-testid="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          data-testid="profile-picture"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <Button data-testid="register-button" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Container>
  );
}

export default Register;
