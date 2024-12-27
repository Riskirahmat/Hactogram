import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Photos = () => {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("http://localhost:3001/users");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        setUser(userData);

        const photosResponse = await fetch("http://localhost:3001/photos");
        if (!photosResponse.ok) {
          throw new Error("Failed to fetch photos");
        }
        const photosData = await photosResponse.json();
        const userPhotos = photosData.filter(
          (photo) => photo.userId === userData.id
        );
        setPhotos(userPhotos);
      } catch (error) {
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

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        className="photo-page" // Updated class name to match test expectations
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
        className="photo-page" // Updated class name to match test expectations
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
      className="photo-page" // Updated class name to match test expectations
      display="flex"
      flexDirection="column"
      p={4}
      bg="gray.100"
    >
      {user && (
        <Box bg="white" p={4} rounded="md" boxShadow="lg" mb={4}>
          <Flex alignItems="center">
            <Image
              src={user.profilePic}
              alt={`${user.fullname}'s Profile Picture`}
              borderRadius="full"
              boxSize="100px"
              mr={4}
              loading="lazy"
            />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {user.fullname}
              </Text>
              <Text fontSize="md" color="gray.500">
                @{user.username}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {user.desc}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {photos.length} Posts
              </Text>
            </Box>
          </Flex>
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {photos.map((photo) => (
          <Box
            key={photo.id}
            className={loading ? "photo-loading-template" : ""} // Loading template class
            bg="white"
            p={2}
            rounded="md"
            boxShadow="lg"
            mb={4}
            mr={4}
            width="calc(33.333% - 16px)"
            cursor="pointer"
            onClick={() => navigate(`/photo/${photo.id}`)}
          >
            <Image
              src={photo.url}
              alt={photo.caption}
              borderRadius="md"
              width="100%"
              height="auto"
              data-testid={`test-image-${photo.id}`}
            />
          </Box>
        ))}
        {photos.length === 0 && (
          <Box bg="white" p={4} rounded="md" boxShadow="lg" mb={4} width="100%">
            <Text textAlign="center" color="gray.500">
              No photos available
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Photos;
