'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Calendar, 
  Tag, 
  Eye, 
  Heart,
  Share,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Play,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'

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

interface AdTileProps {
  ad: Ad
  isSelected: boolean
  onSelect: () => void
}

export default function AdTile({ ad, isSelected, onSelect }: AdTileProps) {
  const [imageError, setImageError] = useState(false)
  const [showFullText, setShowFullText] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number = 120) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getMediaIcon = () => {
    switch (ad.media_type?.toLowerCase()) {
      case 'video':
        return <Play className="w-4 h-4" />
      case 'image':
        return <ImageIcon className="w-4 h-4" />
      default:
        return <ImageIcon className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden hover-lift ${
        isSelected 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Selection Indicator */}
      <button
        onClick={onSelect}
        className="absolute top-3 right-3 z-10 p-1 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
      >
        {isSelected ? (
          <CheckCircle className="w-5 h-5 text-blue-400" />
        ) : (
          <Circle className="w-5 h-5 text-white/60 hover:text-white" />
        )}
      </button>

      {/* Image/Thumbnail */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden">
        {ad.primary_thumbnail && !imageError ? (
          <Image
            src={ad.primary_thumbnail}
            alt={ad.ad_title || 'Ad thumbnail'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              {getMediaIcon()}
              <p className="text-xs text-gray-400 mt-2">
                {ad.media_type || 'Media'}
              </p>
            </div>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs">
          {getMediaIcon()}
          <span className="capitalize">{ad.media_type || 'Unknown'}</span>
        </div>

        {/* Active Status */}
        {ad.is_active && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
            Live
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand and Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-sm text-blue-400">
              {ad.brand || 'Unknown Brand'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {formatDate(ad.scraped_at)}
          </div>
        </div>

        {/* Title */}
        {ad.ad_title && (
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {ad.ad_title}
          </h3>
        )}

        {/* Ad Text */}
        {ad.ad_text && (
          <div className="mb-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {showFullText ? ad.ad_text : truncateText(ad.ad_text)}
            </p>
            {ad.ad_text.length > 120 && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1 transition-colors"
              >
                {showFullText ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
              View
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
              Save
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
              <Share className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* External Link */}
          {ad.ad_library_url && (
            <a
              href={ad.ad_library_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
