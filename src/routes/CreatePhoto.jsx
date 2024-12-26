import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePhoto = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi input
    if (!photoUrl || !caption) {
      setError("All fields are required");
      toast({
        title: "Validation Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not authenticated");
      toast({
        title: "Authentication Error",
        description: "User not authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/signin");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: photoUrl,
          caption,
          userId,
        }),
      });

      // Periksa apakah respons valid
      if (!response.ok) {
        const errorData = await response.json(); // Ambil data error dari respons
        throw new Error(errorData.message || "Failed to create photo");
      }

      const newPhoto = await response.json();
      const photoId = newPhoto.id; // Mengakses ID dari respons
      toast({
        title: "Photo Uploaded",
        description: `Photo "${newPhoto.caption}" has been uploaded successfully with ID: ${photoId}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error during photo upload:", error);
      setError("An error occurred. Please try again later.");
      toast({
        title: "Upload Error",
        description:
          error.message || "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      className="create-photo-page"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Box bg="white" p={6} rounded="md" boxShadow="lg" width="400px">
        <Heading mb={4} textAlign="center" fontSize="2xl">
          Create Photo
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            data-testid="photo-url"
            type="text"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            mb={3}
            variant="filled"
          />
          <Textarea
            data-testid="caption"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            mb={3}
            variant="filled"
          />
          {error && (
            <Text color="red.500" mb={3}>
              {error}
            </Text>
          )}
          <Button
            data-testid="upload-button"
            type="submit"
            colorScheme="green"
            width="full"
          >
            Upload
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePhoto;
