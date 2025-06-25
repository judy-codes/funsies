const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const AI_JUDY_CONFIG = require('../config/ai-judy-config');

// Load environment variables
require('dotenv').config();

class AIJudy {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.knowledgeBase = [];
    this.loadKnowledgeBase();
  }

  // Load all markdown files from knowledge-base directory
  loadKnowledgeBase() {
    const knowledgeBasePath = path.join(__dirname, '../knowledge-base');
    const files = fs.readdirSync(knowledgeBasePath);
    
    files.forEach(file => {
      if (file.endsWith('.md') && file !== 'README.md') {
        const content = fs.readFileSync(path.join(knowledgeBasePath, file), 'utf8');
        this.knowledgeBase.push({
          filename: file,
          content: content,
          title: file.replace('.md', '').replace(/-/g, ' ')
        });
      }
    });
    
    console.log(`Loaded ${this.knowledgeBase.length} knowledge base files`);
  }

  // Get embeddings for text
  async getEmbedding(text) {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  }

  // Calculate cosine similarity between two vectors
  cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Find most relevant knowledge base entries
  async findRelevantContent(userQuestion, topK = 3) {
    const questionEmbedding = await this.getEmbedding(userQuestion);
    
    const similarities = await Promise.all(
      this.knowledgeBase.map(async (entry) => {
        const contentEmbedding = await this.getEmbedding(entry.content);
        const similarity = this.cosineSimilarity(questionEmbedding, contentEmbedding);
        return { ...entry, similarity };
      })
    );
    
    // Sort by similarity and return top K
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  // Generate AI Judy's response
  async generateResponse(userQuestion) {
    try {
      // Find relevant content
      const relevantContent = await this.findRelevantContent(userQuestion);
      
      // Prepare the context from relevant markdown files
      const context = relevantContent
        .map(entry => `## ${entry.title}\n${entry.content}`)
        .join('\n\n');
      
      // Create the messages for OpenAI API
      const messages = [
        {
          role: 'system',
          content: AI_JUDY_CONFIG.systemPrompt
        },
        {
          role: 'user',
          content: `This is some more information about Judy:\n\n${context}\n\nUser question: ${userQuestion}`
        }
      ];
      
      // Call OpenAI API
      const response = await this.openai.chat.completions.create({
        model: AI_JUDY_CONFIG.model,
        temperature: AI_JUDY_CONFIG.temperature,
        messages: messages,
      });
      
      return {
        response: response.choices[0].message.content,
        relevantSources: relevantContent.map(entry => entry.filename),
        similarity: relevantContent.map(entry => ({
          file: entry.filename,
          score: entry.similarity.toFixed(3)
        }))
      };
      
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  const aiJudy = new AIJudy();
  
  // Example question
  const question = "What does Judy do for work and what are her main skills?";
  
  try {
    const result = await aiJudy.generateResponse(question);
    console.log('\n=== AI Judy Response ===');
    console.log(result.response);
    console.log('\n=== Relevant Sources ===');
    console.log(result.relevantSources);
    console.log('\n=== Similarity Scores ===');
    console.log(result.similarity);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = AIJudy; 