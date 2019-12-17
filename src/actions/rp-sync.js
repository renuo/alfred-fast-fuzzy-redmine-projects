#!/usr/bin/env node
'use strict';

const alfy = require('alfy');
const input = alfy.input;

const token = alfy.config.get('token');
if (!token) {
  return alfy.error(new Error(`Run "rp-token" first for setup`));
}

const host = alfy.config.get('host');
if (!host) {
  return alfy.error(new Error(`Run "rp-host" first for setup`));
}

alfy.output([
  {
    title: `Download the list of all Redmine projects`,
    arg: input
  }
]);
