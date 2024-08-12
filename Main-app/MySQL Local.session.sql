DROP TABLE IF EXISTS Movie;

CREATE TABLE Movie (
    movie_ID        INT NOT NULL AUTO_INCREMENT,
    title           VARCHAR(255) NOT NULL,
    release_year    YEAR NOT NULL,
    director        VARCHAR(255) NOT NULL,
    plot            TEXT NOT Null,
    rating          DECIMAL (4, 2),
    runtime         VARCHAR(255) NOT NULL,
    poster          TEXT,
    genre           VARCHAR(255) NOT NULL,
    review          MEDIUMTEXT,
    PRIMARY KEY     (movie_ID)
);

INSERT INTO Movie (title, release_year, director, plot, rating, runtime, poster, genre, review)
    values('The Godfather', 1972, 'Francis Ford Coppola', 'Don Vito Corleone, head of a mafia family, 
    decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally 
    puts the lives of his loved ones in grave danger.', 9.5, "175 min", "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", "Crime, Drama",
    
    "This film works so well because it takes place in an underworld in which we are so embedded that we do not even observe it. Coppola puts us straight in the smack-dab center of what is, admittedly, a society made by criminals for criminals. It is also the reason why it's so welcoming. We are surrounded by its inhabitants--cold-blooded murderers, men who see crime like a 9 to 5 job masquerading as honorable men. And I do mean men. From the outside, we would only witness the horrifying, disturbing manifestations of their well-thought out actions.

But it goes even deeper than that. It all revolves around the Corleone family led by Don Vito Corleone (Marlon Brando). He is the most honest of these men, sitting right on the edge. But for people like him, who do not fully embrace this world, it's not easy. He avoids conflict until it is absolutely necessary. He is a man defined by moral principles. There is a scene at the beginning, in which, during his daughter's wedding day, one of his associates, Luca Brasi (Lenny Montana) practices his speech that he is going to give to the Don when he meets him. The scene with these two is funny and almost adorable. I could not help but sympathize both of them only to realize that I am feeling warmth for two mobsters. Not to even mention that Lenny Montana was an actual mob hit-man and that he was actually nervous as he said that line.

The more I watched the more I realized just how incredibly complex and ruthless this society is and how it has the power to corrupt anyone to come in contact with it. The best example is Corleone's youngest son, Michael (Al Pacino). He returns home for his sister's wedding as a war hero dressed the part with his long-time girlfriend, Kay Adams (Diane Keaton). At first, he avoids this underworld, but necessity, first-hand exposure and just its sheer devilish appealing nature draws him in. As we get further in the film, the change is shocking and every outsider who ever got close to him is tainted in one way or another. If they survive it, they are drawn in as well as we are as viewers."),

    ('2001: A Space Odyssey', 1968, 'Stanley Kubrick', 'After uncovering a mysterious artifact 
    buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins: a 
    spacecraft manned by two men and the supercomputer HAL 9000.', 9.65, "149 min", "https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", "Adventure, Sci-Fi", "Simply the best"),

    ('Burning', 2018, 'Lee Chang-dong', "Jong-su bumps into a girl who used to live in the 
        same neighborhood, who asks him to look after her cat while she's on a trip to Africa. 
        When back, she introduces Ben, a mysterious guy she met there, who confesses his secret 
        hobby.", 9.25, "148 min", "https://m.media-amazon.com/images/M/MV5BMWNmYjI1M2UtNDdkNi00MTgwLWFiZmYtODcxNWZhM2Y2NWFkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", "Drama, Mystery, Thriller", "real good good");



SELECT * FROM Movie;
