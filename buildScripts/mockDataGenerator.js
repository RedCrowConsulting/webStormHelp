/* This script generates mock data for local development
   This way you don't have to pont to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data
*/

/* eslint-disable no-console */
import * as Data from '../src/SeedData';
import jsf from 'json-schema-faker';
import {
  schema,
} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';
const _ = require('lodash');

// if extending add faker to dev dependancies I believe
jsf.extend('faker', () => {
  const faker = require('faker');

  faker.locale = 'en'; // or any other language
  return faker;
});
const seedJson = Data.makeSeedData();
const schemaJson = jsf.generate(schema);

// combine seed and schema json
const customizer = (a, b) => _.defaultTo(_.add(a, b), undefined);
const newJson = _.mergeWith({}, seedJson, schemaJson, customizer);
// console.log(newJson);
const output = JSON.stringify(newJson);

// write the output
fs.writeFile(__dirname + '/../src/api/db.json', output, (err) => {
  if (err) {
    return console.log(chalk.red(err));
  } else {
    console.log(chalk.green(`Mock data generated into db.json file.`));
  }
});
