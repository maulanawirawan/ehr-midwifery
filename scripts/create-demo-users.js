// EHR Midwifery - Demo User Seeder (Native Fetch Script)
// Run: node scripts/create-demo-users.js
// Uses native Node.js fetch (no external dependencies needed)

const SUPABASE_URL = 'https://cxgjsrwehvbcvmgquvev.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SERVICE_ROLE_KEY) {
  console.error('\n❌ ERROR: Please set SUPABASE_SERVICE_ROLE_KEY environment variable');
  console.error('Run command:\n  cd D:\\panduan_bimbingan_saja\\ehr-midwifery\n  set SUPABASE_SERVICE_ROLE_KEY=[your-key]\n  node scripts/create-demo-users.js\n');
  process.exit(1);
}

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

async function createUser(account) {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
        user_metadata: {
          full_name: account.full_name,
          role: account.role,
          phone: account.phone,
        },
        app_metadata: {
          provider: 'email',
          providers: ['email'],
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, userId: data.user.id, email: account.email };
    } else if (response.status === 422) {
      const error = await response.text();
      if (error.includes('already exists')) {
        console.log(`✓ User already exists: ${account.email}`);
        return null;
      }
      throw new Error(error);
    } else {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
  } catch (error) {
    console.error(`❌ Failed to create ${account.email}: ${error.message}`);
    return null;
  }
}

async function createProfile(userId, account) {
  try {
    // Create profile via REST API with upsert logic
    const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        id: userId,
        email: account.email,
        full_name: account.full_name,
        role: account.role,
        phone: account.phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    // If conflict, try UPDATE instead
    if (response.status === 409 || (response.ok === false && !response.ok)) {
      console.log(`⚠️ Profile conflict for ${account.email}, trying update...`);
      const updateResponse = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'apikey': SERVICE_ROLE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          full_name: account.full_name,
          role: account.role,
          phone: account.phone,
          updated_at: new Date().toISOString(),
        }),
      });
      
      if (updateResponse.ok) {
        console.log(`✓ Profile updated: ${account.email}`);
        return { success: true, email: account.email };
      } else {
        throw new Error(await updateResponse.text());
      }
    }

    if (response.ok) {
      return { success: true, email: account.email };
    } else {
      const error = await response.text();
      console.error(`⚠️ Profile creation issue: ${account.email} - ${error.substring(0, 100)}`);
      return null;
    }
  } catch (error) {
    console.error(`⚠️ Profile error for ${account.email}: ${error.message}`);
    // Don't fail the whole process if profile fails - auth user is still created
    return { success: true, email: account.email, profileSkipped: true };
  }
}

async function main() {
  console.log('\n🚀 Starting EHR Midwifery Demo User Creator...\n');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}\n`);

  let createdCount = 0;
  let skippedCount = 0;
  const errors = [];

  // Create each demo account
  for (const account of DEMO_ACCOUNTS) {
    console.log(`👤 Creating ${account.role.toUpperCase()} account:`);
    console.log(`   Email: ${account.email}`);
    console.log(`   Password: ${account.password}`);
    console.log(`   Full Name: ${account.full_name}`);
    console.log(`   Phone: ${account.phone}`);
    console.log(`   Role: ${account.role}\n`);

    try {
      // Create auth user
      const result = await createUser(account);
      if (result && result.success) {
        createdCount++;
        
        // Wait for user creation to propagate
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create corresponding profile
        await createProfile(result.userId, account);
        console.log('✅ Account created successfully!\n');
      } else if (result === null) {
        skippedCount++;
        console.log('~ User already exists, skipping...\n');
      }
    } catch (error) {
      errors.push({ email: account.email, error: error.message });
      console.error(`❌ Failed to create ${account.email}: ${error.message}\n`);
    }
    
    console.log('---\n');
  }

  // Summary
  console.log('========================================');
  console.log('✨ SEEDING COMPLETE!');
  console.log('========================================\n');
  console.log(`Created: ${createdCount} accounts`);
  console.log(`Skipped (already existed): ${skippedCount} accounts`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Total processed: ${createdCount + skippedCount}/${DEMO_ACCOUNTS.length}\n`);

  // Print any errors
  if (errors.length > 0) {
    console.log('⚠️ ERRORS ENCOUNTERED:\n');
    errors.forEach(err => {
      console.log(`  • ${err.email}: ${err.error}`);
    });
    console.log('');
  }

  if (createdCount > 0) {
    console.log('🎉 SUCCESS! Demo accounts have been created.\n');
    console.log('You can now login with these credentials:\n');
    DEMO_ACCOUNTS.forEach((acc, idx) => {
      console.log(`${idx + 1}. ${acc.role.toUpperCase()} Account`);
      console.log(`   Email: ${acc.email}`);
      console.log(`   Password: ${acc.password}`);
      console.log(`   Full Name: ${acc.full_name}`);
      console.log('');
    });

    console.log('To start testing:');
    console.log('  1. cd D:\\panduan_bimbingan_saja\\ehr-midwifery');
    console.log('  2. npm run dev');
    console.log('  3. Go to http://localhost:3000/login');
    console.log('  4. Login with any demo account above\n');
  } else {
    console.log('ℹ️  All accounts already exist or no accounts were created.');
    console.log('Check logs above for details.\n');
  }
}

main();
