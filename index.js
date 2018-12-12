const puppeteer = require('puppeteer');
const fsex=require('fs-extra');
const fs = require('fs');
const request = require('request');

(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();

        await fsex.writeFile('out.csv','ps_category_list_id,ps_product_name,ps_product_description,ps_price,ps_stock,ps_product_weight,ps_days_to_ship\n');

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

                await fsex.appendFile('out.csv', `'${category_id},${name},"${_info}",${price.substr(1)},"2","2"\n`);

                await page.waitForSelector('._2Fw7Qu');
                const hrefs = await page.evaluate(() => {
                    const anchors = document.querySelectorAll('._2Fw7Qu');
                    return [].map.call(anchors, function(e){
                        return e.getAttribute('style');
                    });
                  });

                var index=0;  
                for (const url of hrefs){
                    index=index+1;
                    console.log(url.slice(1+url.indexOf('"'),url.lastIndexOf('"')));
                    download(url.slice(1+url.indexOf('"'),url.lastIndexOf('"')), `image/${name+index}.png`, function(){
                    console.log(`saved image of ${name+index}`);
                    });
                }           
            }    
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

function download(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};