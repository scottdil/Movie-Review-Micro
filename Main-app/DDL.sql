SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Movies (
    movie_ID        INT NOT NULL AUTO_INCREMENT,
    title           VARCHAR(255) NOT NULL,
    year            DATE NOT NULL,
    director        VARCHAR(255) NOT NULL,
    plot            VARCHAR(255) NOT Null,
    PRIMARY KEY     (movie_ID)
);

INSERT INTO Movies (title, director, plot)
    values('The Godfather', '1972', 'Francis Ford Coppola', 'Don Vito Corleone, head of a mafia family, 
    decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally 
    puts the lives of his loved ones in grave danger.'),
    ('2001: A Space Odyssey', '1968', 'Stanley Kubrick', 'After uncovering a mysterious artifact buried 
    beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins: a spacecraft manned 
    by two men and the supercomputer HAL 9000.'),
    ("Burning', '2018', 'Lee Chang-dong', 'Jong-su bumps into a girl who used to live in the same neighborhood, 
    who asks him to look after her cat while she's on a trip to Africa. When back, she introduces Ben, a mysterious 
    guy she met there, who confesses his secret hobby.");


