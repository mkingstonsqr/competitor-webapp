'use client'
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Filter, TrendingUp, Eye, Calendar, DollarSign, Target, BarChart3, Download, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import AdTile from './components/AdTile'
import FilterPanel from './components/FilterPanel'
import AIInsights from './components/AIInsights'
import Navigation from './components/Navigation'
import { supabase } from './lib/supabase'

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

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([])
  const [filteredAds, setFilteredAds] = useState<MetaAd[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPage, setSelectedPage] = useState<string>('all')
  const [pages, setPages] = useState<string[]>([])
  const [insights, setInsights] = useState<string>('')
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)


  useEffect(() => {
    fetchAds()
  }, [])

  useEffect(() => {
    filterAds()
  }, [ads, selectedCountry, selectedBrand, searchTerm])
  }

  const fetchAds = async () => {
    if (!supabase) {
      setError('Database connection not available. Please check configuration.')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .select('*')
        .order('imported_at', { ascending: false })
        .limit(100)

      if (error) throw error
      
      setAds(data || [])
    } catch (error) {
      console.error('Error fetching ads:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAds = () => {
    let filtered = ads

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(ad => 
        ad.brand?.toLowerCase().includes(selectedBrand.toLowerCase())
      )
    }

    if (searchTerm) {
      return ads.filter(ad => 
        ad.ad_creative_body?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.page_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ad.ad_snapshot_url && ad.ad_snapshot_url.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    return ads
    setFilteredAds(filtered)
  }

  const handleAdSelect = (ad: Ad) => {
    const isSelected = selectedAds.find(selected => selected.id === ad.id)
    if (isSelected) {
      setSelectedAds(selectedAds.filter(selected => selected.id !== ad.id))
    } else {
      setSelectedAds([...selectedAds, ad])
    }
  }

  const clearSelection = () => {
    setSelectedAds([])
  }

  const uniqueBrands = Array.from(new Set(ads.map(ad => ad.brand).filter(Boolean)))

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Competitor</span> Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Discover what your competitors are doing, analyze their strategies, and find opportunities for Square to dominate the market.
        </div>

        {/* AI Insights */}
        {insights && process.env.NEXT_PUBLIC_OPENAI_API_KEY && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-400">{ads.length}</div>
              <div className="text-sm text-gray-400">Total Ads</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-400">{uniqueBrands.length}</div>
              <div className="text-sm text-gray-400">Brands Tracked</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-400">{filteredAds.filter(ad => ad.is_active).length}</div>
              <div className="text-sm text-gray-400">Active Campaigns</div>
            </div>
            <div className="glass-effect rounded-2xl p-6">
              <div className="text-3xl font-bold text-yellow-400">{selectedAds.length}</div>
              <div className="text-sm text-gray-400">Selected for Analysis</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect rounded-2xl p-6 mb-6"
          >
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search ads by content, page name, or URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Pages</option>
              {pages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              {/* Clear Selection */}
              {selectedAds.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
                >
                  Clear ({selectedAds.length})
                </button>
              )}
            </div>
          </motion.div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FilterPanel />
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Ads Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading competitor intelligence<span className="loading-dots">...</span></p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredAds.map((ad, index) => (
                    <motion.div
                      key={ad.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <AdTile
                        ad={ad}
                        isSelected={selectedAds.some(selected => selected.id === ad.id)}
                        onSelect={() => handleAdSelect(ad)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {!loading && filteredAds.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No ads found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* AI Insights Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <AIInsights selectedAds={selectedAds} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-semibold">Square Intelligence</span>
          </div>
          <p className="text-gray-400">
            Powered by AI • Built for Square • Designed to Win
          </p>
        </div>
      </footer>
    </div>
  )
}
