#!/usr/bin/env node
'use strict';

const alfy = require('alfy');

const input = alfy.input;

alfy.output([
  {
    title: `Set Redmine API token: ${input}?`,
    arg: input
  }
]);
