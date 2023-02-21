const fs = require('fs')
const isUrl = require('is-url')
const Axios = require('axios')
const Penthouse = require('penthouse')

const criticalConfig = require('./.critical.json')

if (criticalConfig.length > 9) {
  process.setMaxListeners(0)
}

// Will extract Critical CSS
async function criticalStart(cb) {
  criticalConfig.forEach(async (config) => {
    if (isUrl(config.css)) {
      config.cssString = await Axios.get(config.css)
        .then((response) => response.data)
      config.css = false
    }

    Penthouse(config)
      .then(criticalCss => {
        fs.writeFileSync(config.out, criticalCss)
      })
  })

  cb()
}

exports.default = criticalStart
