const environments = {
  staging: {
    port: 3000,
    envName: 'staging'
  },
  production: {
    port: 5000,
    envName: 'production'
  }
}

module.exports = environments[(process.env.NODE_ENV || 'staging').toLowerCase()]