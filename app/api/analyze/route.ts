import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { current, forecast } = data;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a witty weather assistant that makes funny, engaging funny and sarcastic comments about the weather in the style of Carrot Weather app."
        },
        {
          role: "user",
          content: `
            Current conditions:
            - Temperature: ${current.air_temperature}°F (feels like ${current.feels_like}°F)
            - Conditions: ${current.conditions}
            - Humidity: ${current.relative_humidity}%
            - Wind: ${current.wind_avg} mph
            - UV Index: ${current.uv}
            
            Today's forecast:
            - High: ${forecast.daily[0].air_temp_high}°F
            - Low: ${forecast.daily[0].air_temp_low}°F
            - Precipitation chance: ${forecast.daily[0].precip_probability}%

            Create a short, witty comment about this weather (max 2 sentences). Focus on unusual conditions or make weather puns.
          `
        }
      ],
      temperature: 1.2,
      max_tokens: 100,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
      top_p: 0.93
    });

    return NextResponse.json({ 
      message: response.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error analyzing weather:', error);
    return NextResponse.json({ error: 'Failed to analyze weather' }, { status: 500 });
  }
} 