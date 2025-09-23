'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Tag, 
  Activity, 
  Image, 
  Video, 
  FileText,
  ToggleLeft,
  ToggleRight,
  X
} from 'lucide-react'

export default function FilterPanel() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [mediaTypes, setMediaTypes] = useState<string[]>([])
  const [activeOnly, setActiveOnly] = useState(false)
  const [hasText, setHasText] = useState(false)

  const mediaTypeOptions = [
    { value: 'image', label: 'Images', icon: Image },
    { value: 'video', label: 'Videos', icon: Video },
    { value: 'carousel', label: 'Carousel', icon: FileText },
  ]

  const toggleMediaType = (type: string) => {
    setMediaTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const clearFilters = () => {
    setDateRange({ start: '', end: '' })
    setMediaTypes([])
    setActiveOnly(false)
    setHasText(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-400" />
          Advanced Filters
        </h3>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
              placeholder="Start date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Media Types */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Image className="w-4 h-4 text-green-400" />
            Media Types
          </label>
          <div className="space-y-2">
            {mediaTypeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleMediaType(option.value)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  mediaTypes.includes(option.value)
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filters */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-yellow-400" />
            Status
          </label>
          <div className="space-y-3">
            <button
              onClick={() => setActiveOnly(!activeOnly)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-sm">Active Only</span>
              {activeOnly ? (
                <ToggleRight className="w-5 h-5 text-green-400" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            <button
              onClick={() => setHasText(!hasText)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-sm">Has Ad Text</span>
              {hasText ? (
                <ToggleRight className="w-5 h-5 text-green-400" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            Quick Filters
          </label>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-left">
              Last 7 Days
            </button>
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-left">
              This Month
            </button>
            <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-left">
              High Engagement
            </button>
          </div>
        </div>
      </div>

      {/* Applied Filters */}
      {(dateRange.start || dateRange.end || mediaTypes.length > 0 || activeOnly || hasText) && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-400">Applied Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dateRange.start && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">
                From: {dateRange.start}
              </span>
            )}
            {dateRange.end && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">
                To: {dateRange.end}
              </span>
            )}
            {mediaTypes.map(type => (
              <span key={type} className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 capitalize">
                {type}
              </span>
            ))}
            {activeOnly && (
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                Active Only
              </span>
            )}
            {hasText && (
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                Has Text
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
