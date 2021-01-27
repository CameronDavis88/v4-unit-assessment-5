select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where lower(title) like $1
where post_id != ${post_id}
order by date_created desc;


-- not sure how to do this:

-- Search_other_users_posts.sql
-- This should get all the same information as searching all of the posts, but with the current user's posts filtered out.
-- Write a query that will get posts from everyone but the current user, with the newest ones first