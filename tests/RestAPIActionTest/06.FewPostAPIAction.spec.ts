import {test,expect} from '@playwright/test';

/*
Response JSON: Searched products list
{"responseCode": 200, "brands": [{"id": 1, "brand": "Polo"}, {"id": 2, "brand": "H&M"}, ..]}
*/

// 1. POST to verify valid login credentials
test('1. Post to verify Login', async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', 
        {
        form: {
            email: 'msch123@gmail.com',
            password: 'Test1234'
        }
    });
    const responseBody = await response.json();
    console.log("Print POST responseBody", responseBody);
    //expect(responseBody.brands[0]).toHaveProperty('id', 1);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User exists!');
});

// 2. POST to verify invalid login credentials
test('2. Post to verify invalid Login', async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', 
        {
        form: {
            email: 'invalid@gmail.com',
            password: 'invalidpassword'
        }
    });
    const responseBody = await response.json();
    console.log("Print POST responseBody", responseBody);
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');
});

// 3. POST to verify missing login credentials
test('3. Post to verify missing Login', async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', 
        {
        form: {
            email: 'invalid@gmail.com'
        }
    });
    const responseBody = await response.json();
    console.log("Print POST responseBody", responseBody);
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
});

//4. Verify API Post request with actual Web UI Action (Add product to cart)
test('4. Validate Post request with Web UI', async ({request,page}) => {
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
const cartItem = page.locator('tr.success').first();
const productName = await cartItem.locator('td:nth-child(2)').textContent();
console.log("Print Web UI Product Name", productName);
expect(productName).toBe('Samsung galaxy s6');
});