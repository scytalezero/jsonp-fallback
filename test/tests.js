"use strict"
const tape = require("tape")
const jsonpFallback = require("../index.js")
const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")

tape("Retrieve from history", t => {
  t.plan(1)
  jsonpFallback("https://www.googleapis.com/books/v1/volumes/b_M9PgAACAAJ")
    .then(data => {
      t.equal(data.volumeInfo.title, "Altered Carbon", `should retrieve 1 book: ${data.volumeInfo.title}`)
    })  
    .catch(err => {
      t.fail(err)
    })  
})
tape("Empty result", t => {
  t.plan(1)
  jsonpFallback("https://www.googleapis.com/books/v1/volumes", {"q": "retwhjerklghklsdgh"})
    .then(data => {
      t.equal(data.totalItems, 0, `should return empty record: ${data.totalItems}`)
    })  
    .catch(err => {
      t.fail(err)
    })  
})
tape("Failures should bubble", t => {
  t.plan(1)
  jsonpFallback("https://www.googleapis.xcom/books/v1/volumes/b_M9PgAACAAJ")
    .then(data => {
      t.fail("Should not succeed.")
    })
    .catch(err => {
      t.ok(err)
    })  
})
tape("Custom callback function name", t => {
  t.plan(1)
  jsonpFallback("https://www.googleapis.com/books/v1/volumes/b_M9PgAACAAJ", null, {"prefix": "__ok"})
    .then(data => {
      t.equal(data.volumeInfo.title, "Altered Carbon", `should still retrieve 1 book: ${data.volumeInfo.title}`)
    })  
    .catch(err => {
      t.fail(err)
    })  
})

tape.onFinish(() => {
  if (isBrowser()) window.close()
})