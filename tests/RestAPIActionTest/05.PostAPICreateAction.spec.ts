import {test,expect} from '@playwright/test';

/**
 * 1. POST requests are primarily used to create new data or update existing data on the server.
   2. Components Used in POST Call
      Components to use -
      • BaseURL + Resource
      • Header (if required) 
        Common headers include:- Content-Type, Authorization and Accept
      • Body (data)
        Common formats include:- JSON (JavaScript Object Notation) and XML 
   3. Ways to Provide baseURL with Headers-
      • With HTTP Method.
      • By using request context in Test block
      • By Using request context in with beforeAll
      • In Playwright.config.ts file-
        use: {
        baseURL: 'https://restful-booker.herokuapp.com/booking',
        extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json"
         }
        };
*/

// 1. By passing headers and body as data type in test block
test('1. Post to create new booking', async ({request}) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking',
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
            "firstname": "Puneet",
            "lastname": "Aggarwal",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-01-01",
                "checkout": "2023-01-02"
            },
            "additionalneeds": "Lunch"
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json(); 
    console.log("Print POST responseBody", responseBody);
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking).toHaveProperty('firstname', 'Puneet');
    expect(responseBody.booking).toHaveProperty('lastname', 'Aggarwal');
});

// 2. By passing headers and body as form type in test block
test('2. Post to create new user account', async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/createAccount',
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
 form: {
        name: 'Pradeep Kumar',
        email: 'kumaradi1246@example.com',
        password: 'Test@1023',
        title: 'Mr',
        birth_date: '15',
        birth_month: '08',
        birth_year: '1995',
        firstname: 'Pradeep',
        lastname: 'Kumar',
        company: 'ABC Technologies',
        address1: 'Sector q62',
        address2: 'Near Metro Station',
        country: 'India',
        zipcode: '201309',
        state: 'Uttar Pradesh',
        city: 'Lucknow',
        mobile_number: '3376558210'
      }
    });
  const responseBody = await response.json(); 
  expect(response.status()).toBe(200);
  console.log('Print POST responseBody:', responseBody);
  expect(responseBody).toHaveProperty('responseCode', 201);
  expect(responseBody).toHaveProperty('message', 'User created!');
});

test('3. Get created user account detail', async ({request}) => {
const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=kumaradi1246@example.com');
const responseBody = await response.json();
console.log("Print GET responseBody", responseBody);
expect(responseBody.responseCode).toBe(200);
expect(responseBody.user.email).toBe('kumaradi1246@example.com');
expect(responseBody.user.name).toBe('Pradeep Kumar'); 
});  


