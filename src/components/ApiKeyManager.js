import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';

const ApiKeyManager = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Load API key from cookies if available
    const savedApiKey = Cookies.get('googleApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setAlertVariant('danger');
      setAlertMessage('Please enter a valid API key');
      setShowAlert(true);
      return;
    }

    // Save API key to cookies
    Cookies.set('googleApiKey', apiKey, { expires: 30 }); // Expires in 30 days
    
    // Notify parent component
    onApiKeyChange(apiKey);
    
    // Show success message
    setAlertVariant('success');
    setAlertMessage('API key saved successfully');
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="api-key-manager">
      <h3>Google Cloud API Key</h3>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter your Google Cloud API Key</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Form.Text className="text-muted">
            Your API key is stored locally in your browser cookies.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save API Key
        </Button>
      </Form>
    </div>
  );
};

export default ApiKeyManager;