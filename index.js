"use strict"
/**
 * [![build status](https://api.travis-ci.org/scytalezero/jsonp-fallback.svg)](https://travis-ci.org/scytalezero/jsonp-fallback)
 * 
 * Meant for use across the browser and node, this simple module will use [jsonp](https://www.npmjs.com/package/jsonp) if instantiated in a browser and [axios](https://www.npmjs.com/package/axios) if in node. In both cases a promise will be returned.
 * @module jsonp-fallback
 */

const axios = require("axios"), jsonp = require("jsonp"), qs = require("qs")
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")
let that = null

/* Axios already supports promises so just return that after mapping the data property. */
function axiosGet(url, data) {
  return axios.get(url, {params: data})
    .then((res) => {
      return res.data
    })
}

/* Create a promise for jsonp. */
function jsonpGet(url, data, params) {
  return new Promise((resolve, reject) => {
    if (data) url += "?" + qs.stringify(data)
    params = params || {timeout: 15000}
    if (!params.timeout) params.timeout = 15000
    jsonp(url, params, (err, data) => {
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
 * @example
 * const jsonpFallback = require("jsonp-fallback")
 * 
 * jsonpFallback("https://www.omdbapi.com/", {"i": "tt3397884"})
 *   .then(data => {
 *     console.log(data)
 *   })
 *   .catch(console.error)
 * @function exports
 * @param {String} url A resource that can be accessed using JSONP
 * @param {Object} data Parameters to be encoded for the querystring
 * @param {Object} params A parameters object that will be passed through to JSONP if it is used. Note: 
 * this module defaults the JSONP timeout value to 15 seconds instead of 60 if it is not specified.
 * @return {Promise} Contains the data or error if one was encountered
 */
module.exports = that