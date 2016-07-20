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
    
  */
  
  // function to get all images/captions for the day
  getDailyCaptions () {
    fetch('https://secure-hollows-18810.herokuapp.com/captions').then( (data) => {
      console.log('success getDailyCaptions', data);
      // do something with the data, display etc.
    });
  },
  // function to post a user-created caption
  postCaption (caption) {
    fetch('https://secure-hollows-18810.herokuapp.com/captions', { 
      method: 'POST',
      body: JSON.stringify(caption) // review.
    }).then( (data) => { 
      console.log('success postCaption', data); 
    }).catch( (err) => { 
      console.log('error on postCaption', err); 
    });
  },
  // user submits an image to the DB, for later use in daily captions etc.
  postImage (image) {
    fetch('https://secure-hollows-18810.herokuapp.com/captions', { 
      method: 'POST',
      body: JSON.stringify(image)
    }).then( (data) => { 
      console.log('success postImage', data); 
    }).catch( (err) => { 
      console.log('error on postImage', err); 
    });
  },
  // get images from DB to propose to user for captions (to friends etc.)
  showImageOptions () {
    fetch('https://secure-hollows-18810.herokuapp.com/photos').then( (data) => {
      console.log('success showImageOptions', data);
      // do something with the data, display etc.
    });
  },
  // get the image of the day, in raw format, for caption submission
  getDailyRawImage () {
    fetch('https://secure-hollows-18810.herokuapp.com/photos/giveusthisday').then( (data) => {
      console.log('success getDailyRawImage', data);
      return data; // should return a public URL for client side app to display in <Image/>
    });
  },
  updateUserInfo (user) {
    // function to update user info from a settings page ( or elsewhere? )
  },
  upVote (caption) {
    // function to upvote a particular caption
  },
  // register user in our DB, used for later updating of user records.
  userSignUp (user) {
    fetch('https://secure-hollows-18810.herokuapp.com/users/create', {
      method: 'POST',
      body: JSON.stringify(user)
    }).then( (data) => {
      console.log('success userSignUp', data);
    }).catch( (err) => {
      console.log('error userSignUp', err);
    });
  }
  // other functions.
};

export default api;