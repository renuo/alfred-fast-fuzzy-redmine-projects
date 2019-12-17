#!/usr/bin/env node
'use strict';

const alfy = require('alfy');

const input = alfy.input;

alfy.output([
  {
    title: `Set Redmine host: ${input}?`,
    subtitle: `Will end up calling https://${input}/projects.json`,
    arg: input
  }
]);
