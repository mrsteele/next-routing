const fs = require('fs')
const path = require('path')
const Routes = require('next-routes')
const appRoot = require('app-root-path')

const addRoutesFromPath = (routes, rel = '') => {
  fs.readdirSync(path.resolve(`${appRoot}/pages${rel}`)).forEach(file => {
    if (file.indexOf('.js') === -1) {
      addRoutesFromPath(routes, `${rel}/${file}`)
    } else {
      file = file.replace('.js', '')
      routes.add({
        name: `${rel.substr(1)}/${file}`.split('/').join('-'),
        page: `${rel}/${file}`.split(':').join('_'),
        pattern: `${rel}/${file}`.split('_').join(':')
      })
    }
  })
}

module.exports = () => {
  const routes = Routes()
  addRoutesFromPath(routes)
  return routes
}
