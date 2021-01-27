create table helo_users
(id serial primary key,
username varchar,
password varchar,
profile_pic text
);

create table helo_posts(
    id serial primary key,
    title varchar(45),
    content text,
    img text,
    author_id int references helo_users(id),
    date_created timestamp
);