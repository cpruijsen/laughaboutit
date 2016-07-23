let api = {
  // format for post:
  // https://docs.google.com/document/d/1rxw_dFSn0u00L-nwGLMVzQUIo_du6G0BJiq1Qlispy4/edit?usp=sharing
  
  // function to get all images/captions for the day
  getDailyCaptions () {
    return fetch('https://shielded-springs-75726.herokuapp.com/captions').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyCaptions', res);
      return res; // returns an array of objects [{caption1}, {caption2}, {caption3}] 
    });
  },
  // function to post a user-created caption
  postCaption (caption) {
    return fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caption) // review.
    }).then( (res) => { 
      console.log('success postCaption', res); 
    }).catch( (err) => { 
      console.log('error on postCaption', err); 
    });
  },
  // user submits an image to the DB, for later use in daily captions etc.
  postImage (image) {
    return fetch('https://shielded-springs-75726.herokuapp.com/captions', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image)
    }).then( (res) => { 
      console.log('success postImage', res); 
    }).catch( (err) => { 
      console.log('error on postImage', err); 
    });
  },
  // get images from DB to propose to user for captions (to friends etc.)
  showImageOptions () {
    return fetch('https://shielded-springs-75726.herokuapp.com/photos').then( (data) => {
      console.log('success showImageOptions', data);
      // do something with the data, display etc.
    });
  },
  // get the image of the day, in raw format, for caption submission
  getDailyRawImage () {
    return fetch('https://shielded-springs-75726.herokuapp.com/photos/giveusthisday').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyRawImage', res);
      return res.url; // should return a public URL for client side app to display in <Image/>
    });
  }, // function to update user email, name, ...
  updateUserInfo (newUserInfo) { // {userId: userId, ...props to be updated}
    return fetch('https://shielded-springs-75726.herokuapp.com/users/update', { // endpoint not yet functional.
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.Stringify(newUserInfo)
    }).then( () => { 
      console.log('success on upVote');
    });
  }, // function to upvote a particular caption
  upVote (captionId) {
    return fetch('https://shielded-springs-75726.herokuapp.com/captions/upvote', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.Stringify(captionId)
    }).then( () => { 
      console.log('success on upVote');
    });
  }, // downvote a caption (swipe no/left)
  downVote (captionId) {
     return fetch('https://shielded-springs-75726.herokuapp.com/captions/downvote', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.Stringify(captionId)
    }).then( () => { 
      console.log('success on downVote');
    });
  },
  // register user in our DB, used for later updating of user records.
  userSignUp (user) {
    return fetch('https://shielded-springs-75726.herokuapp.com/users/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then( (res) => {
      console.log('success userSignUp', res);
    }).catch( (err) => {
      console.log('error userSignUp', err);
    });
  },
  // get user info - used for populating the UserProfile pages
  getUserInfo (userId) {
    return fetch('https://shielded-springs-75726.herokuapp.com/users', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.Stringify(userId)
    }).then( (data) => { // TODO: check for endpoint with team.
      return data.json();
    }).then( (res) => {
      console.log('success getUserInfo', res);
      return res; // {first_name: string, last_name: string, ...}
    });
  }
  // other functions.
};

export default api;