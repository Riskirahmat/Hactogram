import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  AbsoluteCenter,
} from "@chakra-ui/react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();

      const userData = data.filter((obj) => obj.username === username);

      if (
        data.some(
          (user) => user.username === username && user.password === password
        )
      ) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            id: userData[0].id,
            fullname: userData[0].fullname,
            desc: userData[0].desc,
            profilePic: userData[0].profilePic,
          })
        );
        navigate("/");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="signin-page" centerContent>
      <form onSubmit={handleSignIn}>
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input
            data-testid="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            data-testid="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button type="submit" data-testid="signin-button">
          Sign In
        </Button>
        <Box position="relative" padding="10">
          <AbsoluteCenter bg="transparent" px="4">
            Don't have an account?
          </AbsoluteCenter>
        </Box>
        <Button
          data-testid="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}

export default SignIn;
