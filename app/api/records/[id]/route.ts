import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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

    // Build query based on user role
    let query = supabase.from('medical_records').select('*').eq('id', id)

    if (profile?.role === 'patient') {
      query = query.eq('patient_id', user.id)
    }

    const { data, error } = await query.single()
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Get record detail error:', error)
    return NextResponse.json({ error: 'Failed to fetch record' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    
    if ('section1' in body) updateData.section1 = body.section1
    if ('section2' in body) updateData.section2 = body.section2
    if ('section3' in body) updateData.section3 = body.section3
    if ('section4' in body) updateData.section4 = body.section4
    if ('section5' in body) updateData.section5 = body.section5
    if ('section6' in body) updateData.section6 = body.section6
    if ('section7' in body) updateData.section7 = body.section7
    if ('section8' in body) updateData.section8 = body.section8

    const { data, error } = await supabase
      .from('medical_records')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Update record error:', error)
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get record to check ownership
    const { data: record } = await supabase
      .from('medical_records')
      .select('patient_id')
      .eq('id', id)
      .single()

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    }

    // Check if user owns this record or is a midwife/admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'patient' && record.patient_id !== user.id) {
      return NextResponse.json({ error: 'Not authorized to delete this record' }, { status: 403 })
    }

    const { error } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Record deleted successfully' })
  } catch (error) {
    console.error('Delete record error:', error)
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 })
  }
}
