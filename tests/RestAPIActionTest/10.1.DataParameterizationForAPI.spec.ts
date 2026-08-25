import {test,expect} from '@playwright/test';
import apiTestData from "../RestAPIActionTest/10.2.APITestData.json";

// 1. Data Parameterization for POST using JSON file
test('1. Post to create new booking', async ({request}) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking',
    {
     headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
     data: apiTestData.postTestData
    });
  const responseBody = await response.json(); 
  expect(response.status()).toBe(200);
  console.log('Print POST responseBody:', responseBody);
  expect(responseBody.booking).toHaveProperty('additionalneeds', 'Prayagraj Express');
});

// 2. Data Parameterization for PUT using JSON file
test('2. Put to update booking', async ({request}) => {
    const response = await request.put('https://restful-booker.herokuapp.com/booking/5',
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        },
     data: apiTestData.putTestData
    });
  const responseBody = await response.json(); 
  expect(response.status()).toBe(200);
  console.log('Print PUT responseBody:', responseBody);
  expect(responseBody).toHaveProperty('additionalneeds', 'Humsafar Express');
});

