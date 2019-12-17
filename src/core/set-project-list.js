#!/usr/bin/env node
'use strict';

const alfy = require('alfy');
const token = alfy.config.get('token');
const host = alfy.config.get('host');

if (!token) {
  return alfy.error(new Error(`Run "rp-token" with your Redmine token`));
}

if (!host) {
  return alfy.error(new Error(`Run "rp-host" with your Redmine host name`));
}

(async () => {
  const projects = [];

  const limit = 100;
  let offset = 0;
  let pagesLeft = true;
  while(pagesLeft) {
    const json = await alfy.fetch(`https://${host}/projects.json?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: { "X-Redmine-API-Key": token, "Accept": 'application/json' }
    });

    if (!json.projects) { return alfy.log(json.errors ? json.errors : 'Unknown REST Error'); }

    projects.push(...json.projects);
    offset = json.limit + json.offset;
    pagesLeft = projects.length < json.total_count
  }

  alfy.config.set('projects', projects);
  console.log(projects.length);
})();
