import {test,expect} from '@playwright/test';

/**
 * 1. POST requests are primarily used to create new data on the server.
   2. POST requests can also be used to update data depending on API design.
   3. Components Used in POST Call
      Components to use -
      • BaseURL + Resource
      • Header (if required) 
        Common headers include:- Content-Type, Authorization and Accept
      • Body (data)
        Common formats include:- JSON (JavaScript Object Notation) and XML 
*/

// 1. POST create new booking request
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

// 2. POST create new user Account request
test('2. Post to create new user account', async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/createAccount',
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
 form: {
        name: 'Aditya Kumar',
        email: 'kumaradi123@example.com',
        password: 'Test@1023',
        title: 'Mr',
        birth_date: '15',
        birth_month: '08',
        birth_year: '1995',
        firstname: 'Aditya',
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

//3. Validate Post request with Web UI (Add product to cart)
test('3. Validate Post request with Web UI', async ({request,page}) => {
  const response = await request.post('https://api.demoblaze.com/addtocart', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
          "id":"2d64c475-28e4-a3ad-be60-bca5cd9d76f8",
          "cookie":"user=4f59ee9d-9537-accc-9174-88afda3037b7",
          "prod_id":1,
          "flag": false
         }
    }
  );
expect(response.status()).toBe(200);
await page.goto('https://demoblaze.com/cart.html');
const cartItem = await page.locator('tr.success').first();
const productName = await cartItem.locator('td:nth-child(2)').textContent();
console.log("Print Web UI Product Name", productName);
expect(productName).toBe('Samsung galaxy s6');
});
