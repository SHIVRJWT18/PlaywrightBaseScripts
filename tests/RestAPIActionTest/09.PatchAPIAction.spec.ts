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
// 1. Get booking id detail before update
test('Get booking id detail', async ({request}) => {
const response = await request.get('https://restful-booker.herokuapp.com/booking/201',
    {
      headers: {
        Accept: "application/json"
      }
      });  
const responseBody = await response.json();
console.log("GET before update responseBody", responseBody);
expect(responseBody.firstname).toBe('Josh'); 

});
// 2. Update last name of booking id -> 2
test('Partial update booking', async ({request}) => {
    const response = await request.patch(
        'https://restful-booker.herokuapp.com/booking/201',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: {
                firstname: 'Partially Updated',
            }
        }
    );
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('PATCH response:', responseBody);

    expect(responseBody.firstname).toBe('Partially Updated');    
});

   