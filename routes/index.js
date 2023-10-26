const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  let collectibles =
    'SELECT video_game_name, genrename, developer_name, console_name FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid';

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

  const result = await db.query(collectibles);

  res.render('index', { title: 'Express', collectibles: result.rows });
});

// Listing collectibles

module.exports = router;
