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
// 1. Get with Path Parameter
test('1. Get with Headers and Path Parameter', async () => {    // Here request is APIRequest from import  
    const req = await request.newContext({
      baseURL: 'https://restful-booker.herokuapp.com',
      extraHTTPHeaders: {
        Accept: "application/json"
      }
      }); 
    const response = await req.get('/booking/20');   
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print Get with Path Parameter:", responseBody);
    expect(responseBody).toHaveProperty('firstname', 'Susan');
    expect(responseBody).toHaveProperty('additionalneeds', 'Breakfast');
  
});

//2. Get with Query Parameter
test('2. Get with Headers and Query Parameter', async () => {      // Here request is APIRequest from import 
    const req = await request.newContext({
      baseURL: 'https://restful-booker.herokuapp.com',
      extraHTTPHeaders: {
        Accept: "application/json"
      }
      }); 
    // Way 1 - Using Query Parameter in URL  
    const response = await req.get('/booking?firstname=Susan&lastname=Brown');   
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print Get with Query Parameter 1:", responseBody);
    

    // Way 2 - Using Query Parameter in Options
    const response2 = await req.get('/booking', {
      params: {
        firstname: 'Josh',
        lastname: 'Allen'
      }
    });
    expect(response2.ok()).toBeTruthy();
    const responseBody2 = await response2.json();
    console.log("Print Get with Query Parameter 2:", responseBody2);
    

    
});

