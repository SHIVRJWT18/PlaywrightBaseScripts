import {test, expect} from '@playwright/test';

test('API Authentication Token Test', async ({ request }) => {
 let response = await request.put('https://restful-booker.herokuapp.com/booking/6', {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
    },
    data: {
        "firstname" : "Samay1",
        "lastname" : "Sahoo",
        "totalprice" : 12479,
        "depositpaid" : false,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Get your token"
    }
  });
  expect(response.status()).toBe(200);
response = await request.get('https://restful-booker.herokuapp.com/booking/6', {
       headers: {
      'Content-Type': 'application/json',
       }
}); 
console.log(await response.json())
});

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