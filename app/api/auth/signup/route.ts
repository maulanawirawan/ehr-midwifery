import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { signupSchema } from '@/lib/validation/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    const supabase = await createClient()

    // Sign up with email and password
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.fullName,
        },
      },
    })

    if (error || !data.user) {
      console.error('Signup error:', error)
      return NextResponse.json(
        { error: error?.message || 'Failed to create account' },
        { status: 400 }
      )
    }

    // Get user profile from auth.users metadata
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (!existingProfile) {
      // Create profile if it doesn't exist
      await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: validatedData.email,
          full_name: validatedData.fullName,
          role: 'patient',
        })
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: validatedData.fullName,
        role: 'patient',
      },
      message: 'Registration successful',
    })
  } catch (error) {
    console.error('Signup error:', error)
    
    // Check if it's a ZodError
    if (error && typeof error === 'object' && 'errors' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as { errors: unknown }).errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
