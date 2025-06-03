import React, { useState, useRef } from 'react';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';

const AudioPlayer = ({ audioUrl, loading, error }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'synthesized-speech.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h3>Audio Player</h3>
      </Card.Header>
      <Card.Body>
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Generating speech...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            Error: {error}
          </Alert>
        )}

        {audioUrl && !loading && (
          <div>
            <audio 
              ref={audioRef}
              src={audioUrl}
              onEnded={handleEnded}
              className="w-100 mb-3"
              controls
            />
            
            <div className="d-flex justify-content-between">
              <Button 
                variant={isPlaying ? "secondary" : "primary"} 
                onClick={handlePlay}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              
              <Button 
                variant="success" 
                onClick={handleDownload}
              >
                Download MP3
              </Button>
            </div>
          </div>
        )}

        {!audioUrl && !loading && !error && (
          <div className="text-center text-muted my-4">
            <p>No audio available. Enter text and click "Synthesize Speech" to generate audio.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AudioPlayer;