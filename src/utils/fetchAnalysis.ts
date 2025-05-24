export interface AnalysisResult {
  biasScore: number;
  topic: string;
  suspiciousItems: string[];
}

export async function analyzeArticle(text: string): Promise<AnalysisResult> {
  const response = await fetch('http://localhost:3000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!response.ok) throw new Error('분석 실패');
  // topic이 포함된 JSON을 그대로 파싱
  return await response.json()
}
