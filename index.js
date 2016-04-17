"use strict"
/**
 * [![build status](https://api.travis-ci.org/scytalezero/jsonp-fallback.svg)](https://travis-ci.org/scytalezero/jsonp-fallback)
 * 
 * Meant for use across the browser and node, this simple module will use [jsonp](https://www.npmjs.com/package/jsonp) if instantiated in a browser and [axios](https://www.npmjs.com/package/axios) if in node. In both cases a promise will be returned.
 * @module jsonp-fallback
 */

const axios = require("axios"), jsonp = require("jsonp")
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")
let that = null

/* Axios already supports promises so just return that after mapping the data property. */
function axiosGet(url) {
  return axios.get(url)
    .then((res) => {
      return res.data
    })
}

/* Create a promise for jsonp. */
function jsonpGet(url) {
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })  
}

if (isBrowser()) {
  //Use jsonp
  that = jsonpGet
} else {
  //Use axios
  that = axiosGet
}    

/**
 * Execute a GET request using JSONP if in a browser environment.
 * ``` js
 * const jsonpFallback = require("jsonp-fallback")
 * 
 * jsonpFallback("https://www.omdbapi.com/?i=tt3397884")
 *   .then(data => {
 *     console.log(data)
 *   })
 *   .catch(console.error)
 * ```
 * @function exports
 * @param {String} url A resource that can be accessed using JSONP.
 * @return {Promise} Contains the data or error if one was encountered
 */
module.exports = that