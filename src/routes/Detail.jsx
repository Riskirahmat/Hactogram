import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Text, Button, VStack, Container } from "@chakra-ui/react";

function Detail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await fetch(`http://localhost:3001/photos/${id}`);
      const data = await response.json();
      setPhoto(data);
    };
    fetchPhoto();
  }, [id]);

const handleDelete = async () => {
  await fetch(`http://localhost:3001/photos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", 
    },
  });
  navigate("/");
};

  if (!photo) return <Text>Loading...</Text>;

  return (
    <Container className="detail-photo-page" centerContent>
      <VStack spacing={4}>
        <Image src={photo.url} alt={photo.caption} />
        <Text>{photo.caption}</Text>
        <Button data-testid="delete-button" onClick={handleDelete}>
          Delete
        </Button>
      </VStack>
    </Container>
  );
}

export default Detail;
