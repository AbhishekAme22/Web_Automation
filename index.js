const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fetch = require('node-fetch');
const prompt = require('prompt-sync')();

// Set up the Selenium WebDriver
const options = new chrome.Options();
options.addArguments('--disable-extensions');
options.addArguments('--disable-infobars');



  async function generateScript(promptText) {
    const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:"Given the prompt "+promptText+", what is the Selenium code to perform the required task? driver object is created . use driver to navigate ,dont add headers or try to create another driver object."
 // prompt:"give  code to '"+promptText+" ' in selenium in nodejs , don't add single qoutes",
 ,max_tokens: 2048,
  temperature: 0.7,
});



const response =completion.data.choices[0].text
//console.log(response);

 const script= response;
  console.log(`Generated script: ${script}`);
  return script;
}

async function runScript(script) {
  const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  await eval(script);
  console.log("done")
}
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-name', (req, res) => {
  const name = req.body.name;
  console.log('Name:', name);
  var previousUrl = req.headers.referer || '/';
  res.redirect(previousUrl);
  main(name);
});


async function main(promptText) {
 
    const script = await generateScript(promptText);
    await runScript(script);
  
//  await driver.quit();
}



app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});