import React, { useState } from 'react';
import { Form, Button, Card, Tabs, Tab, Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const TextInput = ({ onTextSubmit }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [activeTab, setActiveTab] = useState('direct');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');

    if (selectedFile) {
      // Check if file is markdown
      if (!selectedFile.name.endsWith('.md')) {
        setError('Please upload a markdown (.md) file');
        setFile(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsText(selectedFile);
    } else {
      setFileContent('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let contentToSubmit = '';

    if (activeTab === 'direct') {
      if (!text.trim()) {
        setError('Please enter some text');
        return;
      }
      contentToSubmit = text;
    } else {
      if (!fileContent) {
        setError('Please upload a markdown file');
        return;
      }
      contentToSubmit = fileContent;
    }

    if (onTextSubmit) {
      onTextSubmit(contentToSubmit);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h3>Text Input</h3>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="direct" title="Direct Input">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Enter text to synthesize</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Type or paste your text here..."
                />
              </Form.Group>

              {showPreview && text && (
                <Card className="mb-3">
                  <Card.Header>Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <div className="d-flex justify-content-between align-items-center">
                {text && (
                  <Button
                    variant="outline-secondary"
                    onClick={togglePreview}
                  >
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </Button>
                )}

                <Button variant="primary" type="submit" className={text ? "ms-auto" : ""}>
                  Synthesize Speech
                </Button>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="file" title="File Upload">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Upload a markdown file</Form.Label>
                <Form.Control
                  type="file"
                  accept=".md"
                  onChange={handleFileChange}
                />
                <Form.Text className="text-muted">
                  Only .md files are supported
                </Form.Text>
              </Form.Group>

              {showPreview && fileContent && (
                <Card className="mb-3">
                  <Card.Header>Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{fileContent}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <div className="d-flex justify-content-between align-items-center">
                {fileContent && (
                  <Button
                    variant="outline-secondary"
                    onClick={togglePreview}
                  >
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </Button>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!fileContent}
                  className={fileContent ? "ms-auto" : ""}
                >
                  Synthesize Speech
                </Button>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default TextInput;
