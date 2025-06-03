import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
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
  const [showSelectors, setShowSelectors] = useState(false);

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

      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h1 className="display-5 fw-bold">Text-to-Speech Converter</h1>
            <p className="lead">Convert your text to natural-sounding speech using Google's advanced neural network models.</p>
          </Col>
        </Row>

        <Row className="word-processor-container">
          <Col lg={showSelectors ? 8 : 12} className="word-processor-editor">
            <div className="word-processor-header">
              <h3>Text Editor</h3>
              <Button
                variant="outline-secondary"
                onClick={() => setShowSelectors(!showSelectors)}
                className="toggle-selectors-btn"
              >
                {showSelectors ? 'Hide Options' : 'Show Options'}
              </Button>
            </div>
            <TextInput onTextSubmit={handleTextSubmit} />
          </Col>

          {showSelectors && (
            <Col lg={4} className="word-processor-selectors">
              <SpeechPreferences 
                onPreferencesChange={handlePreferencesChange}
                onApiKeyChange={handleApiKeyChange}
              />
            </Col>
          )}
        </Row>

        <Row>
          <Col>
            <AudioPlayer
              audioUrl={audioUrl}
              loading={loading}
              error={error}
            />
          </Col>
        </Row>
      </Container>

      <footer className="text-center mt-5">
        <Container>
          <p>Google Speech Synthesizer - A React.js wrapper for Google Cloud Text-to-Speech API</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
