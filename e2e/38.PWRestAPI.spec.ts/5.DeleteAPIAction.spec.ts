import {test,expect} from '@playwright/test';

test('Delete User Request', async ({request}) => {
    const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
        form: {
            email: 'Testexample123@gmail.com',
            password: 'Test1234'
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print DELETE responseBody", responseBody);
    expect.soft(responseBody.responseCode).toBe(200);
    expect.soft(responseBody.message).toBe('Account deleted!');
});