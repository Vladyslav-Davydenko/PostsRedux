const usersData = require("./users.json");
const postsData = require("./posts.json");

module.exports = () => ({
  users: usersData,
  posts: postsData,
});
