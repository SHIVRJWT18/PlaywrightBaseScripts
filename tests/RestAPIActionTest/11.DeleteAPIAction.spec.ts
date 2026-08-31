import {test,expect} from '@playwright/test';

test.skip('Delete User Request', async ({request}) => {
    const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
        form: {
            email: 'kumaradi1246@example.com',
            password: 'Test@1023'                 
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Print DELETE responseBody", responseBody);
    expect.soft(responseBody.responseCode).toBe(200);
    expect.soft(responseBody.message).toBe('Account deleted!');
});

test('Delete the Booking Request', async ({request}) => {
    let response = await request.delete('https://restful-booker.herokuapp.com/booking/11', {
        headers: {
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
    });
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');

    console.log('DELETE Status:', response.status());
    console.log('DELETE Status Text:', response.statusText())

    response = await request.get('https://restful-booker.herokuapp.com/booking/11');
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe('Not Found');
    const responseBodyGet = await response.text();
    console.log('GET response after DELETE:',responseBodyGet);
    expect(responseBodyGet).toBe('Not Found');
});