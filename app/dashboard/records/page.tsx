'use client'

import { useState, useEffect } from 'react'

interface RecordData {
  id?: string
  section1?: { patientFullName?: string }
  section6?: { diagnosisSummary?: string }
  created_at?: string
}

export default function RecordsPage() {
  const [records, setRecords] = useState<RecordData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records')
      if (!response.ok) throw new Error('Failed to fetch records')
      const data = await response.json()
      setRecords(data)
    } catch (error) {
      console.error('Error fetching records:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div className="p-6">Loading...</div>
  if (records.length === 0) return <div className="p-6 text-gray-500">No records found.</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Medical Records</h1>
      <div className="space-y-4">
        {records.map((record: RecordData) => (
          <div key={record.id} className="border p-4 rounded-xl hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{record.section1?.patientFullName || 'Unknown Patient'}</h3>
            <p className="text-sm text-gray-500">{new Date(record.created_at || Date.now()).toLocaleDateString()}</p>
            <p className="text-sm">{record.section6?.diagnosisSummary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
