import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Box, VStack, Container, Heading } from "@chakra-ui/react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <Container maxW="container.lg" display="flex" flexDirection="row">
      <Box w="250px" bg="gray.100" p={4} borderRadius="md">
        <VStack spacing={4} align="stretch">
          <Button data-testid="home-button" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button
            data-testid="create-button"
            onClick={() => navigate("/create")}
          >
            Create
          </Button>
          <Button
            data-testid="logout-button"
            colorScheme="red"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </VStack>
      </Box>
      <Box flex="1" p={4}>
        <Heading size="lg" mb={4}>
          Welcome to Hacktogram
        </Heading>
        <Outlet />
      </Box>
    </Container>
  );
}

export default Home;
