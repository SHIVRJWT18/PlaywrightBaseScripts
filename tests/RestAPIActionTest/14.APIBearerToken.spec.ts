import {test, expect} from '@playwright/test';

/*Bearer Token: It is a type of security token that is used to authorize API requests.
• User must include the token in the request headers to access protected resources.
• The server then validates the token to grants access to the resources based on its validity and permissions.  
*/

test('API Bearer Token Test', async ({ request }) => {  
 const response = await request.post('https://gorest.co.in/public/v2/users', {
    headers: {
    accept: 'application/json',
    "Authorization": "Bearer dbe2d640e02ef15758674ecab38f366ab8a13588b9dfea32f851e117757fda63"
    },
    data: {
        "name": "Bhadoriya Rakesh",
        "email": "bhadoriarakesh123@example.com",
        "gender": "male",
        "status": "active"
    }    
  });
  expect(response.status()).toBe(201);
  console.log(response.statusText());
  console.log(await response.json())
});    