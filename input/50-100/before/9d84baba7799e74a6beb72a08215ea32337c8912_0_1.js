function getUserImage() {
    var image; 
    
    FB.api({
      method: 'fql.query',
      query: 'SELECT pic_square FROM user WHERE uid=me()'
    },
    function(response) {
      image = response[0].pic_square;
    });

    return image;
  }