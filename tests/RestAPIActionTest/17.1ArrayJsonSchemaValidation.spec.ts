import {test,expect} from '@playwright/test';
import Ajv from 'ajv';  
import ExpectedArraySchema from './17.2.ExpectedArraySchema.json';

test('Array JSON Schema Validation Test', async ({ request }) => {
  const resp = await request.get('https://jobs.postmanatwork.com/jobs');
  const responseBody = await resp.json();   
    console.log("Print Response Body:", responseBody);

    const ajv = new Ajv();
    const validate = ajv.compile(ExpectedArraySchema);
    const result = validate(responseBody);
    expect(result).toBe(true);

});  

/* Expected Array Schema:[
  {
    "id": "br59u9Fu_IM_nwadYjRW7",
    "title": "API Network Evangelist ",
    "url": "https://www.postman.com/company/careers/api-network-evangelist-4738287003",
    "created_at": "2021-10-05T11:05:53.235Z",
    "company": "Postman",
    "location": "Remote",
    "country": "Remote"
  },
  {
    "id": "TB18MDx9h5tGkrZMUFycs",
    "title": "Customer Success Enablement Specialist",
    "url": "https://www.postman.com/company/careers/customer-success-enablement-specialist-4712535003",
    "created_at": "2021-10-05T11:05:53.956Z",
    "company": "Postman",
    "location": "Remote",
    "country": "US"
  },..........
 */