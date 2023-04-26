const {normalizeURL} = require("./crawl.js")
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