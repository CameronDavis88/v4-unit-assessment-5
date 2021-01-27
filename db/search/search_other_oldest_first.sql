select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on u.id = p.author_id
where lower(title) like $1
where post_id != ${post_id}
order by date_created asc;


-- Im not sure right mow how to filter out current users posts:
-- search_other_oldest_first.sql
-- This should get all the same information as searching all of the posts, but with the current user's posts filtered out and ordered by the oldest first.
-- Use aliases on all the same pieces as above
-- Use an operator to make sure the author_id does not match the one sent from the controller file
-- Check that you order the dates correctly