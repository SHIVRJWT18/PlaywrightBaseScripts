import {test,expect,request} from '@playwright/test'    // Here request is APIRequest
/**
 1. Ways to Provide baseURL with Headers-
   • With HTTP Method.
   • By using request context in Test block
   • By Using request context in with beforeAll
   • In Playwright.config.ts file-
     use: {
     baseURL: 'https://restful-booker.herokuapp.com/booking',
     extraHTTPHeaders: {
      Accept: "application/json"
    }
     };
 */
// 1. Get 3rd Booking IDs Request
test('1. Get with Headers in HTTP request using APIRequest', async ({request}) => {    // Here request is APIRequestContext   
    const response = await request.get('https://restful-booker.herokuapp.com/booking/3', {
      headers: {
        Accept: "application/json"
      }
      });  
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print 3rd Booking:", responseBody);
    expect(await responseBody).toMatchObject({ 
    firstname: 'Susan',
    lastname: 'Jones',
    totalprice: 300,
    depositpaid: true,
    bookingdates: { checkin: '2016-05-11', checkout: '2022-11-03' }
    }); 
 });

//2. GET 4th Booking IDs Request
test('2. Get with Headers using APIRequest', async () => {      // Here request is APIRequest from import 
 const req = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/booking/4', 
    extraHTTPHeaders: {
      Accept: "application/json"
    }
 });    
    const response = await req.get('/booking');                      
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print 4th Booking:", responseBody[3]);
});

//3. Specifying base url with headers inside hooks and get 5th Booking IDs
let req2: any;
test.beforeAll("Before All the tests", async() => {
    req2 = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/booking/5',
    extraHTTPHeaders: {
      Accept: "application/json"
    }
  });
 });

test.afterAll(async () => {
  await req2.dispose();
});  
 
  test('3. Get request using BeforeALL Hook', async () => {
  const myreq = await req2.get('/booking');
  expect(myreq.status()).toBe(200);
  const responseBody = await myreq.json();
  console.log("Print 4th Booking:", responseBody[4]);
});

//4. Get request using baseURL in Playwright.config.ts file
test.skip('4. Get request using baseURL with headers in Playwrightconfig file', async ({request}) => {
  const response = await request.get('/booking'); 
  const responseBody = await response.json();
  console.log("Print GET responseBody", responseBody);
}); 


