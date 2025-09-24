'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '#', active: true },
    { icon: TrendingUp, label: 'Trends', href: '#trends' },
    { icon: Target, label: 'Competitors', href: '#competitors' },
    { icon: BarChart3, label: 'Analytics', href: '#analytics' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Square Intelligence</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  item.active 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
              <Globe className="w-4 h-4" />
              Global
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Zap className="w-4 h-4" />
              Analyze
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              ))}
              
              <div className="pt-4 space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <Globe className="w-4 h-4" />
                  Global View
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Zap className="w-4 h-4" />
                  Start Analysis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
