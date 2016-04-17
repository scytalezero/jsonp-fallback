# jsonp-fallback

[![build status](https://api.travis-ci.org/scytalezero/jsonp-fallback.svg)](https://travis-ci.org/scytalezero/jsonp-fallback)Meant for use across the browser and node, this simple module will use [jsonp](https://www.npmjs.com/package/jsonp) if instantiated in a browser and [axios](https://www.npmjs.com/package/axios) if in node. In both cases a promise will be returned.



* * *

### jsonp-fallback.exports(url) 

Execute a GET request using JSONP if in a browser environment.``` jsconst jsonpFallback = require("jsonp-fallback")jsonpFallback("https://www.omdbapi.com/?i=tt3397884")  .then(data => {    console.log(data)  })  .catch(console.error)```

**Parameters**

**url**: `String`, A resource that can be accessed using JSONP.

**Returns**: `Promise`, Contains the data or error if one was encountered



* * *










