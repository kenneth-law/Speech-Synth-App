import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import ApiKeyManager from './components/ApiKeyManager';
import SpeechPreferences from './components/SpeechPreferences';
import TextInput from './components/TextInput';
import AudioPlayer from './components/AudioPlayer';

// Services
import TextToSpeechService from './services/TextToSpeechService';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [preferences, setPreferences] = useState({
    language: 'en-US',
    voice: 'en-US-Standard-A',
    pitch: 0,
    speakingRate: 1
  });
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApiKeyChange = (key) => {
    setApiKey(key);
  };

  const handlePreferencesChange = (prefs) => {
    setPreferences(prefs);
  };

  const handleTextSubmit = async (text) => {
    if (!apiKey) {
      setError('Please enter your Google Cloud API key first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = await TextToSpeechService.synthesizeSpeech(text, apiKey, preferences);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Google Speech Synthesizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="https://cloud.google.com/text-to-speech" target="_blank">
                Google Cloud Text-to-Speech API
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <ApiKeyManager onApiKeyChange={handleApiKeyChange} />
            <SpeechPreferences onPreferencesChange={handlePreferencesChange} />
          </Col>
          <Col md={8}>
            <TextInput onTextSubmit={handleTextSubmit} />
            <AudioPlayer 
              audioUrl={audioUrl} 
              loading={loading} 
              error={error} 
            />
          </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center text-muted py-3 mt-5">
        <Container>
          <p>Google Speech Synthesizer - A React.js wrapper for Google Cloud Text-to-Speech API</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
