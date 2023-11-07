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

// get specific game details
router.get('/gamepage/:video_game_name', async (req, res) => {
  const name = req.params.video_game_name;
  name.replace('/%20', ' ');
  const query =
    "SELECT video_game_name, genrename, developer_name, console_name, manufacturer FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid AND video_games.video_game_name = '" +
    name +
    "';";

  const result = await db.query(query);

  res.render('gamepage', {
    query: result.rows,
    video_game_name: name,
    delete: false,
  });
});

// update game details
router.get('/update/:video_game_name', async (req, res) => {
  const name = req.params.video_game_name;
  name.replace('/%20', ' ');

  const query =
    "SELECT video_game_name, genrename, developer_name, console_name, manufacturer, gameid FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid AND video_games.video_game_name = '" +
    name +
    "';";

  const result = await db.query(query);

  res.render('update', {
    result: result.rows,
    video_game_name: name,
    genrename: result[0],
    developer_name: result[0],
    console_name: result[3],
  });
});

router.get('/add-new', async (req, res) => {
  res.render('add-new');
});

// create game
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

// unknown
router.get('/update/:game', async (req, res) => {
  res.json(req.query);
});
// Listing collectibles

// another update attempt
router.post('/done', async (req, res) => {
  const update =
    "UPDATE video_games SET video_game_name = '" +
    req.body.game_name +
    "', genreid = (SELECT genreid FROM genres WHERE genrename = '" +
    req.body.genre +
    "'), consoleid = (SELECT consoleid FROM consoles WHERE console_name = '" +
    req.body.console +
    "'), developerid = (SELECT developerid FROM developers WHERE developer_name = '" +
    req.body.developer +
    "')";

  await db.query(update);

  res.render('index');
});

//  ask to delete game
router.get('/gamepage-delete/:video_game_name', async (req, res) => {
  const name = req.params.video_game_name;
  name.replace('/%20', ' ');

  const collectibles =
    "SELECT video_game_name, genrename, developer_name, console_name, manufacturer FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid AND video_games.video_game_name = '" +
    name +
    "';";

  const result = await db.query(collectibles);

  res.render('gamepage', { query: result.rows, delete: true });
});

// delete game
router.get('/delete-game/:video_game_name', async (req, res) => {
  const name = req.params.video_game_name;
  name.replace('/%20', ' ');

  const deleteItem =
    "DELETE FROM video_games WHERE video_game_name = '" + name + "';";

  await db.query(deleteItem);

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

module.exports = router;
