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

const ignoredFiles = ['_error.js', '_document.js']
const addRoutesFromPath = (routes, rel = '') => {
  fs.readdirSync(path.resolve(`${appRoot}/pages${rel}`)).forEach(file => {
    if (file.indexOf('.js') === -1) {
      addRoutesFromPath(routes, `${rel}/${file}`)
    } else if (ignoredFiles.indexOf(file) !== -1) {
      // ignore these
    } else {
      // its a valid file
      file = file.replace('.js', '')
      const page = `${rel}/${file}`
      routes.add({
        page,
        name: convertToName(page) || 'index',
        pattern: convertToPattern(page)
      })
    }
  })
}

module.exports = () => {
  const routes = Routes()
  addRoutesFromPath(routes)
  return routes
}
