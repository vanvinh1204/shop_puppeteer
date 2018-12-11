const puppeteer = require('puppeteer');
const fsex=require('fs-extra');
const fs = require('fs');
const request = require('request');

(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();

        //await page.goto('https://shopee.vn/cameranguyenloc');
  
        
        await fsex.writeFile('out.csv','ps_category_list_id,ps_product_name,ps_product_description,ps_price,ps_stock,ps_product_weight,ps_days_to_ship\n');

        // await fs.writeFile('out.csv','section,name\n');

        for (let i=0; i < 1 ; i++) {
            await page.goto(`https://shopee.vn/shop/31235873/search?page=${i}&sortBy=sales`);
            await page.waitForSelector('.shop-search-result-view__item');
            const sections = await page.$$('.shop-search-result-view__item');

            console.log(sections.length);
            for (let j=1; j < 2 ; j++) {
                await page.goto(`https://shopee.vn/shop/31235873/search?page=${i}&sortBy=sales`);
                await page.waitForSelector('.shop-search-result-view__item');
                const sections = await page.$$('.shop-search-result-view__item');

                const section =sections[j]
                const button = await section.$('div.shopee-item-card__text-name');
                
                // const buttonName = await page.evaluate( button => button.innerText, button);
                // console.log('\n\n');
                // console.log(buttonName);
                

                await button.click();
                //await sleep(10000);


                await page.waitForSelector('.qaNIZv');     
                const name = await page.$eval('.qaNIZv', name => name.innerText);
                console.log(name);


                await page.waitForSelector('._3n5NQx');
                const price = await page.$eval('._3n5NQx', price => price.innerText);
                console.log(price.substr(1));


                await page.waitForSelector('._2u0jt9');
                const info = await page.$$('._2u0jt9');
                const _info = await info[0].$eval('span:first-child', span => span.innerText);
                console.log(_info);
                    

                await page.waitForSelector('._1z1CEl');
                const cat = await page.$$('._1z1CEl');
                const category = await cat[1].$eval('a:last-child', a => a.href);          
                const category_id = category.slice(1+category.lastIndexOf('.'));
                console.log(category_id);   


                await page.waitForSelector('._2Fw7Qu');

                const date = await page.evaluate(() => document.querySelector('._2Fw7Qu').getAttribute('style'));
               
                const images = await page.$$('._2Fw7Qu', url =>url.length);   

                console.log(images);
                
                // for (const image of images){

                //     download(image, `image/${name}.png`, function(){

                //     console.log(`saved image of ${name}`);
                //     });
                   
                // }
                

            }    
            

            // await page.waitForSelector('#ExpertsResults');
            // const lis = await page.$$('#ExpertsResults > li');

            // for (const li of lis){
            //     const name = await li.$eval('h2', h2 => h2.innerText);
            //     console.log('name',name);
                
            //     //await fs.appendFile('out.csv','section,name\n');
            //     await fs.appendFile('out.csv', `"${buttonName}","${name}"\n`);
            // }
            
        }
        console.log('done');
        //await browser.close();
    }catch(e) {
        console.log('our erro',e);
    }
})();

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};