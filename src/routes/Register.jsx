import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Divider,
  AbsoluteCenter,
  Box,
} from "@chakra-ui/react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          fullname,
          desc,
          profilePic,
        }),
      });
      const data = await response.json();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        padding={2}
        minWidth={"944px"}
        height={"full"}
        alignContent={"center"}
        className="register-page"
      >
        <form onSubmit={handleRegister}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="@jhon"
              onChange={(e) => setUsername(e.target.value)}
              required
              data-testid="username"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Use at least 8 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="password"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fullname</FormLabel>
            <Input
              placeholder="Jhon Doe"
              onChange={(e) => setFullname(e.target.value)}
              required
              data-testid="fullname"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Tell us about you"
              onChange={(e) => setDesc(e.target.value)}
              data-testid="description"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              placeholder="Photo URL here ..."
              onChange={(e) => setProfilePic(e.target.value)}
              required
              data-testid="profile-picture"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            variant="solid"
            type="submit"
            width="full"
            mt={4}
            data-testid="register-button"
          >
            Register
          </Button>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="transparent" px="4">
              Already have an account?
            </AbsoluteCenter>
          </Box>
          <Button
            width="full"
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate("/signin")}
            data-testid="signin-button"
          >
            Sign In
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Register;
