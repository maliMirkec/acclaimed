const fs = require('fs')
const path = require('path')
const isUrl = require('is-url')
const Axios = require('axios')
const Kleur = require('kleur')
const Penthouse = require('penthouse')
const { LOADIPHLPAPI } = require('dns')
const acclaimedConfigPath = path.resolve('./.acclaimed.json')

if(!fs.existsSync(acclaimedConfigPath)) {
  throw new Error('Config file should be JSON array.')
}

const acclaimedConfig = require(acclaimedConfigPath)

async function getCritical(cssUrls) {
  let promises = []
  cssUrls.forEach(cssUrl => {
    promises.push(new Promise((resolve, reject) => {
      resolve(Axios.get(cssUrl))
    }))
  })

  const res = await Promise.all(promises)
  const data = await Promise.all(res.map(r => r.data))

  return data.join('')
}

async function critical() {
  if(!acclaimedConfig.length) {
    throw new Error('Config file should be JSON array.')
  }

  if(acclaimedConfig.length > 9) {
    process.setMaxListeners(0)
  }

  try {
    console.log(Kleur.yellow(`Starting acclaimed...`))

    acclaimedConfig.forEach(async (config) => {
      let cssUrls = []

      if(Array.isArray(config.css)) {
        config.css.forEach((configCss) => {
          if (isUrl(configCss)) {
            cssUrls.push(configCss)
          } else {
            throw new Error('The `css` option accepts only remote file, local file, or array of remote files (not array of local files).')
          }
        })
      } else {
        if (isUrl(config.css)) {
          cssUrls.push(config.css)
        }
      }

      if(cssUrls.length) {
        config.cssString = await getCritical(cssUrls)
        config.css = false
      }

      return await Penthouse(config)
        .then(acclaimedCss => {
          console.log(Kleur.cyan(`Acclaimed saved Critical CSS saved at ${config.out}.`))

          fs.writeFileSync(config.out, acclaimedCss)
        })
    })
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }

}

critical()

exports.critical = critical
