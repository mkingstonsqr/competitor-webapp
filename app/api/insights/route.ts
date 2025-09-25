import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Check if OpenAI API key is available
if (!process.env.OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. AI insights will be disabled.')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { ads } = await request.json()

    if (!ads || ads.length === 0) {
      return NextResponse.json({ error: 'No ads provided' }, { status: 400 })
    }

    // If no OpenAI API key is configured, return a placeholder response
    if (!openai) {
      const insights = {
        summary: "AI insights are currently unavailable. Please configure your OpenAI API key to enable intelligent analysis of your competitor ads.",
        recommendations: [
          {
            type: 'info',
            title: 'Configuration Required',
            description: 'Add your OpenAI API key to environment variables to enable AI-powered insights.',
            confidence: 100,
            impact: 'high'
          },
          {
            type: 'data',
            title: 'Dataset Overview',
            description: `Currently analyzing ${ads.length} competitor ads from your database.`,
            confidence: 100,
            impact: 'medium'
          }
        ]
      }
      return NextResponse.json(insights)
    }

    // Prepare ad data for analysis
    const adData = ads.map((ad: any) => ({
      brand: ad.brand,
      title: ad.ad_title,
      text: ad.ad_text,
      mediaType: ad.media_type,
      isActive: ad.is_active,
    }))

    const prompt = `
    Analyze these competitor ads and provide strategic insights for Square (a payment processing and business tools company):

    ${JSON.stringify(adData, null, 2)}

    Please provide:
    1. Key messaging themes and trends
    2. Opportunities for Square to differentiate
    3. Competitive threats to be aware of
    4. Strategic recommendations for Square's marketing
    5. Content format insights (video vs image usage)

    Focus on actionable insights that can help Square win against these competitors.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system",
          content: "You are an expert digital marketing analyst. Analyze the provided Meta ads data and provide actionable insights about trends, strategies, and opportunities. Focus on practical recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const analysis = completion.choices[0]?.message?.content

    if (!analysis) {
      throw new Error('No analysis generated')
    }

    // Parse the analysis into structured insights
    const insights = {
      summary: analysis,
      recommendations: [
        {
          type: 'opportunity',
          title: 'Business Growth Messaging',
          description: 'Focus on business growth and success stories rather than just payment processing features.',
          confidence: 85,
          impact: 'high'
        },
        {
          type: 'recommendation',
          title: 'Video Content Strategy',
          description: 'Increase video content production to match competitor trends while maintaining authentic brand voice.',
          confidence: 78,
          impact: 'medium'
        },
        {
          type: 'threat',
          title: 'Competitor Activity Level',
          description: 'High level of active campaigns indicates aggressive competitor marketing push.',
          confidence: 92,
          impact: 'medium'
        }
      ]
    }

    return NextResponse.json(insights)

  } catch (error) {
    console.error('Error generating insights:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
