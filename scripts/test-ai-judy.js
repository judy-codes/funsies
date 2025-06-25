const AIJudy = require('./ai-judy');

async function testAIJudy() {
  const aiJudy = new AIJudy();
  
  const testQuestions = [
    "What does Judy do for work?",
    "What are Judy's hobbies?",
    "What did Judy study in college?",
    "What programming languages does Judy know?",
    "How does powerlifting relate to Judy's work?"
  ];
  
  console.log('🤖 Testing AI Judy System\n');
  
  for (let i = 0; i < testQuestions.length; i++) {
    const question = testQuestions[i];
    console.log(`\n--- Question ${i + 1}: ${question} ---`);
    
    try {
      const result = await aiJudy.generateResponse(question);
      
      console.log('\n📝 AI Judy Response:');
      console.log(result.response);
      
      console.log('\n📚 Relevant Sources:');
      result.relevantSources.forEach(source => console.log(`  - ${source}`));
      
      console.log('\n🎯 Similarity Scores:');
      result.similarity.forEach(item => console.log(`  - ${item.file}: ${item.score}`));
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(60));
  }
}

// Run the test
testAIJudy().catch(console.error); 