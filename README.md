# next-routing
A nuxt inspired routing plugin for nextjs

### About

This plugin is inspired by [nuxt routing](https://nuxtjs.org/guide/routing/). The idea is that your routing becomes a lot simpler by prepending underscores (`_`) on your routes to simplify your routes.

### Installation

You can install this package by using npm like so:

```
npm i next-routing --save
```

##### Page

If a file or folder begins with an underscore (`_`), it will define that route part as a query parameter.

For example, if you had a file `/pages/users/_id/comments.js`, it would convert that route to `/users/:id/comments`.

The same can be applied to files. If you had a file `/pages/users/_id.js`, the route would be `/users/:id`.

This could be accessed like below:

```js
export default class User extends React.Component {
  static async getInitialProps ({ query }) {
    // query.id
  }
  render () {
    // this.props.url.query.id
  }
}
```

##### Server

You will need to add a hook on your server to intercept requests:

```js
// server.js
const next = require('next')
const app = next({
  dev: process.env.NODE_ENV !== 'production'
})

// make sure you export this as well as call this
module.exports.routes = require('next-routing')()
const handler = module.exports.routes.getRequestHandler(app)

// With express
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
})

// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
})
```

##### Client

You will need to import the `Link` from your server file created above.

```js
const { Link } = require('../server').routes
```

For a full list of the api, feel free to checkout [next-routes](https://github.com/fridays/next-routes#on-the-client) documentation (we piggy-back of what they have already done).

### License

MIT
