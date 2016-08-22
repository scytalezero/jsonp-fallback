<a name="module_jsonp-fallback"></a>

## jsonp-fallback
[![build status](https://api.travis-ci.org/scytalezero/jsonp-fallback.svg)](https://travis-ci.org/scytalezero/jsonp-fallback)Meant for use across the browser and node, this simple module will use [jsonp](https://www.npmjs.com/package/jsonp) if instantiated in a browser and [axios](https://www.npmjs.com/package/axios) if in node. In both cases a promise will be returned.

<a name="module_jsonp-fallback..exports"></a>

### jsonp-fallback~exports(url, data, params) ⇒ <code>Promise</code>
Execute a GET request using JSONP if in a browser environment.

**Kind**: inner method of <code>[jsonp-fallback](#module_jsonp-fallback)</code>  
**Returns**: <code>Promise</code> - Contains the data or error if one was encountered  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | A resource that can be accessed using JSONP |
| data | <code>Object</code> | Parameters to be encoded for the querystring |
| params | <code>Object</code> | A parameters object that will be passed through to JSONP if it is used. Note:  this module defaults the JSONP timeout value to 15 seconds instead of 60 if it is not specified. |

**Example**  
```js
const jsonpFallback = require("jsonp-fallback")jsonpFallback("https://www.omdbapi.com/", {"i": "tt3397884"})  .then(data => {    console.log(data)  })  .catch(console.error)
```
