import {test,expect,Locator, Frame } from '@playwright/test';

/* An I-Frame Or inline frame is an HTML element that allows to enbed another HTML document 
within the current document. They are commonly used to enbed external content such as Videos,
maps, Or other webpages into a web page without affecting the parent document. */

test('Handle IFrame Action',async ({page}) => {
await page.goto("https://ui.vision/demo/webtest/frames/");

//count the no.of frames in webpage
const frames = page.frames()
console.log("No. of Frames:",frames.length); 

//1. Approach 1: Using page.frame() - We can use Url or name of the frame only using this method
const frame1 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1"});
if(frame1)
{
    const f1textbox:Locator = frame1.locator("[name='mytext1']");
    await f1textbox.fill("Dharmendra Bhadoria"); // way1
    
    //await frame1.fill("[name='mytext1']","Rakesh Bhadoria"); //way2
    await page.waitForTimeout(4000);
    console.log("Entered text:",await f1textbox.inputValue());    
}    
else
{
    console.log("Frame is not available");
}

//2. Approach 2: Using framelocator - // We can use any attribute of frame such as id, name using frame.locator()
const frame2 = page.frameLocator("[src='frame_4.html']").locator("[name='mytext4']"); 
frame2 .fill("Puneet Aggarwal")
await page.waitForTimeout(3000);
console.log("Entered text:",await frame2.inputValue());        
});


test('Handle Frame Action',async ({page}) => {
await page.goto("https://ui.vision/demo/webtest/frames/");
page.frameLocator("frame[src='frame_5.html']").locator("[name='mytext5']").fill("Sonu Bhaodria");
await page.waitForTimeout(3000);

const frame5 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_5"}); 
if(frame5)
{ 
 // Click the link
 const linkelem = frame5.locator("[href='https://a9t9.com']").click();

  const logo = frame5.locator("#header img");
  await expect(logo).toBeVisible();
}    
else
{
    console.log("Frames and its child frames are not found");
}
});

