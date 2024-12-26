import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("userId", user.id);
        toast({
          title: "Login Successful",
          description: `Welcome, ${user.fullname}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
        console.log(navigate);
      } else {
        setError("Invalid Username or Password");
        toast({
          title: "Login Failed",
          description: "Invalid Username or Password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      className="signin-page"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Flex
        direction="column"
        p={6}
        bg="white"
        rounded="md"
        boxShadow="lg"
        width="300px"
      >
        <Heading mb={4} textAlign="center" fontSize="2xl">
          Sign In
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            data-testid="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mb={3}
            variant="filled"
          />
          <Input
            data-testid="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={3}
            variant="filled"
          />
          {error && (
            <Text color="red.500" mb={3}>
              {error}
            </Text>
          )}
          <Button
            data-testid="signin-button"
            type="submit"
            colorScheme="blue"
            mb={3}
            width="full"
          >
            Sign In
          </Button>
          <Button
            data-testid="register-button"
            colorScheme="green"
            width="full"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </form>
      </Flex>
    </Box>
  );
};

export default SignIn;
