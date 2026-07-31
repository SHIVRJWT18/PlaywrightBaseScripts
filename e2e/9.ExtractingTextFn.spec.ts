import {test,expect,locator, Locator} from '@playwright/test';

test('Comparing Methods', async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
const productsname: Locator = page.locator('.product-title'); // grp of locators
//1. inner text() Vs textcontent() --> Both are used for extracting text for single element locator
console.log(await productsname.nth(1).innerText()); // It captures exact visible text 
// here no triming is required while using innertext()
console.log(await productsname.nth(2).textContent()); // It captures text with white space,Line breaks & next lines (if present)  

for(let i=0;i<(await productsname.count());i++)
{
 //console.log(await productsname.nth(i).innerText()); // Returns the plain text
   console.log(await productsname.nth(i).textContent()); // Returns white space & Line breaks
// Hence while using textcontent() triming is required.
   const prdname : string|null = await productsname.nth(i).textContent();
   console.log(prdname?.trim()); // here ? treat as optional parameter b/w string or null
   console.log((await productsname.nth(i).textContent())?.trim()); // code optimization
}    

/*2. allInnertext() Vs allTextcontent() --> Both are used for extracting text for group of element 
without using normal for loop stmt */
const productsname1: Locator = page.locator('.product-title'); // grp of locators
const prdtnames1: string[] = await productsname1.allInnerTexts();
// Return array of element's text in plain text without spaces and line breaks 
console.log(prdtnames1);
const prdtnames2: string[] = await productsname1.allTextContents();
// Return array of element's text with space and Line breaks so again triming is required
const trimmedarray: string[] = prdtnames2.map(getprdtext => getprdtext.trim());
console.log(trimmedarray);


//3. all() method -->It return promise of array of locators:
/* Normal innertext() & textcontent() required a normal for loop to iterate over grp og elements but 
   allInnertext() & allTextContents by default return array of objects so we can use loops there AudioScheduledSourceNode
   if we want to iterate over grp of elements for normal innertext() & textContent() without any 
   traditional for loop then we use all method which itself return array of locators. */
const productsname2: Locator = page.locator('.product-title'); // grp of locators
const prdlocator: Locator[]=await productsname2.all(); /*It capture the locators of every element which is present in the 
locator of grp of element then stored in array variable */
console.log(prdlocator); // printing locator of all element in that grp 

// To access these locators we use indexes:
console.log("Second Element: ",await prdlocator[2].innerText()); // Getting inner text of 2nd element
// Now we can use for..of loops for the array instead of normal loop in point 1.
for(let prdloc of prdlocator)
{   
console.log("Locators array: ",await prdloc.innerText());
}
// Now we can use for..in loops used to get the index of the array
for(let idx in prdlocator)
{   
console.log("Locators index array: ",await prdlocator[idx].innerText());
}

});

/* Diff b/w Point1 - inner text() Vs textcontent() --> Both are used for extracting text for single element locator
            Point3 - all() --> used for extracting text of array of locators */
