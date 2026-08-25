import {test,expect} from '@playwright/test';
// 1. By passing headers and body as data type in test block
test('1. Put to update existing booking', async ({request}) => {
    const response = await request.put('https://restful-booker.herokuapp.com/booking/1',
    {
        headers: {
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        data: {
        "firstname" : "Shivika",
        "lastname" : "Sharma",
        "totalprice" : 1014,
        "depositpaid" : true,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast-Vegan"
}
    });
    expect(response.status()).toBe(200);
    expect(await response.statusText()).toBe("OK");
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json(); 
    console.log("Print PUT responseBody", responseBody);
    expect(responseBody).toHaveProperty('firstname', 'Shivika');
    expect(responseBody).toHaveProperty('additionalneeds', 'Breakfast-Vegan');
    expect(responseBody).toMatchObject({    //   Validate JSON response
       firstname: 'Shivika',
       lastname: 'Sharma',
       totalprice: 1014,
       depositpaid: true,
       bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
       additionalneeds: 'Breakfast-Vegan'
});

const rspnseGet = await request.get('https://restful-booker.herokuapp.com/booking/1');
console.log("GET responseBody after PUT", await rspnseGet.json());
});


