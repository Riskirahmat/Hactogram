import React, { useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useNavigate, Outlet, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logout Successful",
      description: "You have been logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/signin");
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Box display="flex" height="100vh">
      <Box bg="gray.200" p={4} width="200px" borderRight="1px solid gray.300">
        <Button
          as={Link}
          to="/"
          data-testid="home-button"
          colorScheme="blue"
          mb={3}
          width="full"
        >
          Home
        </Button>
        <Button
          as={Link}
          to="/create/"
          data-testid="create-button"
          colorScheme="green"
          mb={3}
          width="full"
        >
          Create
        </Button>
        <Button
          data-testid="logout-button"
          colorScheme="red"
          width="full"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
      <Box flex={1} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
