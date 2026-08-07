import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { medicalRecordSchema } from '@/lib/validation/medical-record'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to determine role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Patients can only view their own records, midwives see all records
    let query = supabase.from('medical_records').select('*, patient_full_name').order('created_at', { ascending: false })

    if (profile?.role === 'patient') {
      query = query.eq('patient_id', user.id)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Get records error:', error)
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate data
    const validatedData = medicalRecordSchema.parse(body)

    const recordData = {
      patient_id: user.id,
      section1: validatedData.section1,
      section2: validatedData.section2,
      section3: validatedData.section3,
      section4: validatedData.section4,
      section5: validatedData.section5,
      section6: validatedData.section6,
      section7: validatedData.section7,
      section8: validatedData.section8,
    }

    const { data, error } = await supabase
      .from('medical_records')
      .insert(recordData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Create record error:', error)
    
    if (error && typeof error === 'object' && 'errors' in error) {
      return NextResponse.json(
        { error: 'Validation failed' },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 })
  }
}
