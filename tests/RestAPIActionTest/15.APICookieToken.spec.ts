import {test, expect} from '@playwright/test';

/* Cookie Token: It is a type of authentication token that is stored in a cookie on the client-side.    
• It is used to authenticate and authorize API requests by including the token in the request headers.
• The server validates the token and grants access to protected resources based on its validity and permissions.
*/

test('API Cookie Token Test ', async ({ request }) => {
// Create the Cookie Token
let response = await request.post('https://restful-booker.herokuapp.com/auth', {
    headers: {
      'Content-Type': 'application/json',   
    },
    data: {
        "username" : "admin",
        "password" : "password123"
    }
});
let token = (await response.json()).token;
console.log("Print Cookie Token:", token);

// Update the booking using the Cookie Token 
 response = await request.patch('https://restful-booker.herokuapp.com/booking/7', {
    headers: {
      'Content-Type': 'application/json',   
    accept: 'application/json',
    Cookie: `token=${token}`
    },
    data: {
         "firstname" : "Krishna",
         "lastname" : "Thakur"
    }
  });
  expect(response.status()).toBe(200);

  // Get the booking details after updating the booking
  response = await request.get('https://restful-booker.herokuapp.com/booking/7', {
       headers: {
      'Content-Type': 'application/json',
       }    
      }); 
  console.log(await response.json())
}); 
   
let getToken:any;
test.beforeAll(async ({ request }) => {
  // Create the Cookie Token
  const response = await request.post('https://restful-booker.herokuapp.com/auth', {  
    headers: {
      'Content-Type': 'application/json',   
    },  
    data: {
        "username" : "admin",
        "password" : "password123"  
    }
  });
  getToken = (await response.json()).token;
  console.log("Print Cookie Token:", getToken);
});

// Delete the booking using the Cookie Token
test('API Cookie Token Test with beforeAll hook', async ({ request }) => { 
 const resp = await request.delete('https://restful-booker.herokuapp.com/booking/45', {          
 headers: {
      'Content-Type': 'application/json',   
    accept: 'application/json',
    Cookie: 'token=' + getToken 
    }
  });
      expect(resp.status()).toBe(201);
    expect(resp.statusText()).toBe('Created');
});  