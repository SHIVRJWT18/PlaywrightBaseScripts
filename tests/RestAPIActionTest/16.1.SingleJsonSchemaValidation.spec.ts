import {test, expect} from '@playwright/test';
import Ajv from 'ajv';  
import ExpectedSchema from './16.2.ExpectedSchema.json';
import { title } from 'process';

// Import the JSON schema file

/* A. JSON Schema Validation: JSON Schema is used for validating the structure and content of JSON data.
    It ensure that the JSON response from an API has the expected format, data types, and required fields. 
    1. All required fields exist in the response.
    2. Every field has the correct data type.
    3. Objects and arrays have the expected structure.
    4. Unexpected changes to the API response are detected.

B. JSON Schema Validation Methods:
   1. Playwright does not have schema validation by default, 
   2. Using external libraries like Ajv (Another JSON Schema Validator) or Joi to perform the validation.
   3. These libraries provide methods to validate JSON response against JSON schema.
   4. Install Ajv library using npm or yarn:
      >> npm install ajv
      >> npm install --save-dev @types/json-schema
   5. Create Schema Folder and define the expected JSON schema file.
 */
test('JSON Schema Validation Test', async ({ request }) => {
  const resp = await request.get('https://jobs.postmanatwork.com/jobs/wKZeh4-TrRb40RyAyNcKF');
    const responseBody = await resp.json();
    console.log("Print Response Body:", responseBody);
    const ajv = new Ajv();
    const validate = ajv.compile(ExpectedSchema);
    const result = validate(responseBody);
    expect(result).toBe(true);
 
});

/* Expected Schema:
{
  id: 'wKZeh4-TrRb40RyAyNcKF',
  title: 'Sales Support Intern',
  url: 'https://www.postman.com/company/careers/sales-support-intern-4668632003',
  created_at: '2021-10-05T11:05:57.260Z',
  company: 'Postman',
  location: 'Remote',
  country: 'Bangalore',
  description: ''
} */