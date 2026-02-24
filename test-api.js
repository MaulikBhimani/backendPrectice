// test-api.js - Simple API Testing Script
// Run: node test-api.js

const API_BASE = 'http://localhost:3000';

// Test Login
async function testLogin(email, password) {
  console.log(`\n🧪 Testing Login: ${email}`);
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success:', response.status);
      console.log('Token:', data.token?.substring(0, 50) + '...');
      return data.token;
    } else {
      console.log('❌ Failed:', response.status);
      console.log('Message:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return null;
  }
}

// Test Get Users (with token)
async function testGetUsers(token) {
  console.log('\n🧪 Testing Get Users (Protected)');
  
  try {
    const response = await fetch(`${API_BASE}/api/user`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success:', response.status);
      console.log('Users found:', data.length);
      console.log('First user:', data[0]?.name);
    } else {
      console.log('❌ Failed:', response.status);
      console.log('Message:', data.message);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

// Test Create Ticket
async function testCreateTicket(token) {
  console.log('\n🧪 Testing Create Ticket');
  
  try {
    const response = await fetch(`${API_BASE}/api/tickets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Ticket',
        description: 'This is a test ticket created by test script',
        priority: 'HIGH'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success:', response.status);
      console.log('Ticket ID:', data.id);
      console.log('Title:', data.title);
      return data.id;
    } else {
      console.log('❌ Failed:', response.status);
      console.log('Message:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return null;
  }
}

// Run All Tests
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log('Server:', API_BASE);
  
  // Test 1: Valid Login
  const token = await testLogin('manager@example.com', 'password123');
  
  // Test 2: Wrong Password
  await testLogin('manager@example.com', 'wrongpassword');
  
  // Test 3: Wrong Email
  await testLogin('notexist@example.com', 'password123');
  
  // Test 4: Missing Password
  await testLogin('manager@example.com', undefined);
  
  if (token) {
    // Test 5: Get Users (Protected)
    await testGetUsers(token);
    
    // Test 6: Create Ticket
    await testCreateTicket(token);
  }
  
  console.log('\n✅ All tests completed!');
}

// Run
runTests();
