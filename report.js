const sortPages = (pages)=>{
    const pagesArr = Object.entries(pages); // convert object into arrays

    pagesArr.sort((a,b)=>{
        aHits = a[1];
        bHits = b[1];
        return b[1]-a[1];
    }) // Array sorting method

    return pagesArr;
}

const printReport = (pages)=>{
    console.log("=============");
    console.log("REPORT");
    console.log("=============");
    const sortedPages = sortPages(pages);

    for (const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];

        console.log(`found ${hits} links to page: ${url} `)
    }
    console.log("=============");
    console.log("END REPORT");
    console.log("=============");

};

module.exports = {
    sortPages,
    printReport
};