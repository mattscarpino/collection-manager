const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const collectibles = await db.query(
    'SELECT video_game_name, genrename, developer_name, console_name FROM video_games, genres, developers, consoles WHERE video_games.genreid = genres.genreid AND video_games.developerid = developers.developerid AND video_games.consoleid = consoles.consoleid'
  );
  res.render('index', { title: 'Express', collectibles: collectibles.rows });
});

// Listing collectibles

module.exports = router;
