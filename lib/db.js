/**
 * Created by hpp on 2017/3/14.
 */
const mysql = require('promise-mysql');
const config = require('../lib/config');

const db = mysql.createPool(config.mysql_pool);

module.exports = db;
