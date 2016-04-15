"use strict"
const tape = require("tape")
const jsonpFallback = require("../index.js")
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")

tape("Retrieve from history", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.com/?i=tt3397884")
    .then(data => {
      t.equal(data.Title, "Sicario", "Data was not returned from the service.")
    })  
    .catch(err => {
      t.fail("An error was encountered.")
    })  
})
tape("Empty result", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.com/?i=tt33")
    .then(data => {
      t.equal(data.Response, "False", "Empty result not returned.")
    })  
    .catch(err => {
      t.fail("An error was encountered.")
    })  
})
tape("Failures should bubble", t => {
  t.plan(1)
  jsonpFallback("https://www.omdbapi.comx/?i=tt3397884")
    .then(data => {
      t.fail("Should not succeed.")
    })
    .catch(err => {
      t.ok(err, "An error was not returned.")
    })  
})
tape.onFinish(() => {
  if (isBrowser()) window.close()
})