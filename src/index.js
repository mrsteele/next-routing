const fs = require('fs')
const path = require('path')
const Routes = require('next-routes')
const appRoot = require('app-root-path')

const convertToPattern = (str) => str
  .split('/index').join('')
  .split('_').map(section => {
    if (section[0] === '_') {
      return section.substr(1)
    }
    return section
  })
  .join(':')

const convertToName = (str) => convertToPattern(str)
  .substr(1)
  .split(':').join('')
  .split('/').join('-')

const ignoredFiles = ['_error.js', '_document.js', '_app.js']
const addRoutesFromPath = (routes, {root, rel = ''}) => {
  fs.readdirSync(path.resolve(`${root}/pages${rel}`)).forEach(file => {
    if (file.indexOf('.js') === -1) {
      addRoutesFromPath(routes, {root, rel: `${rel}/${file}`})
    } else if (ignoredFiles.indexOf(file) !== -1 && rel === '') {
      // ignore these
    } else {
      // its a valid file
      file = file.replace('.js', '')
      const page = `${rel}/${file}`
      routes.add({
        page,
        name: convertToName(page) || 'index',
        pattern: convertToPattern(page) || '/'
      })
    }
  })
}

module.exports = (opts = {}) => {
  const routes = Routes()
  addRoutesFromPath(routes, Object.assign({ root: appRoot }, opts))
  return routes
}
