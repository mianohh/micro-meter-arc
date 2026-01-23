import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ success: false, error: 'No prompt provided' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Try multiple models in case one is overloaded
    const models = [
      "gemini-1.5-flash-8b",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-3-flash-preview"
    ];

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });

        // Try different ways to extract the text
        let answer = '';
        
        if (response.text) {
          answer = response.text;
        } else if (response.response && response.response.text) {
          answer = response.response.text;
        } else if (response.candidates && response.candidates[0] && response.candidates[0].content) {
          answer = response.candidates[0].content.parts[0].text;
        } else if (response.response && response.response.candidates) {
          answer = response.response.candidates[0].content.parts[0].text;
        }
        
        if (answer) {
          console.log(`Success with model: ${model}`);
          return NextResponse.json({ success: true, answer });
        }
        
      } catch (modelError) {
        console.log(`Model ${model} failed:`, modelError.message);
        
        // If it's just overloaded, try next model
        if (modelError.message.includes('overloaded') || modelError.message.includes('503')) {
          continue;
        }
        
        continue;
      }
    }
    
    return NextResponse.json({ success: false, error: 'All models are currently unavailable. Please try again later.' });
    
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ success: false, error: `Request failed: ${error.message}` });
  }
}