import {test,expect} from '@playwright/test'

// 1. Get all brands list
test('Get Brand Request', async ({request}) => {
    const response = await request.get('https://automationexercise.com/api/brandsList');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print GET responseBody", responseBody);
    expect(responseBody.brands[0]).toHaveProperty('id', 1);
});

//2. GET user account detail by email
test('Get User email Request', async ({request}) => {
    const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
        params: {
            email: 'test@example.com'
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print GET responseBody", responseBody);
    expect(responseBody.user).toHaveProperty('email', 'test@example.com');
    expect(responseBody.user).toHaveProperty('name', 'cv  cxd');
    expect(responseBody.user).toHaveProperty('zipcode');
});

//3. Invalid GET request to test error handling
test('Invalid GET Request', async ({request}) => {
  const response = await request.post('https://automationexercise.com/api/productsList');
  const responseBody = await response.json();
  console.log("Print GET responseBody", responseBody);
  expect(responseBody.responseCode).toBe(405);
  expect (responseBody.message).toBe('This request method is not supported.');

  
});
