/**
 * Created by hpp on 2017/4/26.
 */
const express = require('express');
const mysql = require('mysql');
const db = require('../lib/db');

const router = express.Router();

const resources = {
  users: {
    columns: ['name', 'balance'],
  },
  consumes: {
    columns: ['name', 'total_cost', 'date', 'people_count']
  }
};

const dbExec = (sql, res, isSelect) => {
  let connection = null;
  db.getConnection()
    .then((conn) => {
      connection = conn;
      return connection.query(sql);
    })
    .then((rows) => {
      if (isSelect === true) {
        console.log(rows);
        res.status(200).json(rows);
      } else {
        console.log('rows', rows);
        res.status(200).json({
          success: 1
        });
      }
    })
    .then(() => db.releaseConnection(connection))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const checkResource = (name, res) => {
  if (resources[name] === undefined) {
    res.status(404);
    return false;
  }
  return true;
};

// eslint-disable-next-line
router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  if (!checkResource(name, res)) return;

  const sqlTmp = 'SELECT ?? FROM ??';
  const sql = mysql.format(sqlTmp, [['id'].concat(resources[name].columns), name]);
  console.log(sql);
  dbExec(sql, res, true);
});


// eslint-disable-next-line
router.post('/:name', (req, res, next) => {
  const name = req.params.name;
  if (!checkResource(name, res)) return;

  console.log('insert', name);
  const sqlTmp = 'INSERT INTO ?? SET ?';
  const sql = mysql.format(sqlTmp, [name, req.body]);
  dbExec(sql, res);
});

// eslint-disable-next-line
router.put('/:name/:id', (req, res, next) => {
  const name = req.params.name;
  const id = req.params.id;
  if (!checkResource(name, res)) return;

  console.log('update', name, id);
  const sqlTmp = 'UPDATE ?? SET ? WHERE id = ?';
  const sql = mysql.format(sqlTmp, [name, req.body, id]);
  console.log(sql);
  dbExec(sql, res);
});

// eslint-disable-next-line
router.delete('/:name/:id', (req, res, next) => {
  const name = req.params.name;
  const id = req.params.id;
  if (!checkResource(name, res)) return;

  console.log('delete', name, id);
  const sqlTmp = 'DELETE FROM ?? WHERE ?? = ?';
  const sql = mysql.format(sqlTmp, [name, 'id', id]);
  console.log(sql);
  dbExec(sql, res);
});


module.exports = router;
