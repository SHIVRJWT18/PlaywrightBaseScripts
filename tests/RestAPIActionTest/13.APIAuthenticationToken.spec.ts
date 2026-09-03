import {test, expect} from '@playwright/test';

/* Authentication Token: A security token is an authentication credential used to verify a user or 
application's identity when making API requests. 
• It is issued by an authentication server and sent in API request headers. 
• Common types include JWT and OAuth tokens.
*/  
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



