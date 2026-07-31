import {test,expect} from '@playwright/test';

/*
Response JSON: Searched products list
{"responseCode": 200, "brands": [{"id": 1, "brand": "Polo"}, {"id": 2, "brand": "H&M"}, ..]}
*/

// 1. POST to verify valid login credentials
test('Post to verify Login', async ({request}) => {
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
test('Post to verify invalid Login', async ({request}) => {
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
test('Post to verify missing Login', async ({request}) => {
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
