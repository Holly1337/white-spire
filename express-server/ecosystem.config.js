module.exports = {
  apps : [{
    name: 'whitespire',
    script: './bin/www',
    instances: 1,
    autorestart: true,
  }]
}
