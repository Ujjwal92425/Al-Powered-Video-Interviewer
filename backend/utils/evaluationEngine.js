function evaluateResponse(transcript, keywords) {
  const lowerTranscript = transcript.toLowerCase();
  const keywordsFound = [];
  const missingKeywords = [];
  
  keywords.forEach(keyword => {
    if (lowerTranscript.includes(keyword.toLowerCase())) {
      keywordsFound.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  // Calculate score
  const wordCount = transcript.split(' ').length;
  const lengthScore = Math.min(wordCount / 50, 1) * 40; // Max 40 points for length
  const keywordScore = (keywordsFound.length / keywords.length) * 60; // Max 60 points for keywords
  const score = Math.round(lengthScore + keywordScore);
  
  return {
    score,
    keywordsFound,
    missingKeywords
  };
}

function generateOverallEvaluation(responses) {
  const scores = responses.map(r => r.score);
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  const strengths = [];
  const weaknesses = [];
  
  if (overallScore >= 70) {
    strengths.push('Strong communication skills');
    strengths.push('Comprehensive answers');
    strengths.push('Good understanding of concepts');
  } else if (overallScore >= 50) {
    strengths.push('Shows enthusiasm');
    strengths.push('Basic understanding demonstrated');
    weaknesses.push('Could provide more detailed responses');
  } else {
    weaknesses.push('Needs improvement in communication');
    weaknesses.push('Missing key concepts');
    weaknesses.push('Responses lack depth');
  }
  
  const summary = overallScore >= 70 
    ? 'Strong performance overall. Candidate demonstrates good knowledge and communication skills.'
    : overallScore >= 50
    ? 'Decent performance with room for improvement. Focus on elaborating key concepts.'
    : 'Needs significant improvement. Recommend additional preparation and practice.';
  
  return {
    overallScore,
    strengths,
    weaknesses,
    summary
  };
}

module.exports = { evaluateResponse, generateOverallEvaluation };