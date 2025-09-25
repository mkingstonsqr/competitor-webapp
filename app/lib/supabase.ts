import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Ad {
  id: number
export interface Ad {
  id: number
  library_id: string

// Helper functions
export const fetchAds = async (filters?: {
  brand?: string
  country?: string
  mediaType?: string
  isActive?: boolean
  limit?: number
  offset?: number
}) => {
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
    throw error
  }

  return data as Ad[]
}

export const getBrands = async () => {
  const { data, error } = await supabase
    .from('meta_ads')
    .select('brand')
    .not('brand', 'is', null)

  if (error) {
    console.error('Error fetching brands:', error)
    throw error
  }

  const uniqueBrands = [...new Set(data.map(item => item.brand))]
  return uniqueBrands.filter(Boolean)
}

export const getAdStats = async () => {
  const { data, error } = await supabase
    .from('meta_ads')
    .select('id, brand, is_active, media_type')

  if (error) {
    console.error('Error fetching ad stats:', error)
    throw error
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
}
