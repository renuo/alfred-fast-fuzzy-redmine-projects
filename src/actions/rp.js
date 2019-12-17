#!/usr/bin/env project
'use strict';

const alfy = require('alfy');

const redmineProjects = alfy.config.get('projects');
if (!redmineProjects) {
  return alfy.error(new Error(`Run "rp-sync" first to populate your projects list`));
}

const host = alfy.config.get('host');
if (!host) {
  return alfy.error(new Error(`Run "rp-host" first for setup`));
}

function fuzzyMatch(pattern, str) {
  pattern = '.*' + pattern.split('').join('.*') + '.*';
  const re = new RegExp(pattern);
  return re.test(str);
}

function niceName(project){
  return `${project.name} (${project.identifier})`;
}

const results = alfy
  .inputMatches(redmineProjects, (project, input) => {
    return fuzzyMatch(input, project.name) || fuzzyMatch(input, project.identifier)
  })
  .sort((projectA, projectB) => niceName(projectA).length - niceName(projectB).length)
  .map((project) => {
    return {
      title: niceName(project),
      subtitle: project.description || '',
      arg: `https://${host}/projects/${project.identifier}`
    };
  });

alfy.output(results);
