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

module.exports ={
    normalizeURL,
    getUrlsFromHtml,
}// to export the function so that it is available to other files 