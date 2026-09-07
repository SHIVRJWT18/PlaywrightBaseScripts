import {test,expect} from '@playwright/test';

const baseUrl = 'https://api.restful-api.dev';
let prdId: string;
test.describe('API Request Chaining Test Suite', () => {
    test.describe.configure({ mode: 'serial' });
  // First API request to create user data 
  test('Create Product inside API', async ({ request }) => {
  const postResponse = await request.post(`${baseUrl}/objects`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
     "name": "Allahabad Bank",
     "data": {
     "year": 2026,
     "price": 1849.99,
     "CPU model": "Intel Core i96",
     "Hard disk size": "1.36 TB"
     } 
     }});

  expect(postResponse.status()).toBe(200);
  const postResponseBody = await postResponse.json();
  prdId = postResponseBody.id;
  console.log("Post Response Body:", postResponseBody);
  console.log("Product ID:", prdId);
});

test('Get Product inside API', async ({ request }) => {
  const getResponse = await request.get(`${baseUrl}/objects/${prdId}`);
  expect(getResponse.status()).toBe(200);
  const getResponseBody = await getResponse.json();
  console.log("Get Response Body:", getResponseBody);
});

test('Update Product inside API', async ({ request }) => {
  const patchResponse = await request.patch(`${baseUrl}/objects/${prdId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "name": "Prayagraj Bank"
    }
  });
  expect(patchResponse.status()).toBe(200);
  const patchResponseBody = await patchResponse.json();
  console.log("Patch Response Body:", patchResponseBody);
  expect(patchResponseBody.name).toBe("Prayagraj Bank");
});

test('Delete Product inside API', async ({ request }) => {
  const deleteResponse = await request.delete(`${baseUrl}/objects/${prdId}`);
  expect(deleteResponse.status()).toBe(200);
  const deleteResponseBody = await deleteResponse.json();
  console.log("Delete Response Body:", deleteResponseBody);

  const getResponseAfterDelete = await request.get(`${baseUrl}/objects/${prdId}`);
  expect(getResponseAfterDelete.status()).toBe(404);
  const getResponseBodyAfterDelete = await getResponseAfterDelete.json();
  console.log("Get Response Body After Delete:", getResponseBodyAfterDelete);
});
});