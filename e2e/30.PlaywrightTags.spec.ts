import { test,expect, Locator } from '@playwright/test';

/* Tags in Playwright:
1. Tagging is also kind of grouping the test level. It is used to run the set of tests based on tags
2.  Sanity
    Regression
    Smoke 
    Sanity,Regression   
3. To execute - Single tag use grep command to filter the groups-
> npx playwright test <testfile.spec.ts> --grep "tagname"
for e.g - npx playwright test TagsOfTests.spec.ts --grep "sanity"  // single tag
4. To execute - Combined tags use regular expression to include tags-
> (?=.*@sanity)  
 (?=.*@smoke)  
 (?=.*@sanity)(?=.*@regression) 
 (?=.*@sanity)(?=.*@smoke)    
for e.g - npx playwright test TagsOfTests.spec.ts --grep "(?=.*@santity)(?=.*@smoke)"  // multiple tag
5. To execute - either first OR second tag use OR operator to include tags-
for e.g - npx playwright test TagsOfTests.spec.ts --grep "@sanity | @smoke"  // either sanity Or smoke tag
6. To execute all the tags other than specified tag use grep invert command to include tags-
for e.g - npx playwright test TagsOfTests.spec.ts --grep invert"@regression"  // those tags not belong to regression tag
7. To execute all the first tag Not belong to second tag use grep invert command to include tags-
for e.g - npx playwright test TagsOfTests.spec.ts --grep "@sanity " --grep invert "@regression"  // those sanity not belong to regression tag
8. For global use - define tags anywhere in playwright.config.ts
export default defineConfig({
  grep: /@sanity/,
  grep: /(?=.*@sanity)(?=.*@regression) /,
  grepInvert: /@regression/,
});           */

// Approach 1: We can add tag before/after the title of test

test('@smoke Verify Url of application',async ({page}) => {   // Tag before the title
await page.goto("https://www.apple.com/")
await expect(page).toHaveURL("https://www.apple.com/");
});

test('Verify shop button @regression',async ({page}) => {  // Tag after the title
await page.goto("https://www.apple.com/")
const shopbtn = page.locator('[data-analytics-title="shop - education savings"]');
await expect(shopbtn).toBeVisible();
});

// We can add multiple tags before/after the title of test
test('@sanity @regression Verify title of application',async ({page}) => {   // Tag before the title
await page.goto("https://www.apple.com/")
await expect(page).toHaveTitle("Apple");
});

test(' Verify Sign-in link of application @sanity @smoke',async ({page}) => {   // Tag after the title
await page.goto("https://www.apple.com/")
await page.locator("a[href='/us/shop/goto/bag']").click();
await expect (page.locator("a[data-autom='sign-in']")).toBeVisible();
});

// Approach 2: Add single tag using {tag: '@tagname' } 
test('Get Options of dropdown', {tag: '@regression'}, async ({page}) => {
await page.goto("https://www.apple.com/")
const options = await page.locator("#ac-ls-dropdown-options-list li").allInnerTexts();
console.log("Get options:",options);
expect (options).toHaveLength(2);
});

//Add multiple tag using {tag: ['@tagname1','@tagname2']} 
test('Verify Support link', {tag: ['@regression','@smoke','@sanity']}, async ({page}) => {
await page.goto("https://www.apple.com/")
const suptlink = await page.locator("a[href='https://support.apple.com/kb/HT209218']");
console.log("Get link",await suptlink.innerText());
await expect (suptlink).toBeVisible();
});

