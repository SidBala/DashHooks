#!/usr/bin/env node


var arpListener = require('arp-listener');


var colors = require('colors');
var argv = require('optimist')
    .usage('DashHooks'.green.bold.underline + ': ' + 'Monitor an Amazon Dash Button on your local network and send webhooks.')
    .demand('l')
    .alias('l', 'Watch')
    .default('l', true)
    .describe('l', 'Watch mode - list all ARP requests in your network')
    .demand('i')
    .alias('i', 'interface')
    .describe('i', 'The network interface to bind to')
    .default('i', 'en0')
    .alias('u', 'url')
    .describe('u', 'The webhook url to trigger when ')
    .argv

 
arpListener(argv.i, function(arpData) {
    if(arpData.sender_ha === 'a0:02:dc:12:37:fa') {
    if(arpData.target_ha === '00:00:00:00:00:00') {
        console.log('Got a Hit from: ' + arpData.sender_ha);
    }

    console.log(arpData);
    }
})