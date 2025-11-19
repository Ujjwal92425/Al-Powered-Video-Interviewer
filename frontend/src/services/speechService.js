class SpeechService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.isSupported = 'speechSynthesis' in window;
    this.recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    if (this.recognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }
speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!this.isSupported) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // DO NOT CANCEL IMMEDIATELY — this breaks speech
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);

    this.synthesis.speak(utterance);
  });
}

  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  startRecognition(onResult, onEnd, onError) {
    if (!this.recognitionSupported || !this.recognition) {
      if (onError) onError(new Error('Speech recognition not supported'));
      return;
    }

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript,
          interim: interimTranscript
        });
      }
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    this.recognition.onerror = (error) => {
      if (onError) onError(error);
    };

    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export default new SpeechService();