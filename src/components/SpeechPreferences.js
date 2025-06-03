import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import Cookies from 'js-cookie';
import ApiKeyManager from './ApiKeyManager';

const SpeechPreferences = ({ onPreferencesChange, onApiKeyChange }) => {
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [voice, setVoice] = useState('en-US-Standard-A');
  const [pitch, setPitch] = useState(0);
  const [speakingRate, setSpeakingRate] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [isChirpHDVoice, setIsChirpHDVoice] = useState(false);

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
      { code: 'en-US-Wavenet-D', name: 'Wavenet D (Male)' },
      { code: 'en-US-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'en-US-Chirp-HD-M', name: 'Chirp HD (Male)' },
      { code: 'en-US-Chirp3-HD-Leda', name: 'en-US-Chirp3-HD-Leda'},

    ],
    'en-GB': [
      { code: 'en-GB-Standard-A', name: 'Standard A (Female)' },
      { code: 'en-GB-Standard-B', name: 'Standard B (Male)' },
      { code: 'en-GB-Standard-C', name: 'Standard C (Female)' },
      { code: 'en-GB-Standard-D', name: 'Standard D (Male)' },
      { code: 'en-GB-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'en-GB-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'en-GB-Wavenet-C', name: 'Wavenet C (Female)' },
      { code: 'en-GB-Wavenet-D', name: 'Wavenet D (Male)' },
      { code: 'en-GB-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'en-GB-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'es-ES': [
      { code: 'es-ES-Standard-A', name: 'Standard A (Female)' },
      { code: 'es-ES-Standard-B', name: 'Standard B (Male)' },
      { code: 'es-ES-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'es-ES-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'es-ES-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'es-ES-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'fr-FR': [
      { code: 'fr-FR-Standard-A', name: 'Standard A (Female)' },
      { code: 'fr-FR-Standard-B', name: 'Standard B (Male)' },
      { code: 'fr-FR-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'fr-FR-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'fr-FR-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'fr-FR-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'de-DE': [
      { code: 'de-DE-Standard-A', name: 'Standard A (Female)' },
      { code: 'de-DE-Standard-B', name: 'Standard B (Male)' },
      { code: 'de-DE-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'de-DE-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'de-DE-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'de-DE-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'ja-JP': [
      { code: 'ja-JP-Standard-A', name: 'Standard A (Female)' },
      { code: 'ja-JP-Standard-B', name: 'Standard B (Male)' },
      { code: 'ja-JP-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'ja-JP-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'ja-JP-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'ja-JP-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'ko-KR': [
      { code: 'ko-KR-Standard-A', name: 'Standard A (Female)' },
      { code: 'ko-KR-Standard-B', name: 'Standard B (Male)' },
      { code: 'ko-KR-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'ko-KR-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'ko-KR-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'ko-KR-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    'zh-CN': [
      { code: 'zh-CN-Standard-A', name: 'Standard A (Female)' },
      { code: 'zh-CN-Standard-B', name: 'Standard B (Male)' },
      { code: 'zh-CN-Wavenet-A', name: 'Wavenet A (Female)' },
      { code: 'zh-CN-Wavenet-B', name: 'Wavenet B (Male)' },
      { code: 'zh-CN-Chirp-HD-F', name: 'Chirp HD (Female)' },
      { code: 'zh-CN-Chirp-HD-M', name: 'Chirp HD (Male)' }
    ],
    // Default voices for unsupported languages
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

  // Check if selected voice is a Chirp HD voice
  useEffect(() => {
    setIsChirpHDVoice(voice.includes('Chirp-HD'));
  }, [voice]);

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
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h3>Speech Synthesis Preferences</h3>
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={() => setShowApiKeyForm(!showApiKeyForm)}
        >
          {showApiKeyForm ? 'Hide API Key' : 'API Key Settings'}
        </Button>
      </Card.Header>
      <Card.Body>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Preferences saved successfully
          </Alert>
        )}

        {onApiKeyChange && (
          <div className="mb-4">
            <ApiKeyManager 
              onApiKeyChange={onApiKeyChange} 
              showForm={showApiKeyForm} 
              onToggleForm={setShowApiKeyForm} 
            />
          </div>
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
            {isChirpHDVoice && (
              <Alert variant="info" className="mt-2 mb-0 py-2">
                <small>
                  <strong>Note:</strong> Chirp HD voices are powered by LLMs and can hallucinate by dropping words or digits during synthesis.
                  They don't support SSML input, speaking rate, pitch adjustments, or A-Law audio encoding.
                </small>
              </Alert>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Pitch ({pitch.toFixed(1)})
              {isChirpHDVoice && <span className="text-muted"> (Not available for Chirp HD voices)</span>}
            </Form.Label>
            <Form.Range
              min="-20"
              max="20"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              disabled={isChirpHDVoice}
            />
            <div className="d-flex justify-content-between">
              <small>Lower</small>
              <small>Normal</small>
              <small>Higher</small>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Speaking Rate ({speakingRate.toFixed(1)}x)
              {isChirpHDVoice && <span className="text-muted"> (Not available for Chirp HD voices)</span>}
            </Form.Label>
            <Form.Range
              min="0.25"
              max="4"
              step="0.05"
              value={speakingRate}
              onChange={(e) => setSpeakingRate(parseFloat(e.target.value))}
              disabled={isChirpHDVoice}
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
