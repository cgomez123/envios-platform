'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ShipMaster Pro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Inicio
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
              Precios
            </Link>
            <Link href="/integrations" className="text-gray-700 hover:text-primary-600 transition-colors">
              Integraciones
            </Link>
            <Link href="/api-docs" className="text-gray-700 hover:text-primary-600 transition-colors">
              API
            </Link>
            <Link href="/test-api" className="text-gray-700 hover:text-primary-600 transition-colors">
              🧪 Test API
            </Link>
            <Link href="/debug-api" className="text-gray-700 hover:text-primary-600 transition-colors">
              🔧 Debug
            </Link>
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Iniciar Sesión
            </Link>
            <Link href="/signup" className="btn-primary">
              Empezar Gratis
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600">
                Inicio
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary-600">
                Precios
              </Link>
              <Link href="/integrations" className="text-gray-700 hover:text-primary-600">
                Integraciones
              </Link>
              <Link href="/api-docs" className="text-gray-700 hover:text-primary-600">
                API
              </Link>
              <Link href="/test-api" className="text-gray-700 hover:text-primary-600">
                🧪 Test API
              </Link>
              <Link href="/debug-api" className="text-gray-700 hover:text-primary-600">
                🔧 Debug
              </Link>
              <Link href="/login" className="text-primary-600 font-medium">
                Iniciar Sesión
              </Link>
              <Link href="/signup" className="btn-primary w-full text-center">
                Empezar Gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
