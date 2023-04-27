const {JSDOM} = require("jsdom");

const normalizeURL = (urlString)=>{
       const urlObj = new URL(urlString);  // it gives url object which have url properties like hostname 

       const hostPath = `${urlObj.hostname}${urlObj.pathname}` ;

       if( hostPath.length > 0 && hostPath.slice(-1) === "/"){
                  return hostPath.slice(0,-1);     //returns everything except last character i.e "/"
       }

       return hostPath; // if there is no "/" then return this
}

const getUrlsFromHtml = (htmlBody,baseUrl)=>{
       const urls = [];

const dom = new JSDOM(htmlBody);

const linkElements = dom.window.document.querySelectorAll("a"); // return an array of objects having href property

for(const linkElement of linkElements){

    if(linkElement.href.slice(0,1)==="/"){
        //relative 
        try {
            const urlObj = new URL(`${baseUrl}${linkElement.href}`); // if not valid url it will throw and typeError
            urls.push(urlObj.href);   // get whole link from this object
            
        } catch (error) {
            console.log(`Error with relative url : ${error.message}`);
        }
    }else{
        //absolute
        try {
            const urlObj = new URL(linkElement.href); // if not valid url it will throw and typeError
            urls.push(urlObj.href);   // get whole link from this object
            
        } catch (error) {
            console.log(`Error with absolute url : ${error.message}`);
        }
    }
    
}
       return urls;
}// input - string of html elements and base url , output- array of url strings


const crawlPage = async (baseURL,currentURL,pages)=>{

const baseURLObj = new URL(baseURL);
const currentUrlObj = new URL(currentURL);

if (baseURLObj.hostname !== currentUrlObj.hostname){
    return pages ;
}

const normalizedCurrentURL = normalizeURL(currentURL);
if(pages[normalizedCurrentURL] > 0){
    pages[normalizedCurrentURL]++ ;
    return pages;
}

pages[normalizedCurrentURL] = 1 ;

console.log(`Actively Crawling ${currentURL}`);

    try {
        const resp = await fetch(currentURL);   // return resp object   

        if(resp.status > 399){
            console.log(`Error in fetch with status code ${resp.status} on page ${currentURL}`)
            return pages;
        }

        const contentType = resp.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`non html responsse, Content-type: ${contentType}, on page ${currentURL}`)
            return pages;
        }
         const htmlBody = await resp.text();   //parsing as text

         const nextURLs = getUrlsFromHtml(htmlBody,baseURL);

         for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL,nextURL,pages); // here crawlPage behaves as a recursive function a function which calls it self again and again
         }
        
    } catch (error) {
          console.log(`Error in fetch ${error.message}, on page ${currentURL} `);
    }

    return pages;
}
module.exports ={
    normalizeURL,
    getUrlsFromHtml,
    crawlPage,
}// to export the function so that it is available to other files 