import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173');
    
    // Wait for the app to load
    await page.waitForTimeout(2000);
    
    // Check if embla is populated
    const slides = await page.$$('.embla__slide, .touch-pan-y > div');
    console.log("Number of slides found:", slides.length);
    
    // Click spin
    const spinBtn = await page.$('button:has-text("SPIN"), button:has(.lucide-power)');
    if (spinBtn) {
        console.log("Spin button found, clicking...");
        await spinBtn.click();
        await page.waitForTimeout(1000);
        // check if transformed
        const container = await page.$('.touch-pan-y');
        const style = await page.evaluate(el => el.style.transform, container);
        console.log("Container transform after play:", style);
    } else {
        console.log("Spin button not found");
    }
    
    await browser.close();
})();
