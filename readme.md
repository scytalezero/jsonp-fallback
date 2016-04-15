# jsonp-fallback

[![build status](https://api.travis-ci.org/scytalezero/jsonp-fallback.svg)](https://travis-ci.org/scytalezero/jsonp-fallback)

Meant for use in both the browser and node, this simple module will use [jsonp](https://www.npmjs.com/package/jsonp) if instantiated in a browser and [axios](https://www.npmjs.com/package/axios) if in node. In both cases a promise will be returned.


# example

``` js
const jsonpFallback = require("jsonp-fallback")

jsonpFallback("https://www.omdbapi.com/?i=tt3397884")
  .then(data => {
    console.log(data)
  })
  .catch(console.error)
```

# usage

Let's say you have a module that you want to reuse between node and the browser. Let's also imagine that you need to make an HTTP request that could be cross-domain and so will need to use JSONP in the browser. This module simply returns a function that uses `axios` or `jsonp` and normalizes `jsonp` to return a promise just like axios. Since `jsonp` returns the data without response information, the `axios` response is normalized in the same way. In other words, the object you get back will always just be the return payload from the url.

## jsonpFallback(url)