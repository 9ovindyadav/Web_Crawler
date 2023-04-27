const {sortPages} = require("./report.js")
const {test, expect} = require("@jest/globals")

test("sortPages for 2 pages",()=>{
    const input = {
        "https://gmsart.vercel.app":3,
        "https://gmsart.vercel.app/path1":1,
    }; // given input
    const actual = sortPages(input);      //actual output of the function
    const expected = [
        ["https://gmsart.vercel.app",3],
        ["https://gmsart.vercel.app/path1",1]
    ]; // expected output

    expect(actual).toEqual(expected);    //jest method to compare the output with expected one
}) 



test("sortPages for 5 pages",()=>{
    const input = {
        "https://gmsart.vercel.app":3,
        "https://gmsart.vercel.app/path1":1,
        "https://gmsart.vercel.app/path3":5,
        "https://gmsart.vercel.app/path4":5,
        "https://gmsart.vercel.app/path/56":4,
    }; // given input
    const actual = sortPages(input);      //actual output of the function
    const expected = [
        ["https://gmsart.vercel.app/path3",5],
        ["https://gmsart.vercel.app/path4",5],
        ["https://gmsart.vercel.app/path/56",4],
        ["https://gmsart.vercel.app",3],
        ["https://gmsart.vercel.app/path1",1]
    ]; // expected output

    expect(actual).toEqual(expected);    //jest method to compare the output with expected one
}) 