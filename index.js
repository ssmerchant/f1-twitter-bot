const rwClient = require("./twitClient.js");
const CronJob = require("cron").CronJob;
const puppeteer = require('puppeteer')

var DriverList = [];
var DriverPointsList = [];

async function scrapeF1(url) {
    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox','--disable-setuid-sandbox']
                    });
    const page = await browser.newPage();
    await page.goto(url);

    // Scraping Driver's Names
    let i = 1;
    while (i < 6) {
        XPathDriver = '//*[@id="fittPageContainer"]/div[3]/div/div/section/div/section/section/div[1]/div/div[2]/table/tbody/tr[' + i + ']/td[1]/div/span[4]';
        const [Driver] = await page.$x(XPathDriver);
        var DriverName = await Driver.getProperty('textContent');
        var DriverNameTxt = await DriverName.jsonValue();
        DriverList.push(DriverNameTxt);
        i++;
    }
    // Scraping Driver's Points
    let j = 1;
    while (j < 6) {
        XPathPoints = '//*[@id="fittPageContainer"]/div[3]/div/div/section/div/section/section/div[1]/div/div[2]/table/tbody/tr[' + j + ']/td[2]/span';
        const [Driver] = await page.$x(XPathPoints);
        var DriverPoints = await Driver.getProperty('textContent');
        var DriverPointsTxt = await DriverPoints.jsonValue();
        DriverPointsList.push(DriverPointsTxt);
        j++;
    }
    browser.close();
}

const tweet = async () => {
    try {
        await rwClient.v2.tweet("This Week's Top 5 F1 Driver Standings:\n\n" + "1. " + DriverList[0] + ":   " + DriverPointsList[0] + " Points" +"\n"
                                                                        + "2. " + DriverList[1] + ":    " + DriverPointsList[1] + " Points" +"\n"
                                                                        + "3. " + DriverList[2] + ":    " + DriverPointsList[2] + " Points" +"\n"
                                                                        + "4. " + DriverList[3] + ":    " + DriverPointsList[3] + " Points" +"\n"
                                                                        + "5. " + DriverList[4] + ":    " + DriverPointsList[4] + " Points");
    } catch (e) {
        console.error(e)
    }
}

const job = new CronJob("*/20 * * * * *", () => {
    tweet()
    console.log('tweet sent');
})

// url to pull data from
scrapeF1('https://www.espn.com/f1/standings/_/season/2022');

job.start()