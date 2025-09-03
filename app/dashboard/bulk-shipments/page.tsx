'use client'

import { useState } from 'react'
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

interface BulkShipment {
  id: number
  senderName: string
  recipientName: string
  recipientAddress: string
  weight: number
  status: 'pending' | 'processing' | 'created' | 'error'
  error?: string
  trackingNumber?: string
}

export default function BulkShipments() {
  const [file, setFile] = useState<File | null>(null)
  const [shipments, setShipments] = useState<BulkShipment[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      if (uploadedFile.type === 'text/csv' || uploadedFile.name.endsWith('.csv')) {
        setFile(uploadedFile)
        parseCSV(uploadedFile)
      } else {
        alert('Por favor sube un archivo CSV válido')
      }
    }
  }

  const parseCSV = async (file: File) => {
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      alert('El archivo CSV debe tener al menos una fila de datos')
      return
    }

    // Simulación de parsing CSV
    const parsedShipments: BulkShipment[] = []
    
    // Header esperado: sender_name,recipient_name,recipient_address,weight
    for (let i = 1; i < Math.min(lines.length, 11); i++) { // Máximo 10 para demo
      const columns = lines[i].split(',').map(col => col.trim())
      
      if (columns.length >= 4) {
        parsedShipments.push({
          id: i,
          senderName: columns[0] || 'Remitente',
          recipientName: columns[1] || 'Destinatario',
          recipientAddress: columns[2] || 'Dirección',
          weight: parseFloat(columns[3]) || 1,
          status: 'pending'
        })
      }
    }

    setShipments(parsedShipments)
  }

  const processBulkShipments = async () => {
    if (shipments.length === 0) {
      alert('No hay envíos para procesar')
      return
    }

    setProcessing(true)
    setProgress(0)

    // Simular procesamiento de envíos uno por uno
    for (let i = 0; i < shipments.length; i++) {
      const shipment = shipments[i]
      
      // Actualizar estado a processing
      setShipments(prev => prev.map(s => 
        s.id === shipment.id ? { ...s, status: 'processing' } : s
      ))

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simular éxito o error (90% éxito)
      const success = Math.random() > 0.1
      
      if (success) {
        const trackingNumber = `BULK${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        setShipments(prev => prev.map(s => 
          s.id === shipment.id 
            ? { ...s, status: 'created', trackingNumber }
            : s
        ))
      } else {
        setShipments(prev => prev.map(s => 
          s.id === shipment.id 
            ? { ...s, status: 'error', error: 'Dirección inválida' }
            : s
        ))
      }

      setProgress(((i + 1) / shipments.length) * 100)
    }

    setProcessing(false)
    alert('✅ Procesamiento de envíos masivos completado!')
  }

  const downloadTemplate = () => {
    const csvTemplate = `sender_name,recipient_name,recipient_address,weight
Mi Empresa,Juan Pérez,"Av. Principal 123, Guadalajara, JAL",2.5
Mi Empresa,Ana López,"Calle Reforma 456, Monterrey, NL",1.8
Mi Empresa,Carlos Méndez,"Blvd. Centro 789, Cancún, QR",3.2`

    const blob = new Blob([csvTemplate], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'plantilla-envios-masivos.csv'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'created':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'processing':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'created': return 'Creado'
      case 'error': return 'Error'
      case 'processing': return 'Procesando...'
      default: return 'Pendiente'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📦 Envíos Masivos</h1>
          <p className="text-gray-600 mt-2">
            Crea múltiples envíos de una vez usando archivos CSV
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow border p-8 mb-8">
          <div className="text-center">
            <DocumentArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sube tu archivo CSV
            </h2>
            <p className="text-gray-600 mb-6">
              Formatos soportados: CSV con columnas sender_name, recipient_name, recipient_address, weight
            </p>

            <div className="flex justify-center space-x-4 mb-6">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="btn-primary cursor-pointer"
              >
                📁 Seleccionar Archivo CSV
              </label>
              <button
                onClick={downloadTemplate}
                className="btn-secondary"
              >
                📥 Descargar Plantilla
              </button>
            </div>

            {file && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  ✅ Archivo cargado: <strong>{file.name}</strong> ({shipments.length} envíos detectados)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shipments Preview */}
        {shipments.length > 0 && (
          <div className="bg-white rounded-lg shadow border p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                📋 Vista Previa ({shipments.length} envíos)
              </h2>
              
              <div className="flex space-x-4">
                {processing && (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">
                      Procesando... {Math.round(progress)}%
                    </span>
                  </div>
                )}
                
                <button
                  onClick={processBulkShipments}
                  disabled={processing || shipments.every(s => s.status === 'created')}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <TruckIcon className="h-5 w-5" />
                  <span>
                    {processing ? 'Procesando...' : 'Procesar Todos los Envíos'}
                  </span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {processing && (
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Shipments Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Remitente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Destinatario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Dirección
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Peso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tracking
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.senderName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.recipientName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {shipment.recipientAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.weight}kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(shipment.status)}
                          <span className="text-sm text-gray-900">
                            {getStatusText(shipment.status)}
                          </span>
                        </div>
                        {shipment.error && (
                          <div className="text-xs text-red-600 mt-1">
                            {shipment.error}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {shipment.trackingNumber ? (
                          <button
                            onClick={() => window.open(`/tracking/${shipment.trackingNumber}`, '_blank')}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {shipment.trackingNumber}
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            {shipments.length > 0 && !processing && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {shipments.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-blue-700">Pendientes</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {shipments.filter(s => s.status === 'processing').length}
                  </div>
                  <div className="text-sm text-yellow-700">Procesando</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {shipments.filter(s => s.status === 'created').length}
                  </div>
                  <div className="text-sm text-green-700">Creados</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {shipments.filter(s => s.status === 'error').length}
                  </div>
                  <div className="text-sm text-red-700">Errores</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow border p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">📋 Instrucciones</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Formato del CSV:</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>sender_name,recipient_name,recipient_address,weight</div>
                <div className="text-gray-500">Mi Empresa,Juan Pérez,"Av. Principal 123, GDL",2.5</div>
                <div className="text-gray-500">Mi Empresa,Ana López,"Calle Centro 456, MTY",1.8</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Consideraciones:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Máximo 100 envíos por archivo</li>
                <li>• Peso en kilogramos</li>
                <li>• Direcciones completas con ciudad y estado</li>
                <li>• Procesar durante horario no pico para mejor rendimiento</li>
                <li>• Revisa errores antes de procesar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
