const fs = require('fs')
const path = require('path')
const isUrl = require('is-url')
const Axios = require('axios')
const Kleur = require('kleur')
const Penthouse = require('penthouse')
const acclaimedConfigPath = path.resolve('./.acclaimed.json')

if(!fs.existsSync(acclaimedConfigPath)) {
  throw new Error('Config file should be JSON array.')
}

const acclaimedConfig = require(acclaimedConfigPath)

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
      if (isUrl(config.css)) {
        config.cssString = await Axios.get(config.css)
          .then((response) => response.data)
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

exports.critical = critical
