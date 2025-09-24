'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  Users,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react'

interface Ad {
  id: number
  library_id: string
  ad_library_url: string
  primary_thumbnail: string
  media_type: string
  brand: string
  ad_text: string
  ad_title: string
  is_active: boolean
  scraped_at: string
  imported_at: string
  dataset_id: string
  dataset_name: string
}

interface AIInsightsProps {
  selectedAds: Ad[]
}

interface Insight {
  type: 'trend' | 'opportunity' | 'threat' | 'recommendation'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
}

export default function AIInsights({ selectedAds }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string>('')

  useEffect(() => {
    if (selectedAds.length > 0) {
      generateInsights()
    } else {
      setInsights([])
      setAnalysis('')
    }
  }, [selectedAds])

  const generateInsights = async () => {
    setLoading(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate mock insights based on selected ads
    const mockInsights: Insight[] = []
    
    if (selectedAds.length > 0) {
      const brands = [...new Set(selectedAds.map(ad => ad.brand))]
      const mediaTypes = [...new Set(selectedAds.map(ad => ad.media_type))]
      const activeAds = selectedAds.filter(ad => ad.is_active).length
      
      // Trend Analysis
      if (mediaTypes.includes('video')) {
        mockInsights.push({
          type: 'trend',
          title: 'Video Content Dominance',
          description: `${Math.round((selectedAds.filter(ad => ad.media_type === 'video').length / selectedAds.length) * 100)}% of selected ads use video format, indicating a strong trend toward video marketing.`,
          confidence: 85,
          impact: 'high'
        })
      }

      // Opportunity Analysis
      if (brands.length > 1) {
        mockInsights.push({
          type: 'opportunity',
          title: 'Cross-Brand Messaging Gaps',
          description: `Analyzing ${brands.length} competitors reveals messaging opportunities in payment security and small business focus that Square can capitalize on.`,
          confidence: 78,
          impact: 'high'
        })
      }

      // Threat Analysis
      if (activeAds > selectedAds.length * 0.7) {
        mockInsights.push({
          type: 'threat',
          title: 'High Competitor Activity',
          description: `${Math.round((activeAds / selectedAds.length) * 100)}% of analyzed ads are currently active, showing aggressive competitor marketing push.`,
          confidence: 92,
          impact: 'medium'
        })
      }

      // Recommendations
      mockInsights.push({
        type: 'recommendation',
        title: 'Square Positioning Strategy',
        description: 'Focus on small business empowerment and seamless integration messaging to differentiate from competitor payment-only focus.',
        confidence: 88,
        impact: 'high'
      })

      mockInsights.push({
        type: 'recommendation',
        title: 'Content Format Optimization',
        description: 'Increase video content production by 40% to match competitor trends while maintaining Square\'s authentic brand voice.',
        confidence: 76,
        impact: 'medium'
      })
    }

    setInsights(mockInsights)
    
    // Generate analysis summary
    const analysisText = `Based on analysis of ${selectedAds.length} competitor ads from ${[...new Set(selectedAds.map(ad => ad.brand))].join(', ')}, key opportunities emerge for Square to dominate through differentiated messaging around business growth, not just payments.`
    setAnalysis(analysisText)
    
    setLoading(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-blue-400" />
      case 'opportunity':
        return <Target className="w-5 h-5 text-green-400" />
      case 'threat':
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'recommendation':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />
      default:
        return <Brain className="w-5 h-5 text-purple-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-400 bg-red-400/20'
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20'
      case 'low':
        return 'text-green-400 bg-green-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Insights</h2>
            <p className="text-sm text-gray-400">
              {selectedAds.length > 0 
                ? `Analyzing ${selectedAds.length} selected ads`
                : 'Select ads to get AI insights'
              }
            </p>
          </div>
        </div>

        {selectedAds.length > 0 && (
          <button
            onClick={generateInsights}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 rounded-xl transition-colors"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Insights
              </>
            )}
          </button>
        )}
      </div>

      {/* Quick Stats */}
      {selectedAds.length > 0 && (
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Quick Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Brands</span>
              <span className="text-sm font-medium">
                {[...new Set(selectedAds.map(ad => ad.brand))].length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Active Campaigns</span>
              <span className="text-sm font-medium">
                {selectedAds.filter(ad => ad.is_active).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Video Ads</span>
              <span className="text-sm font-medium">
                {selectedAds.filter(ad => ad.media_type === 'video').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Avg. Text Length</span>
              <span className="text-sm font-medium">
                {Math.round(
                  selectedAds.reduce((acc, ad) => acc + (ad.ad_text?.length || 0), 0) / selectedAds.length
                )} chars
              </span>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              AI Summary
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {analysis}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights List */}
      <AnimatePresence>
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact}
                        </span>
                        <span className="text-xs text-gray-400">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Square Opportunities */}
      {selectedAds.length > 0 && (
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Square Opportunities
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Business Growth Focus</span>
              </div>
              <p className="text-xs text-gray-400">
                Competitors focus on payments. Square can dominate by emphasizing business growth tools.
              </p>
            </div>
            
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Small Business Empathy</span>
              </div>
              <p className="text-xs text-gray-400">
                Show understanding of small business challenges beyond just processing payments.
              </p>
            </div>
            
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Ecosystem Integration</span>
              </div>
              <p className="text-xs text-gray-400">
                Highlight how Square's tools work together, not just individual features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedAds.length === 0 && (
        <div className="glass-effect rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">No Ads Selected</h3>
          <p className="text-sm text-gray-400 mb-4">
            Select competitor ads to get AI-powered insights and strategic recommendations.
          </p>
          <div className="text-xs text-gray-500">
            💡 Tip: Select 3-5 ads for the best analysis
          </div>
        </div>
      )}
    </div>
  )
}
