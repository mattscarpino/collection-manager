const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  let collectibles =
    'SELECT video_game_name, genrename, developer_name, console_name FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid';

  const params = [];

  if (req.query.video_game_name) {
    collectibles += ' AND video_game_name ILIKE $1';
    params.push('%' + req.query.video_game_name + '%');
  } else if (req.query.genrename) {
    collectibles += ' AND genrename ILIKE $1';
    params.push('%' + req.query.genrename + '%');
  } else if (req.query.console_name) {
    collectibles += ' AND console_name ILIKE $1';
    params.push('%' + req.query.console_name + '%');
  } else if (req.query.developer_name) {
    collectibles += ' AND developer_name ILIKE $1';
    params.push('%' + req.query.developer_name + '%');
  }

  if (req.query.sort === 'video_game_name_a-z') {
    collectibles += ' ORDER BY video_game_name';
  } else if (req.query.sort === 'genrename_a-z') {
    collectibles += ' ORDER BY genrename';
  } else if (req.query.sort === 'console_name_a-z') {
    collectibles += ' ORDER BY console_name';
  } else if (req.query.sort === 'developer_name_a-z') {
    collectibles += ' ORDER BY developer_name';
  }

  if (req.query.sort === 'video_game_name_z-a') {
    collectibles += ' ORDER BY video_game_name DESC';
  } else if (req.query.sort === 'genrename_z-a') {
    collectibles += ' ORDER BY genrename DESC';
  } else if (req.query.sort === 'console_name_z-a') {
    collectibles += ' ORDER BY console_name DESC';
  } else if (req.query.sort === 'developer_name_z-a') {
    collectibles += ' ORDER BY developer_name DESC';
  }

  const result = await db.query(collectibles, params);

  res.render('index', { title: 'Express', collectibles: result.rows });
});

// router.get('/gamepage/:video_game_name', async (req, res) => { });

router.get('/add-new', async (req, res) => {
  res.render('add-new');
});

router.post('/', async (req, res) => {
  const query =
    "INSERT INTO developers(developer_name) VALUES('" +
    req.body.developer +
    "');";
  // const dubs = [];
  // dubs.push('' + req.body.developer + '');

  await db.query(query);

  const second =
    "INSERT INTO video_games(video_game_name, genreid, consoleid, developerid) VALUES('" +
    req.body.game_name +
    "', (SELECT genreid FROM genres WHERE genrename = '" +
    req.body.genre +
    "'), (SELECT consoleid FROM consoles WHERE console_name = '" +
    req.body.console +
    "'), (SELECT developerid FROM developers WHERE developer_name = '" +
    req.body.developer +
    "'));";

  await db.query(second);

  const collectibles =
    'SELECT video_game_name, genrename, developer_name, console_name FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid';

  const reload = await db.query(collectibles);

  res.render('index', { title: 'Express', collectibles: reload.rows });
});

// Listing collectibles

module.exports = router;
