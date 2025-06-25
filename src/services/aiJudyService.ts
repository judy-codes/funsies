interface AIJudyResponse {
  response: string;
  relevantSources: string[];
  similarity: Array<{
    file: string;
    score: string;
  }>;
}

class AIJudyService {
  private baseUrl: string;

  constructor() {
    // In development, we'll use a local API endpoint
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? '/api' 
      : 'http://localhost:3001/api';
  }

  async askQuestion(question: string): Promise<AIJudyResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/ai-judy/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error asking AI Judy:', error);
      throw error;
    }
  }
}

export const aiJudyService = new AIJudyService();
export type { AIJudyResponse }; 