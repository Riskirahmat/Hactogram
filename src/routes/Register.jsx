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

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !username ||
      !password ||
      !fullname ||
      !description ||
      !profilePicture
    ) {
      setError("All fields are required");
      toast({
        title: "Registration Failed",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          fullname,
          desc: description,
          profilePic: profilePicture,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const user = await response.json();
      localStorage.setItem("userId", user.id);
      toast({
        title: "Registration Successful",
        description: `Welcome, ${user.fullname}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later.");
      toast({
        title: "Registration Failed",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      className="register-page"
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
          Register
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
          <Input
            data-testid="fullname"
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            mb={3}
            variant="filled"
          />
          <Input
            data-testid="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb={3}
            variant="filled"
          />
          <Input
            data-testid="profile-picture"
            type="text"
            placeholder="Profile Picture URL"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            mb={3}
            variant="filled"
          />
          {error && (
            <Text color="red.500" mb={3}>
              {error}
            </Text>
          )}
          <Button
            data-testid="register-button"
            type="submit"
            colorScheme="green"
            mb={3}
            width="full"
          >
            Register
          </Button>
          <Button
            data-testid="signin-button"
            colorScheme="blue"
            width="full"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </form>
      </Flex>
    </Box>
  );
};

export default Register;
