const puppeteer = require('puppeteer');
const fs=require('fs-extra');
const express = require('express');
var app = express();
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 


app.listen(8080);
console.log('8080 is the magic port');

(async function main() {
    try {
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: {width:1366,height:800}
        });
        const page = await browser.newPage();
  
        //await page.goto('https://experts.shopify.com/');

        await page.goto('http://10.45.6.12/ipop_webchart/webKadouChart.aspx');

        //  await page.waitForSelector('#cmdDisplay');
        //  const sections = await page.$$('#cmdDisplay');

        //await page.tap('input[id="chkKikaiSel"]');

        // var wait1000 =  new Promise(function(resolve, reject) {
        //     page.tap('input[id="chkKikaiSel"]');    
        //     setTimeout(resolve, 500);
        //   }).then(function() {
        //     page.tap('input[id="chkboxKikai_46"]');
        //     // page.tap('input[id="chkboxKikai_47"]');
        //     // page.tap('input[id="chkboxKikai_48"]');
        //     // page.tap('input[id="chkboxKikai_49"]');
        //     // page.tap('input[id="chkboxKikai_50"]');
        //     // page.tap('input[id="chkboxKikai_51"]');
            
        //   });

        var wait1000 =  (time)=> new Promise((resolve, reject)=> {setTimeout(resolve, time)})

    await wait1000()
    .then(function() {
        page.tap('input[id="chkKikaiSel"]');
        return wait1000(500);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_46"]');
        return wait1000(300);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_47"]');
        return wait1000(300);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_48"]');
        return wait1000(300);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_49"]');
        return wait1000(300);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_50"]');
        return wait1000(300);
    })
    .then(function() {
        page.tap('input[id="chkboxKikai_51"]');
        return wait1000(300);    
    })
    .then(function() {
        page.tap('input[id="cmdDisplay"]');
        return wait1000(500);    
    }); 
        
    //console.log(await page.content());

    app.get('/', function(req, res) {
        res.render('pages/index',page.content());
    });


               
        // const inputElement6 = await page.$('input[id="chkboxKikai_51"]');
        // await inputElement6.click();
         

      

      
        console.log('done');
        //await browser.close();
    }catch(e) {
        console.log('our erro',e);
    }
})();

