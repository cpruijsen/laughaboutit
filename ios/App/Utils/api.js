let api = {
  
  /* format for post:
    userSignUp: {
      first_name :: string 
	  last_name :: string
      photo :: string
      email :: string
      fb_username :: string
      fb_access :: string 
    }
    
    caption: {
    font :: string
    caption_top :: string
    caption_bottom :: string
    user :: ?? 
    }
    
   ** do we need 
   .then( (data) => {
      return data.json();
    }). as intermediate step? 
  */
  
  // function to get all images/captions for the day
  getDailyCaptions () {
    fetch('https://shielded-springs-75726.herokuapp.com/captions').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyCaptions', res);
      return res; // returns an array of objects [{caption1}, {caption2}, {caption3}] 
    });
  },
  // function to post a user-created caption
  postCaption (caption) {
    fetch('https://shielded-springs-75726.herokuapp.com/captions/giveusthisday', { 
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
    fetch('https://shielded-springs-75726.herokuapp.com/captions', { 
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
    fetch('https://shielded-springs-75726.herokuapp.com/photos').then( (data) => {
      console.log('success showImageOptions', data);
      // do something with the data, display etc.
    });
  },
  // get the image of the day, in raw format, for caption submission
  getDailyRawImage () {
    fetch('https://shielded-springs-75726.herokuapp.com/photos/giveusthisday').then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log('success getDailyRawImage', res);
      return res.url; // should return a public URL for client side app to display in <Image/>
    });
  },
  updateUserInfo (user) {
    // function to update user info from a settings page ( or elsewhere? )
  },
  upVote (captionId) {
    // function to upvote a particular caption
    fetch('https://shielded-springs-75726.herokuapp.com/captions/upvote', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: json.Stringify(captionId)
    }).then( () => { 
      console.log('success on upVote');
    });
  },
  downVote (captionId) {
     fetch('https://shielded-springs-75726.herokuapp.com/captions/downvote', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: json.Stringify(captionId)
    }).then( () => { 
      console.log('success on downVote');
    });
  },
  // register user in our DB, used for later updating of user records.
  userSignUp (user) {
    fetch('https://shielded-springs-75726.herokuapp.com/users/create', {
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
  }
  // other functions.
};

export default api;