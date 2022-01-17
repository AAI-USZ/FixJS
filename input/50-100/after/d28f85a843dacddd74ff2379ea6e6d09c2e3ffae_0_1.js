function getUserImage() {
    FB.api({
      method: 'fql.query',
      query: 'SELECT pic_square FROM user WHERE uid=me()'
    },
    function(response) {
      userImage = response[0].pic_square;
    });
  }