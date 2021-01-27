insert into helo_users
(username, password, profile_pic)
values
(${username}, ${hash}, ${profile_pic})

returning username, profile_pic;
-- Im supposed to return the user just created, 
-- but Im not sure if what I did actiually did that.

-- should the password on line 4 be hash or password?