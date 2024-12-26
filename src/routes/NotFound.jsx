import React from "react";
import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      className="not-found-page"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Flex
        direction="column"
        alignItems="center"
        p={6}
        bg="white"
        rounded="md"
        boxShadow="lg"
        width="300px"
      >
        <Heading mb={4} fontSize="3xl" color="red.500">
          404 Not Found
        </Heading>
        <Text mb={6} fontSize="lg" color="gray.600">
          The page you are looking for does not exist.
        </Text>
        <Button data-testid="back" colorScheme="blue" onClick={handleBack}>
          Go Back
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFound;
