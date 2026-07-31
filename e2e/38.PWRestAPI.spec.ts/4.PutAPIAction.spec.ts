import {test,expect} from '@playwright/test';

test('Update user account detail by email', async ({request}) => {
    const response = await request.put('https://automationexercise.com/api/updateAccount',
    {
        form: {
                name: 'Mayank Singh',
                email: 'msch123@gmail.com',
                password: 'Test1234',
                title: 'Mr',
                birth_date: '10',
                birth_month: '10',
                birth_year: '1990',
                firstname: 'Mayank',
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