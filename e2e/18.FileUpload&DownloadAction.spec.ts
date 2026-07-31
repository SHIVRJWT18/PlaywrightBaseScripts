import {test,expect,Locator} from '@playwright/test';

test('Single FileUpload Action',async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/file-upload.php");
await page.locator("[data-testid='upload-browse-btn']").setInputFiles("C://Users//Dell//Downloads//sampleone.pdf");
await page.waitForTimeout(3000);
const upldstatus:string = await page.locator("[data-testid='upload-file-info']").innerText();
console.log("Uploaded Files:", upldstatus);
expect(upldstatus).toContain("sampleone.pdf");
});

test('Multiple FileUpload Action',async ({page}) => {
await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
await page.locator("[name='filesToUpload']").setInputFiles([
"C://Users//Dell//Downloads//Comp table.png","C://Users//Dell//Downloads//BILL_133406992369.pdf",
"C://Users//Dell//Downloads//sampleFile.jpeg"])
const upldstatus:string[] = await page.locator("#fileList >li").allInnerTexts();
console.log("Uploaded Files:", upldstatus);

await page.waitForTimeout(4000);
const noOfFilesupld:number = await page.locator("#fileList > li").count();
expect(noOfFilesupld).toBe(3);

// Removing of Uploaded Files
await page.reload();
console.log("Uploaded Files:", await page.locator("#fileList >li").first().innerText());
});

test('FileDownload Action',async ({page}) => {
await page.goto('https://demoqa.com/upload-download');

const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("//a[normalize-space()='Download']").click()
    ]);

    console.log("Downloaded File:", download.suggestedFilename());

    await download.saveAs(`downloads/${download.suggestedFilename()}`);
});
