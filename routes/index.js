const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const collectibles = await db.query(
    'SELECT video_game_name, genrename, console_name FROM video_games, genre, console, game_console WHERE video_games.genreid = genre.genreid AND video_games.gameid = game_console.gameid AND game_console.consoleid = console.consoleid;'
  );
  res.render('index', { title: 'Express', collectibles: collectibles.rows });
});

// Listing collectibles

module.exports = router;
