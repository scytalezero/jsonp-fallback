"use strict"
const axios = require("axios"), jsonp = require("jsonp")

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")

/** Axios already supports promises so just return that after mapping the data property. */
function axiosGet(url) {
  return axios.get(url)
    .then((res) => {
      return res.data
    })
}

/** Create a promise for jsonp. */
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
  module.exports = jsonpGet
} else {
  //Use axios
  module.exports = axiosGet
}    