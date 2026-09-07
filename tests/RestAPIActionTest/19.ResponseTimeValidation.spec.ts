import {test,expect} from '@playwright/test';
/*
Response Time Validation - 
1. It is a non-functional check to validate the response time of the API request against the 
expected response time threshold. If the response time exceeds the threshold, the test will fail.
2. Date.now() is used to get the current timestamp in milliseconds, 
3. The difference in the responseEnd and requestStart timestamps determines the response time. 
*/

test('Response Time Validation Test', async ({ request }) => {
  const startTime = Date.now();
  console.log("Start Time:", startTime, "ms");
  await request.get('https://jsonplaceholder.typicode.com/users');
  const endTime = Date.now();
  console.log("End Time:", endTime, "ms");
  const responseTime = endTime - startTime;
  console.log("Response Time:", responseTime, "ms");
  const expectedResponseTimeThreshold = 2000;
  expect(responseTime).toBeLessThan(expectedResponseTimeThreshold);
});


test('Response Time Difference', async ({ request }) => {
    const resp = await request.get('https://jsonplaceholder.typicode.com/users');
  const responseTime = resp.timing().responseEnd - resp.timing().requestStart;
  console.log("Response Time:", responseTime, "ms");
  const expectedResponseTimeThreshold = 2000;
  expect(responseTime).toBeLessThan(expectedResponseTimeThreshold);
});
