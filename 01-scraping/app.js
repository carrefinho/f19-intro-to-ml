const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const options = {
        headless: true,
        defaultViewport: null
        // slowMo: 250 // slow down for easy debugging
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // could be anyone
    await page.goto('https://twitter.com/realdonaldtrump');

    // scroll a certain amount, takes a while
    await autoScroll(page);

    let tweets = await page.evaluate(() => {
        let results = [];
        
        // select only original tweets not retweets
        let timelineItems = document.querySelectorAll("div.tweet.original-tweet:not(.tweet-has-context) > div.content > div.js-tweet-text-container > p");

        timelineItems.forEach((item) => {
            results.push(item.innerText)
        })

        return results;
    })

    let text = '';
    tweets.forEach((item) => {
        text = text + item + '\r\n';
    })

    // console.log(text);
    fs.writeFile("dt.txt", text, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    
    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let distance = 900;
            let scrollCount = 0;
            let scrollTimes = 700;

            let timer = setInterval(() => {
                window.scrollBy(0, distance);
                scrollCount++;

                if(scrollCount > scrollTimes){
                    clearInterval(timer);
                    resolve();
                } 
            }, 20);
        });
    });
}