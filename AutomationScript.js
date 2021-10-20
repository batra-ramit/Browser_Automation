// node AutomationScript.js --url="https://www.hackerrank.com/" --config=config.json
// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);
console.log(args.url);
console.log(args.config);

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);
console.log(configJSO);
run();
async function run() {
  let browser = await puppeteer.launch({
    defaultViewport: null,

    args: ["--start-maximized"],
    headless: false,
  });

  let pages = await browser.pages();
  let page = pages[0];

  await page.goto(args.url);

  await page.waitForSelector("a[data-event-action='Login']");
  await page.click("a[data-event-action='Login']");

  await page.waitForSelector("a[href='https://www.hackerrank.com/work/login']");
  await page.click("a[href='https://www.hackerrank.com/login']");

  await page.waitForSelector("input[name='username']");
  await page.type("input[name='username']", configJSO.userid);

  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", configJSO.password);

  await page.waitForSelector("button[data-analytics='LoginPassword']");
  await page.click("button[data-analytics='LoginPassword']");
}
