'use strict';
var express = require('express');
var kraken = require('kraken-js');
var path = require('path');

var google = require('./google')


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
  onconfig: function (config, next) {
    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */

    next(null, config);
  }
};

app = module.exports = express();

const router = express.Router()

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

global.log = require('./app/lib/logger');
global.appRoot = path.resolve(__dirname);

app.use(express.json())

global.kraken = app.kraken;
app.use(kraken(options));
app.on('start', function () {
  global.log.info('Application ready to serve requests.');
  global.log.info('Environment: %s', app.kraken.get('env:env'));
});

google(router)

app.use(router)

app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});