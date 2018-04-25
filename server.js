const next = require('next')
const routes = require('./src')()
const app = next({
  dev: process.env.NODE_ENV !== 'production'
})
const handler = routes.getRequestHandler(app)

// With express
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
  // express().use(app.getRequestHandler()).listen(3000)
})
