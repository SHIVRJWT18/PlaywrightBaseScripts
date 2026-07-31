import {test,expect,Locator} from '@playwright/test';

/*
| CSS Method             | Syntax                     | Example                            |
| ---------------------- | -------------------------- | ---------------------------------- |
| By ID                  | `#id`                      | `#username`                        |
| By Class               | `.className`               | `.login-btn`                       |
| By Tag                 | `tagname`                  | `input`                            |
| Tag + Class            | `tag.class`                | `button.submit`                    |
| Tag + ID               | `tag#id`                   | `input#email`                      |
| Multiple Classes       | `.class1.class2`           | `.btn.btn-primary`                 |
| Child (`>`)            | `parent > child`           | `div > input`                      |
| Descendant (space)     | `ancestor descendant`      | `form input`                       |
| Adjacent Sibling (`+`) | `element + sibling`        | `label + input`                    |
| General Sibling (`~`)  | `element ~ sibling`        | `h2 ~ p`                           |
| Attribute Exists       | `[attribute]`              | `[disabled]`                       |
| Attribute Equals       | `[attribute='value']`      | `[type='text']`                    |
| Attribute Starts With  | `[attribute^='value']`     | `[id^='user']`                     |
| Attribute Ends With    | `[attribute$='value']`     | `[id$='name']`                     |
| Attribute Contains     | `[attribute*='value']`     | `[class*='button']`                |
| Multiple Attributes    | `[attr1='v1'][attr2='v2']` | `input[type='text'][name='email']` |
| First Child            | `:first-child`             | `li:first-child`                   |
| Last Child             | `:last-child`              | `li:last-child`                    |
| Nth Child              | `:nth-child(n)`            | `tr:nth-child(3)`                  |
| Nth of Type            | `:nth-of-type(n)`          | `input:nth-of-type(2)`             |
| Not Selector           | `:not(selector)`           | `button:not(.disabled)`            |
| Empty Element          | `:empty`                   | `div:empty`                        |

*/
test("CSS Locator with PW", async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/"); 
    //1. tag with Id: tag#id  Or #id
  const elem1: Locator = page.locator("input#field1");
  expect(elem1).toBeVisible();
  await elem1.fill("T-shirt");

  // 2. tag with class: tag.class Or .class
  const elem2:Locator = page.locator("h3.post-title.entry-title");
  console.log(await elem2.textContent());

  //3. tag with any other attribute: tag[AName=AValue] Or [AName=AValue]
  const elem3: Locator = page.locator("input[placeholder='Enter EMail']"); 
  await elem3.fill("P-shirt");

  //4. tag with class and any other attribute: tag.class[AName=AValue] Or .class[AName=AValue]
  const elem4: Locator =  page.locator("input.form-check-input[id=thursday]");
  expect(elem4).toBeVisible();

   // 5. without tagname as its optional
    const elem5: Locator = page.locator("#field2");  //id
    await elem5.fill("K-shirt");
    const elem6: Locator = page.locator("textarea.form-control");  //class
    await elem6.fill("Greater Noida");
    console.log(await elem6.textContent());
    const elem7: Locator = page.locator("[for=tuesday]"); // [AN-AV]
    console.log(await elem7.textContent());
    const elem8: Locator = page.locator(".form-control[maxlength='25']"); // .class[AN=AV]
    await elem8.fill("abc123t@gmail.com ");

});