"use strict"
const tape = require("tape")
const jsonpFallback = require("../index.js")
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")

tape("Retrieve from history", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.com/", {"type": "movie", "i": "tt3397884"})
    .then(data => {
      t.equal(data.Title, "Sicario", `Wrong record: ${data.Title}`)
    })  
    .catch(err => {
      t.fail(err)
    })  
})
tape("Empty result", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.com/", {"type": "movie", "i": "tt33"})
    .then(data => {
      t.equal(data.Response, "False", `Not empty record: ${data.Response}`)
    })  
    .catch(err => {
      t.fail(err)
    })  
})
tape("Failures should bubble", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.comx/", {"type": "movie", "i": "tt3397884"})
    .then(data => {
      t.fail("Should not succeed.")
    })
    .catch(err => {
      t.ok(err)
    })  
})
tape("Custom callback function name", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.com/", {"type": "movie", "i": "tt3397884"}, {"prefix": "__ok"})
    .then(data => {
      t.equal(data.Title, "Sicario")
    })  
    .catch(err => {
      t.fail(err)
    })  
})

tape.onFinish(() => {
  if (isBrowser()) window.close()
})