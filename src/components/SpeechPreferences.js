import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';

const SpeechPreferences = ({ onPreferencesChange }) => {
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('en-US-Standard-A');
  const [pitch, setPitch] = useState(0);
  const [speakingRate, setSpeakingRate] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  // Available languages and voices
  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' }
  ];

  const voices = {
    'en-US': [
      { code: 'en-US-Standard-A', name: 'Standard A (Female)' },
      { code: 'en-US-Standard-B', name: 'Standard B (Male)' },
      { code: 'en-US-Standard-C', name: 'Standard C (Female)' },
      { code: 'en-US-Standard-D', name: 'Standard D (Male)' },
      { code: 'en-US-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'en-US-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'en-US-Wavenet-C', name: 'Wavenet C (Female)' },
      { code: 'en-US-Wavenet-D', name: 'Wavenet D (Male)' }
    ],
    'en-GB': [
      { code: 'en-GB-Standard-A', name: 'Standard A (Female)' },
      { code: 'en-GB-Standard-B', name: 'Standard B (Male)' },
      { code: 'en-GB-Standard-C', name: 'Standard C (Female)' },
      { code: 'en-GB-Standard-D', name: 'Standard D (Male)' },
      { code: 'en-GB-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'en-GB-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'en-GB-Wavenet-C', name: 'Wavenet C (Female)' },
      { code: 'en-GB-Wavenet-D', name: 'Wavenet D (Male)' }
    ],
    // Add more voices for other languages as needed
    'default': [
      { code: 'default-Standard-A', name: 'Standard A' },
      { code: 'default-Standard-B', name: 'Standard B' }
    ]
  };

  useEffect(() => {
    // Load preferences from cookies if available
    const savedLanguage = Cookies.get('speechLanguage');
    const savedVoice = Cookies.get('speechVoice');
    const savedPitch = Cookies.get('speechPitch');
    const savedSpeakingRate = Cookies.get('speechSpeakingRate');

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedVoice) setVoice(savedVoice);
    if (savedPitch) setPitch(parseFloat(savedPitch));
    if (savedSpeakingRate) setSpeakingRate(parseFloat(savedSpeakingRate));

    // Notify parent component with initial preferences
    updatePreferences({
      language: savedLanguage || language,
      voice: savedVoice || voice,
      pitch: savedPitch ? parseFloat(savedPitch) : pitch,
      speakingRate: savedSpeakingRate ? parseFloat(savedSpeakingRate) : speakingRate
    });
  }, [onPreferencesChange]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Update voice when language changes
    if (voices[language] && voices[language].length > 0) {
      setVoice(voices[language][0].code);
    } else {
      setVoice(voices['default'][0].code);
    }
  }, [language]);

  const updatePreferences = (prefs) => {
    if (onPreferencesChange) {
      onPreferencesChange(prefs);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save preferences to cookies
    Cookies.set('speechLanguage', language, { expires: 30 });
    Cookies.set('speechVoice', voice, { expires: 30 });
    Cookies.set('speechPitch', pitch.toString(), { expires: 30 });
    Cookies.set('speechSpeakingRate', speakingRate.toString(), { expires: 30 });
    
    // Notify parent component
    updatePreferences({ language, voice, pitch, speakingRate });
    
    // Show success message
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h3>Speech Synthesis Preferences</h3>
      </Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Preferences saved successfully
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Voice</Form.Label>
            <Form.Select 
              value={voice} 
              onChange={(e) => setVoice(e.target.value)}
            >
              {(voices[language] || voices['default']).map(v => (
                <option key={v.code} value={v.code}>{v.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pitch ({pitch.toFixed(1)})</Form.Label>
            <Form.Range 
              min="-20" 
              max="20" 
              step="0.1" 
              value={pitch} 
              onChange={(e) => setPitch(parseFloat(e.target.value))}
            />
            <div className="d-flex justify-content-between">
              <small>Lower</small>
              <small>Normal</small>
              <small>Higher</small>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Speaking Rate ({speakingRate.toFixed(1)}x)</Form.Label>
            <Form.Range 
              min="0.25" 
              max="4" 
              step="0.05" 
              value={speakingRate} 
              onChange={(e) => setSpeakingRate(parseFloat(e.target.value))}
            />
            <div className="d-flex justify-content-between">
              <small>Slower</small>
              <small>Normal</small>
              <small>Faster</small>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Preferences
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SpeechPreferences;