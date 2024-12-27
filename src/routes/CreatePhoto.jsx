import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, VStack, Container } from "@chakra-ui/react";

function CreatePhoto() {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    await fetch("http://localhost:3001/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        caption,
        userId: user.id,
      }),
    });
    navigate("/");
  };

  return (
    <Container className="create-photo-page" centerContent>
      <VStack spacing={4}>
        <Input
          data-testid="photo-url"
          placeholder="Photo URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Input
          data-testid="caption"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button data-testid="upload-button" onClick={handleUpload}>
          Upload
        </Button>
      </VStack>
    </Container>
  );
}

export default CreatePhoto;
