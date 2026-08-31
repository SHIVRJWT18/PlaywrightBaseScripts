import {test,expect} from '@playwright/test';
/** API Response Headers:
1. Response headers contain additional information and metadata about the response sent from the 
   server to the API client.
2. Common response headers include Content-Type, Content-Length, Server, Date, Connection, 
   and Authorization-related information.
3. Methods Used to Fetch Response Headers: 
3.1 headers() method: 
    • This method is used to retrieve all the response headers as an object. 
    • It Returns the headers as an object.

3.2 headersArray() method: 
     • This method is used to retrieve all the response headers as an array of key-value pairs.
     • It provides a convenient way to access and inspect the headers returned by the server.
 */

test('1. Fetch Response Header by headers() method', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/11',
    { 
     headers: {
                Accept: 'application/json'
     } }
    );
    const fetchHeader = await response.headers();
    console.log("Print Response Header:", fetchHeader);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');       
   
    // Validating Headers
    expect (fetchHeader).toHaveProperty('content-type', 'application/json; charset=utf-8');
    expect (fetchHeader.server).toBe('Heroku');
    
    // If word is separated by hyphen, then use [''] to access the value of that key.
    expect (fetchHeader['x-powered-by']).toBe('Express');  
});

test('2. Fetch Response Header by headersArray() method', async ({request}) => {
    const response = await request.get('https://api.demoblaze.com/entries',
    { 
     headers: {
                Accept: 'application/json'
     } }
    );
    const fetchHeaderArray = response.headersArray();
    console.log("Print Response Header:", fetchHeaderArray);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');       
   
    // Validating Headers
    expect(fetchHeaderArray.length).toBe(7);    
    expect(fetchHeaderArray[5]).toEqual({name: 'server',value: 'Google Frontend'});
    expect (fetchHeaderArray[6]).toEqual({name: 'Transfer-Encoding',value: 'chunked'});
    expect(fetchHeaderArray[2]).toEqual({name: 'content-encoding',value: 'gzip'});

    // Printing all the headers in the array
    console.log("================================");
    fetchHeaderArray.forEach((header) => {
        console.log(`Header Name: ${header.name}, Header Value: ${header.value}`);
    });
});