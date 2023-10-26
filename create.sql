
Drop Table if Exists video_games;
Drop Table if Exists genres;
Drop Table if Exists consoles;
DROP TABLE if EXISTS developers;
 
CREATE TABLE genres (
genreid Serial PRIMARY KEY,
genrename VarChar(50) NOT NULL
);

CREATE TABLE consoles (
consoleid Serial PRIMARY KEY,
console_name VarChar(100) NOT NULL,
manufacturer VarChar(100)
);

CREATE TABLE developers (
developerid Serial PRIMARY KEY,
developer_name varchar(100) NOT NULL
);

CREATE TABLE video_games (
gameid Serial PRIMARY KEY,
video_game_name VarChar(100) NOT NULL,
genreid Int References genres(GenreID),
consoleid Int REFERENCES consoles(consoleid),
developerid Int REFERENCES developers(developerid)
);

-- genres
INSERT INTO genres (genrename) VALUES ('Horror');
INSERT INTO genres (genrename) VALUES ('Action');
INSERT INTO genres (genrename) VALUES ('Shooter');
INSERT INTO genres (genrename) VALUES ('Sports');
INSERT INTO genres (genrename) VALUES ('RPG');
INSERT INTO genres (genrename) VALUES ('Racing');
INSERT INTO genres (genrename) VALUES ('Fantasy');

-- consoles
INSERT INTO consoles (console_name, manufacturer) VALUES ('Playstation 5', 'Sony');
INSERT INTO consoles (console_name, manufacturer) VALUES ('Xbox Series X', 'Microsoft');
INSERT INTO consoles (console_name, manufacturer) VALUES ('Nintendo Switch', 'Nintendo');

-- developers
    --xbox
INSERT INTO developers (developer_name) VALUES ('Tango Gameworks');
INSERT INTO developers (developer_name) VALUES ('Bethesda');
INSERT INTO developers (developer_name) VALUES ('Turn 10 Studios');
INSERT INTO developers (developer_name) VALUES ('Obsidian');
INSERT INTO developers (developer_name) VALUES ('343 Industries');
INSERT INTO developers (developer_name) VALUES ('Playground Games');
    --playstation
INSERT INTO developers (developer_name) VALUES ('Insomniac Games');
INSERT INTO developers (developer_name) VALUES ('Guerrilla Games');
INSERT INTO developers (developer_name) VALUES ('Polyphony Digital');
INSERT INTO developers (developer_name) VALUES ('Sucker Punch Productions');
INSERT INTO developers (developer_name) VALUES ('Naughty Dog');
INSERT INTO developers (developer_name) VALUES ('Santa Monica Studio');
    --nintendo
INSERT INTO developers (developer_name) VALUES ('Nintendo');
INSERT INTO developers (developer_name) VALUES ('Game Freak');
INSERT INTO developers (developer_name) VALUES ('Monolith Soft');
INSERT INTO developers (developer_name) VALUES ('Nd Cube');

-- games
    --nintendo
INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('The Legend of Zelda: Tears of the Kingdom',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Nintendo Switch'),
     (SELECT developerid FROM developers WHERE developer_name = 'Nintendo'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Pokemon Scarlet',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Nintendo Switch'),
     (SELECT developerid FROM developers WHERE developer_name = 'Game Freak'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Xenoblade Chronicles 3',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Nintendo Switch'),
     (SELECT developerid FROM developers WHERE developer_name = 'Monolith Soft'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Super Mario Party',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Nintendo Switch'),
     (SELECT developerid FROM developers WHERE developer_name = 'Nd Cube'));

    --playstation
INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Spider-Man 2',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Insomniac Games'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Horizon Zero Dawn',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Guerrilla Games'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Gran Turismo 7',
     (SELECT genreid FROM genres WHERE genrename = 'Racing'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Polyphony Digital'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Ghost of Tsushima',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Sucker Punch Productions'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('God of War',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Santa Monica Studio'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('The Last of Us',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Playstation 5'),
     (SELECT developerid FROM developers WHERE developer_name = 'Naughty Dog'));

    --xbox
INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Hi-Fi Rush',
     (SELECT genreid FROM genres WHERE genrename = 'Action'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = 'Tango Gameworks'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Starfield',
     (SELECT genreid FROM genres WHERE genrename = 'RPG'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = 'Bethesda'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Forza Motorsport',
     (SELECT genreid FROM genres WHERE genrename = 'Racing'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = 'Turn 10 Studios'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Avowed',
     (SELECT genreid FROM genres WHERE genrename = 'RPG'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = 'Obsidian'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Halo Infinite',
     (SELECT genreid FROM genres WHERE genrename = 'Shooter'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = '343 Industries'));

INSERT INTO video_games (video_game_name, genreid, consoleid, developerid) 
    VALUES ('Fable',
     (SELECT genreid FROM genres WHERE genrename = 'Fantasy'),
     (SELECT consoleid FROM consoles WHERE console_name = 'Xbox Series X'),
     (SELECT developerid FROM developers WHERE developer_name = 'Playground Games'));

