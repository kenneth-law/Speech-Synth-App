import axios from 'axios';

class TextToSpeechService {
  constructor() {
    this.baseUrl = 'https://texttospeech.googleapis.com/v1';
  }

  /**
   * Synthesize speech from text
   * @param {string} text - The text to synthesize
   * @param {string} apiKey - Google Cloud API key
   * @param {Object} preferences - Speech synthesis preferences
   * @returns {Promise<string>} - URL to the audio file
   */
  async synthesizeSpeech(text, apiKey, preferences) {
    if (!text || !apiKey) {
      throw new Error('Text and API key are required');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/text:synthesize?key=${apiKey}`,
        {
          input: {
            text: text
          },
          voice: {
            languageCode: preferences.language || 'en-US',
            name: preferences.voice || 'en-US-Standard-A',
            ssmlGender: 'NEUTRAL'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: preferences.pitch || 0,
            speakingRate: preferences.speakingRate || 1
          }
        }
      );

      // The API returns audio content as a base64 encoded string
      const audioContent = response.data.audioContent;
      
      // Convert base64 to a Blob
      const byteCharacters = atob(audioContent);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/mp3' });
      
      // Create a URL for the blob
      const audioUrl = URL.createObjectURL(blob);
      
      return audioUrl;
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`API Error: ${error.response.data.error.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Error: ${error.message}`);
      }
    }
  }
}

export default new TextToSpeechService();