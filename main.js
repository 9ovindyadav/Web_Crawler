// in node there is a global object called process and argv is a property to grab the cli input so syntex is process.argv
//process.argv returns an array  1.index - interpreter name  2.index- name of our code  3.index- our actual input 
const {crawlPage} = require("./crawl.js")

const main = ()=>{};
 
if(process.argv.length < 3){
    console.log("No website provided")
    process.exit(1);   //exit property and 1 is a error code
}

if(process.argv.length > 3){
    console.log("Too many CLI arguments")
    process.exit(1);   //exit property and 1 is a error code
}// we don't have to check entire internet only 1 website at a time

const baseURL = process.argv[2];

console.log(`Starting crawl of ${baseURL}`);

crawlPage(baseURL);

main();