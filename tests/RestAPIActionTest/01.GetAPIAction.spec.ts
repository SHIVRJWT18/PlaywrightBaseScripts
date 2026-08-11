import {test,expect,request} from '@playwright/test'    // Here request is APIRequest
/**
 1. A GET request is an HTTP request method used to retrieve user/customer information
 2. Components to use -
    • BaseURL + Resource + Query and/or Path Params
    • Header (if required)
 3. Ways to Provide baseURL -
   • With HTTP Method.
   • By using request context in Test block
   • By Using request context in with beforeAll
   • In Playwright.config.ts file-
     use: {
     baseURL: 'https://restful-booker.herokuapp.com/booking',
     };
 */
// 1. Get all Booking IDs Request
test('1. Get request using APIRequestContext', async ({request}) => {     // Here request is APIRequestContext
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print all Bookings:", responseBody);
    
});

//2. GET 1st Booking IDs Request
test('2. Get request using APIRequest', async () => {     // Here request is APIRequest from import 
 const req = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/booking',
 });    
    const response = await req.get('/booking');                      
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print 1st Booking:", responseBody[0]);
    expect(responseBody[0]).toHaveProperty('bookingid', 1);
});

//3. Specifying base url inside hooks and get 2nd Booking IDs
let req2: any;
test.beforeAll("Before All the tests", async() => {
    req2 = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/booking',
  });
 });

test.afterAll(async () => {
  await req2.dispose();
});  
 
  test('3. Get request using BeforeALL Hook', async () => {
  const myreq = await req2.get('/booking');
  expect(myreq.status()).toBe(200);
  const responseBody = await myreq.json();
  console.log("Print 2nd Booking:", responseBody[1]);
  expect(responseBody[1]).toHaveProperty('bookingid', 2);
});

//4. Get request using baseURL in Playwright.config.ts file
test.skip('4. Get request using baseURL in Playwright.config.ts file', async ({request}) => {
  const response = await request.get('/booking'); 
  const responseBody = await response.json();
  console.log("Print GET responseBody", responseBody);
}); 

//5. Validate Get request with Web UI
test('5. Validate Get request with Web UI', async ({request,page}) => {
  const response = await request.get('https://api.demoblaze.com/entries');
  const responseBody = await response.json(); 
  console.log("Print GET responseBody", responseBody);
  console.log(responseBody.Items[0].title);
  await page.goto('https://demoblaze.com/');
  const title = await page.locator('h4.card-title').first().textContent();
  console.log("Print Web UI Title", title);
  expect(title).toBe(responseBody.Items[0].title);
});

//6. Invalid GET request to test error handling
test('Invalid GET Request', async ({request}) => {
  const response = await request.get('https://automationexercise.com/api/productsList');
  const responseBody = await response.json();
  console.log("Print GET responseBody", responseBody);
  expect(responseBody.responseCode).toBe(405);
  expect (responseBody.message).toBe('This request method is not supported.');
  });



