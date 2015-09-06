#!/usr/bin/env node



var _ = require('lodash');
var request = require('request-promise');
var ChildProcess = require('child-process-promise');

var colors = require('colors');
var argv = require('optimist')
    .usage('DashHooks'.green.bold.underline + ': ' + 'Monitor an Amazon Dash Button on your local network and send webhooks.')
    .demand('i')
    .alias('i', 'interface')
    .describe('i', 'The network interface to bind to')
    .default('i', 'en0')
    .alias('a', 'address')
    .describe('a', 'MAC address of your Amazon Dash Button')
    // .alias('u', 'url')
    // .describe('u', 'The webhook url to trigger when button is pressed')
    .alias('c', 'command')
    .describe('c', 'Command to run when a button press is received')
    .argv

console.log('DashHooks'.green.underline);
console.log('Binding to Interface   : ' + argv.i.blue);

if(!argv.a) {
  console.log('You did not specify a Dash Button address using -a'.yellow);
  console.log('Starting in Discover mode. Use this mode to determine your Dash Button address'.yellow);
  console.log('Now listening for ALL probes on your network. Press your button and see if it shows up.'.green);
  var arpListener = require('arp-listener');
  arpListener(argv.i, function(arpData) {
    if (arpData.sender_pa.o1 === 0 && arpData.sender_pa.o2 === 0 && arpData.sender_pa.o3 === 0 && arpData.sender_pa.o4 === 0) {
      if(arpData.target_ha === '00:00:00:00:00:00') {
        console.log('Got Probe from: '.green + arpData.sender_ha + ' <- Is this your Dash Button?'.blue);
      }
    }
  });
} else {
  console.log('Watching for button    : ' + argv.a.blue);

  if(!argv.c) {
    console.log('No hook command specified. Use -u to specify one. We will start in log-only mode.');
  } else {
      console.log('Call on press          : ' + argv.c.blue);
  }
  var arpListener = require('arp-listener');
  arpListener(argv.i, function(arpData) {
      if(arpData.sender_ha === argv.a) {
        if (arpData.sender_pa.o1 === 0 && arpData.sender_pa.o2 === 0 && arpData.sender_pa.o3 === 0 && arpData.sender_pa.o4 === 0) {
          if(arpData.target_ha === '00:00:00:00:00:00') {
            console.log('Hit!'.green + ' From: ' + arpData.sender_ha.blue);
            if(argv.c) {
                ChildProcess.exec(argv.c)
                .then(function (result) {
                    console.log('Hooked!'.green + ' Script exit code: ' + result.childProcess.exitCode);
                })
                .fail(function (err) {
                    console.error('ERROR: '.red + 'Script invocation failed: ' + err);
                })
            }
          }
        }
      }
  })
}
