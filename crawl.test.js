const {normalizeURL,getUrlsFromHtml} = require("./crawl.js")
const {test, expect} = require("@jest/globals")

test("normalizeUrl strip protocals",()=>{
    const input = "https://boot.dev/path"; // given input
    const actual = normalizeURL(input);      //actual output of the function
    const expected = "boot.dev/path"; // expected output

    expect(actual).toEqual(expected);    //jest method to compare the output with expected one
}) // to test the function give input and test the expected output


test("normalizeUrl strip slash",()=>{
    const input = "https://boot.dev/path/"; 
    const actual = normalizeURL(input);     
    const expected = "boot.dev/path"; 

    expect(actual).toEqual(expected);  
}) 

test("normalizeUrl strip http",()=>{
    const input = "http://Boot.dev/path"; 
    const actual = normalizeURL(input);     
    const expected = "boot.dev/path"; 

    expect(actual).toEqual(expected);  
}) 

// URL from HTML body
test("getUrlsFromHtml absolute",()=>{
    const inputHtml =  `<html>
                       <body>
                           <a href="https://blog.boot.dev/">Boot.dev Blog</a>
                       </body>
                    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtml,baseURL);     
    const expected = ["https://blog.boot.dev/"]; 

    expect(actual).toEqual(expected);  
}) 


test("getUrlsFromHtml relative URLs",()=>{
    const inputHtml =  `<html>
                       <body>
                           <a href="/path/">Boot.dev Blog</a>
                       </body>
                    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtml,baseURL);     
    const expected = ["https://blog.boot.dev/path/"]; 

    expect(actual).toEqual(expected);  
}) 

test("getUrlsFromHtml both relative and absolute URLs",()=>{
    const inputHtml =  `<html>
                       <body>
                           <a href="https://blog.boot.dev/path1/">Boot.dev Blog path1</a>
                           <a href="/path2/">Boot.dev Blog path 2</a>
                       </body>
                    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtml,baseURL);     
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]; 

    expect(actual).toEqual(expected);  
}) 

test("getUrlsFromHtml invalid URLs",()=>{
    const inputHtml =  `<html>
                       <body>
                           <a href="invalid">Boot.dev Blog path1</a>
                       </body>
                    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtml,baseURL);     
    const expected = []; 

    expect(actual).toEqual(expected);  
}) 