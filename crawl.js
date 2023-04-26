const normalizeURL = (urlString)=>{
       const urlObj = new URL(urlString);  // it gives url object which have url properties like hostname 

       const hostPath = `${urlObj.hostname}${urlObj.pathname}` ;

       if( hostPath.length > 0 && hostPath.slice(-1) === "/"){
                  return hostPath.slice(0,-1);     //returns everything except last character i.e "/"
       }

       return hostPath; // if there is no "/" then return this
}

module.exports ={
    normalizeURL,
}// to export the function so that it is available to other files 