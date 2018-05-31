'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const Raven= require('raven');
// Raven.config(cfg.RAVEN_KEY).install();
Raven.config('https://77aa2ee9a7ce484497f56278982a0809@sentry.io/305339').install()

var app = module.exports = loopback();

// Covered the code with a tracer to use with raven
try {

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});





  

  // console.log(config);
} catch (err) {
  console.trace(err);
  Raven.captureException(err);
  process.exit(1); // fatal
}