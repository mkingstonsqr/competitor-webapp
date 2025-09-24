import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if we have the required variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database
export interface Ad {
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

// Helper functions with null checks
export const fetchAds = async (filters?: {
  brand?: string
  country?: string
  mediaType?: string
  isActive?: boolean
  limit?: number
  offset?: number
}) => {
  if (!supabase) {
    console.warn('Supabase client not initialized - returning empty array')
    return []
  }

  try {
    let query = supabase
      .from('meta_ads')
      .select('*')
      .order('imported_at', { ascending: false })

    if (filters?.brand && filters.brand !== 'all') {
      query = query.ilike('brand', `%${filters.brand}%`)
    }

    if (filters?.mediaType && filters.mediaType !== 'all') {
      query = query.eq('media_type', filters.mediaType)
    }

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching ads:', error)
      return []
    }

    return data as Ad[]
  } catch (error) {
    console.error('Exception fetching ads:', error)
    return []
  }
}

export const getBrands = async () => {
  if (!supabase) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('meta_ads')
      .select('brand')
      .not('brand', 'is', null)

    if (error) {
      console.error('Error fetching brands:', error)
      return []
    }

    const uniqueBrands = [...new Set(data.map(item => item.brand))]
    return uniqueBrands.filter(Boolean)
  } catch (error) {
    console.error('Exception fetching brands:', error)
    return []
  }
}

export const getAdStats = async () => {
  if (!supabase) {
    return {
      total: 0,
      active: 0,
      brands: 0,
      mediaTypes: { video: 0, image: 0, carousel: 0 }
    }
  }

  try {
    const { data, error } = await supabase
      .from('meta_ads')
      .select('id, brand, is_active, media_type')

    if (error) {
      console.error('Error fetching ad stats:', error)
      return {
        total: 0,
        active: 0,
        brands: 0,
        mediaTypes: { video: 0, image: 0, carousel: 0 }
      }
    }

    const stats = {
      total: data.length,
      active: data.filter(ad => ad.is_active).length,
      brands: [...new Set(data.map(ad => ad.brand))].filter(Boolean).length,
      mediaTypes: {
        video: data.filter(ad => ad.media_type === 'video').length,
        image: data.filter(ad => ad.media_type === 'image').length,
        carousel: data.filter(ad => ad.media_type === 'carousel').length,
      }
    }

    return stats
  } catch (error) {
    console.error('Exception fetching ad stats:', error)
    return {
      total: 0,
      active: 0,
      brands: 0,
      mediaTypes: { video: 0, image: 0, carousel: 0 }
    }
  }
}
