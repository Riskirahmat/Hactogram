import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, VStack, Container } from "@chakra-ui/react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Melakukan fetch untuk mendapatkan data pengguna
      const response = await fetch("http://localhost:3001/users");

      // Check if the response is valid
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json(); // Parse the JSON response
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      // Jika pengguna ditemukan, simpan di localStorage dan arahkan ke halaman beranda
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        // Jika kredensial salah, tampilkan alert
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error signing in. Please try again later.");
    }
  };

  return (
    <Container className="signin-page" centerContent>
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
        <Button data-testid="signin-button" onClick={handleSignIn}>
          Sign In
        </Button>
        <Button
          data-testid="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </VStack>
    </Container>
  );
}

export default SignIn;
