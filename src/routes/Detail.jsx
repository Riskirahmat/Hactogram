import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        const photoResponse = await fetch(`http://localhost:3001/photos/${id}`);
        if (!photoResponse.ok) {
          throw new Error("Failed to fetch photo data");
        }
        const photoData = await photoResponse.json();
        setPhoto(photoData);

        const userResponse = await fetch(
          `http://localhost:3001/users/${photoData.userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        toast({
          title: "Fetch Error",
          description: "Failed to fetch data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoData();
  }, [id, navigate, toast]);

  const handleDeletePhoto = async () => {
    try {
      const response = await fetch(`http://localhost:3001/photos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      toast({
        title: "Photo Deleted",
        description: "The photo has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting photo:", error);
      setError("Failed to delete photo");
      toast({
        title: "Delete Error",
        description: "Failed to delete photo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box
        className="detail-photo-page"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.100"
      >
        <Flex direction="column" alignItems="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>Loading...</Text>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className="detail-photo-page"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.100"
      >
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      className="detail-photo-page"
      display="flex"
      flexDirection="column"
      p={4}
      bg="gray.100"
    >
      <Box bg="white" p={4} rounded="md" boxShadow="lg" mb={4}>
        <Flex alignItems="center">
          <Image
            src={user.profilePic}
            alt={`${user.fullname}'s Profile Picture`}
            borderRadius="full"
            boxSize="100px"
            mr={4}
          />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {user.fullname}
            </Text>
            <Text fontSize="md" color="gray.500">
              @{user.username}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box bg="white" p={4} rounded="md" boxShadow="lg" mb={4}>
        <Image
          src={photo.url}
          alt={photo.caption}
          borderRadius="md"
          width="100%"
          height="auto"
        />
        <Text fontSize="lg" fontWeight="bold" mt={4}>
          {photo.caption}
        </Text>
      </Box>

      <Box textAlign="center">
        <Button
          data-testid="delete-button"
          colorScheme="red"
          onClick={handleDeletePhoto}
        >
          Delete Photo
        </Button>
      </Box>
    </Box>
  );
};

export default Detail;
