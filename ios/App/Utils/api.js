let api = {
  getUserInfo (user) {
    // function to get username, avatar
    /* example:
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json())
    */

  },
  getDailyCaptions () {
    // function to get all images/captions for the day
    // includes: caption text, image URL, vote count, user who posted ?
  },
  postCaption (caption) {
    // function to post a user-created caption
  },
  showImageOptions () {
    // function to get images from DB to propose to user for caption
  },
  updateUserInfo (user) {
    // function to update user info from a settings page ( or elsewhere? )
  },
  upVote (caption) {
    // function to upvote a particular caption
  }
  // other functions.
};

export default api;