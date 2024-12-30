import { SimpleGrid, Image, Text, Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PhotosTemplate = () => {
  return (
    <SimpleGrid columns={3} spacing={1}>
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          boxSize={"308px"}
          bgColor={"gray.100"}
          className="photo-loading-template"
        />
      ))}
    </SimpleGrid>
  );
};

const Photos = () => {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadPhotos = async (userData) => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/photos?userId=" + userData.id
      );
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    loadPhotos(userData);
  }, []);

  return (
    <Box
      className="photo-page"
      display="flex"
      flexDirection="column"
      p={4}
      bg="gray.100"
    >
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
            {user.username}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {user.desc}
          </Text>
          <Text fontSize="sm" color="gray.600">
            <span style={{ fontWeight: "bold" }}>{photos.length}</span>{" "}
            {photos.length > 1 ? "Posts" : "Post"}
          </Text>
        </Box>
      </Flex>
      {loading ? (
        <PhotosTemplate />
      ) : (
        <SimpleGrid columns={3} spacing={1}>
          {photos.map((photo) => (
            <Box
              key={photo.id}
              cursor="pointer"
              onClick={() => navigate(`/photo/${photo.id}`)}
            >
              <Image
                boxSize={"308px"}
                src={photo.url}
                alt={photo.caption}
                height="auto"
                data-testid={`test-image-${photo.id}`}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Photos;
