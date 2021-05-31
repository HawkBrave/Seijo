DROP TABLE IF EXISTS users, 
  posts, 
  topics, 
  moderators, 
  comments, 
  saved_posts,
  saved_comments;

CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY, 
  username VARCHAR (150) NOT NULL UNIQUE,
  email VARCHAR (200) NOT NULL,
  password VARCHAR (512) NOT NULL,
  profile_picture VARCHAR,
  about VARCHAR (150),
  joined TIMESTAMP WITHOUT TIME ZONE 
    DEFAULT (NOW() AT TIME ZONE 'UTC'),
  deleted BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS posts (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  forked_post_id INT,
  title VARCHAR (100),
  votes BIGINT NOT NULL DEFAULT 0,
  created TIMESTAMP WITHOUT TIME ZONE 
    DEFAULT (NOW() AT TIME ZONE 'UTC'),
  forked BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (id),

  CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE,

  CONSTRAINT forked_post_id_fk
    FOREIGN KEY (forked_post_id)
      REFERENCES posts (id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS topics (
  id INT GENERATED ALWAYS AS IDENTITY,
  creator_id INT NOT NULL,
  created TIMESTAMP WITHOUT TIME ZONE 
    DEFAULT (NOW() AT TIME ZONE 'UTC'),
  moderators INT NOT NULL,
  deleted BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (id),

  CONSTRAINT moderators_fk
    FOREIGN KEY (creator_id)
      REFERENCES users (id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS moderators (
  topic_id INT, 
  user_id INT,

  PRIMARY KEY (topic_id, user_id),
  
  CONSTRAINT topic_id_fk
    FOREIGN KEY (topic_id)
      REFERENCES topics (id)
      ON DELETE CASCADE,

  CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id INT GENERATED ALWAYS AS IDENTITY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  body VARCHAR (300),
  deleted BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (id),

  CONSTRAINT post_id_fk
    FOREIGN KEY (post_id)
      REFERENCES posts (id)
      ON DELETE CASCADE,

  CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS saved_posts (
  user_id INT,
  post_id INT,

  PRIMARY KEY (user_id, post_id),

  CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE,

  CONSTRAINT post_id_fk
    FOREIGN KEY (post_id)
      REFERENCES posts (id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_comments (
  user_id INT,
  comment_id INT,

  PRIMARY KEY (user_id, comment_id),

  CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE CASCADE,
  
  CONSTRAINT comment_id_fk
    FOREIGN KEY (comment_id)
      REFERENCES comments (id)
      ON DELETE CASCADE
);