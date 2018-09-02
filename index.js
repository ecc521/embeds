function GetId(Id) {
    return document.getElementById(Id)
}
    
var ThisURL = window.location.href
ThisURL = decodeURIComponent(ThisURL)
var Query = ThisURL.slice(ThisURL.indexOf("?") + 1)
if (ThisURL === Query) {
GetId("Header").innerHTML = "Error Loading Embed. No Query Parameter Specified."
}
else {
  //Valid query. Lets go!
  Query = Query.trim()
    
  //Convert http:// to https://
  if (Query.indexOf("http://") === 0) {
        Query = Query.slice(7)
        Query = "https://" + Query
  }
  if (!(Query.indexOf("https://") === 0)) {
      
    //If they just don't put the http:// or https:// we can do some things to try and identify what they mean.
    var check = 0
    
    //Query's length before ? or /
    var TestQuery = Math.min(Query.indexOf("/"), Query.indexOf("?"))
    if (TestQuery === -1) {
        TestQuery = Math.max(Query.indexOf("/"), Query.indexOf("?"))
    }
    TestQuery = Query.slice(0, TestQuery)
      
    //253 maximum domain length
    if (TestQuery.length > 253) {
    check = 1
    }

    //The ending .(one character) takes 2 characters
    if (Query.indexOf(".") > 251) {
    check = 1
    }
    if (!(/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9-\.]){1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/.test(TestQuery))) {
    check = 1
    }
   
      

console.log(check)
      
    //Check if it passed
    if (check === 0) {
    Query = "https://" + Query
    } 
      
  }

    
  var Embed = document.createElement("iframe")
  Embed.sandbox = "allow-scripts allow-forms allow-pointer-lock allow-popups"
  //No same origin
  if (Query.indexOf("https://") === 0) {
      Embed.src = Query
  }
  else {
      Embed.srcdoc = Query
  }
  Embed.addEventListener("error", function(e) {console.log(e)})
  GetId("Container").appendChild(Embed)
  GetId("Header").innerHTML = ""
 
    
    
    
    
}
