const puppeteer = require('puppeteer');
const fs=require('fs-extra');

(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();

        //await page.goto('https://shopee.vn/cameranguyenloc');
  
    

        // await fs.writeFile('out.csv','section,name\n');

        for (let i=0; i < 1 ; i++) {
            await page.goto(`https://shopee.vn/shop/31235873/search?page=${i}&sortBy=sales`);
            await page.waitForSelector('.shop-search-result-view__item');
            const sections = await page.$$('.shop-search-result-view__item');

            console.log(sections.length);
            for (let j=0; j < 2 ; j++) {
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
        await browser.close();
    }catch(e) {
        console.log('our erro',e);
    }
})();

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}