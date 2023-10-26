Drop Table if Exists game_console;
Drop Table if Exists video_games;
Drop Table if Exists genre;
Drop Table if Exists console;
 
CREATE TABLE genre(
genreid Serial PRIMARY KEY,
genrename VarChar(50)
);

CREATE TABLE Video_Games (
gameid Serial PRIMARY KEY,
video_game_name VarChar(50),
Description VarChar(100),
genreid Int References Genre(GenreID)
);

CREATE TABLE Console (
consoleid Serial PRIMARY KEY,
console_name VarChar(50),
manufacturer VarChar(50)
);

CREATE TABLE Game_Console (
consoleid Int References Console(consoleid),
gameid Int References Video_Games(gameid),
CONSTRAINT game_conrole_pk PRIMARY KEY (consoleid, gameid)
);

INSERT INTO genre (
genrename
)
VALUES ('Horror');

INSERT INTO video_games (
video_game_name,
description,
genreid
)
VALUES ('CallofDuty', 'First Person Shooter', 1);

INSERT INTO console (
console_name, 
manufacturer
)
VALUES ('PS5', 'Sony');

INSERT INTO game_console (consoleid, gameid) VALUES (1, 1);