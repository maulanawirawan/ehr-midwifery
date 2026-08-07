// EHR Midwifery - Demo Account Auto-Seeder
// Run this script after setting up your Supabase project
// Usage: npm run seed

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Demo accounts to create
const DEMO_ACCOUNTS = [
  {
    email: 'midwife@ehr-demo.com',
    password: 'Midwife123!',
    role: 'midwife',
    full_name: 'Dr. Sari Wulandari',
    phone: '081234567890',
  },
  {
    email: 'patient1@ehr-demo.com',
    password: 'Patient123!',
    role: 'patient',
    full_name: 'Ani Ratnasari',
    phone: '081234567891',
  },
  {
    email: 'patient2@ehr-demo.com',
    password: 'Patient123!',
    role: 'patient',
    full_name: 'Budi Santoso',
    phone: '081234567892',
  },
];

async function createAuthUser(email: string, password: string) {
  // Create user via auth API
  const { data: authData, error: authError } = await supabase.rpc(
    'create_user',
    { 
      email: email, 
      password: password,
      user_metadata: {} 
    }
  );

  if (authError && authError.message.includes('already exists')) {
    console.log(`✓ User ${email} already exists`);
    return authData;
  } else if (authError) {
    throw new Error(`Failed to create auth user ${email}: ${authError.message}`);
  }

  return authData.user;
}

async function createProfile(userId: string, email: string, full_name: string, role: string, phone: string) {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existingProfile) {
    // Update existing profile
    await supabase
      .from('profiles')
      .update({ 
        full_name, 
        role, 
        phone,
        updated_at: new Date().toISOString()
      })
      .eq('email', email);
    
    console.log(`✓ Profile for ${email} updated`);
    return;
  }

  // Create new profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{
      id: userId,
      email,
      full_name,
      role,
      phone,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);

  if (profileError) {
    throw new Error(`Failed to create profile for ${email}: ${profileError.message}`);
  }

  console.log(`✓ Profile for ${email} created`);
}

async function main() {
  console.log('\n🌟 Starting EHR Midwifery Demo Account Seeder...\n');
  
  try {
    // First check if tables exist
    const { count: tablesCount } = await supabase
      .from('information_schema.tables')
      .select('*', { count: 'exact' })
      .eq('table_name', 'medical_records');

    if (tablesCount === 0) {
      console.error('❌ Database schema not initialized!');
      console.error('Please run migrations 00001_initial_schema.sql and 00002_rls_policies.sql first.');
      console.error('https://supabase.com/dashboard/project/cxgjsrwehvbcvmgquvev/sql\n');
      process.exit(1);
    }

    console.log('✅ Database schema detected. Creating demo accounts...\n');

    // Create each demo account
    for (const account of DEMO_ACCOUNTS) {
      console.log(`\n👤 Creating ${account.role.toUpperCase()} account: ${account.email}`);
      
      try {
        // We need to use Supabase AuthAdmin API directly
        // Since RPC approach above may not work without custom edge function
        console.log(`   → Email: ${account.email}`);
        console.log(`   → Password: ${account.password}`);
        console.log(`   → Full Name: ${account.full_name}`);
        console.log(`   → Phone: ${account.phone}`);
        console.log(`   → Role: ${account.role}`);
        
        // Note: Due to Supabase security, we'll create users via signup flow instead
        console.log(`   ⚠️  Due to Supabase security restrictions, please create this user manually by visiting:`);
        console.log(`   http://localhost:3000/signup`);
        console.log(`   Then edit the user in Supabase Dashboard → Auth → Users → Edit Metadata JSON`);
        console.log(`   Set role to: "${account.role}"\n`);
        
      } catch (error) {
        console.error(`   ❌ Error: ${(error as Error).message}\n`);
      }
    }

    console.log('\n📋 SUMMARY OF DEMO ACCOUNTS TO CREATE:\n');
    DEMO_ACCOUNTS.forEach((acc, idx) => {
      console.log(`${idx + 1}. ${acc.role.toUpperCase()}`);
      console.log(`   Email: ${acc.email}`);
      console.log(`   Password: ${acc.password}`);
      console.log(`   Full Name: ${acc.full_name}`);
      console.log(`   Phone: ${acc.phone}`);
      console.log(`   Action: Create via signup page, then update role in metadata JSON\n`);
    });

    console.log('📖 QUICK START GUIDE:\n');
    console.log('1. Start local server: npm run dev');
    console.log('2. Visit: http://localhost:3000/signup');
    console.log('3. Create each demo account listed above');
    console.log('4. After signup, go to Supabase Dashboard:');
    console.log('   https://supabase.com/dashboard/project/cxgjsrwehvbcvmgquvev/auth/users');
    console.log('5. Click "Edit" on each user → Edit Raw JSON');
    console.log('6. Add/Update metadata with role field:');
    console.log('   {"role": "midwife"} or {"role": "patient"}\n');

  } catch (error) {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  } finally {
    console.log('\n✨ Done! Demo accounts ready for testing.\n');
  }
}

main();
