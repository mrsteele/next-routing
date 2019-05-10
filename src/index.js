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

const ignoredFiles = ['_error', '_document', '_app'].reduce(
  (memo, file) => memo.concat([`${file}.js`, `${file}.jsx`, `${file}.ts`, `${file}.tsx`]),
  []
)
const addRoutesFromPath = (routes, opts, rel = '') => {
  fs.readdirSync(path.resolve(`${opts.root}/pages${rel}`)).forEach(file => {
    if (file.indexOf('.') === -1) {
      addRoutesFromPath(routes, opts, `${rel}/${file}`)
    } else if (!file.match(/\.(js|jsx|ts|tsx)$/) || (ignoredFiles.indexOf(file) !== -1 && rel === '')) {
      // ignore these
    } else {
      // its a valid file
      file = file.replace(/\.(js|jsx|ts|tsx)$/, '')
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
