import {test,expect} from '@playwright/test';
/*
1. PUT is an HTTP request method used to update an existing resource or create a new resource if it does 
   not exist.
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

test('Update user account detail by email', async ({request}) => {
    const response = await request.put('https://automationexercise.com/api/updateAccount',
    {
        form: {
                name: 'Tanmay kumar',
                email: 'msch123@gmail.com',
                password: 'Test1234',
                title: 'Mr',
                birth_date: '10',
                birth_month: '10',
                birth_year: '1990',
                firstname: 'Tanmay kumar',
                lastname: 'Singh',
                company: 'ABC Company',
                address1: '123 Main Street',
                address2: 'Apartment 101',
                country: 'United States',
                zipcode: '12345',
                state: 'Uttar Pradesh',
                city: 'Prayagraj',
                mobile_number: '9876543210'
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print PUT responseBody", responseBody);
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User updated!');

});

test('Get updated user account detail', async ({request}) => {
const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=msch123@gmail.com');
const responseBody = await response.json();
console.log("Print GET responseBody", responseBody);
expect(responseBody.responseCode).toBe(200);
expect(responseBody.user.email).toBe('msch123@gmail.com');
expect(responseBody.user.name).toBe('Tanmay kumar'); 
});    