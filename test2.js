const puppeteer = require('puppeteer');
const fs=require('fs-extra');
const express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.listen(8080);
console.log('8080 is the magic port');

(async function main() {
    try {
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: {width:1366,height:800}
        });
        const page = await browser.newPage();
          await page.goto('http://10.45.6.12/ipop_webchart/webKadouChart.aspx');

        var wait1000 =  (time)=> new Promise((resolve, reject)=> {setTimeout(resolve, time)})

        await wait1000(100)
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
            
        temp = await page.content();
        app.get('/', function(req, res) {
            res.render('pages/index',{html:temp});
        });
        
        async function intervalFunc() {
            page.tap('input[id="cmdDisplay"]');
            temp = await page.content();
        }

        setInterval(intervalFunc, 300000);
    console.log('done');
    }catch(e) {
        console.log('our erro',e);
    }
})();

