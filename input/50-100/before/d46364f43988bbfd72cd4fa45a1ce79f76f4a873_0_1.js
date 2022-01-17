function ( ) {
   // calling the API ...
  // console.log(this.facebook.getUserName() );
        var obj = {
          method: 'feed',
          link: 'http://localhost/git/nodeFriendGuess/webapp/',
          picture: 'http://fbrell.com/f8.jpg',
          name: 'friendGuess!',
          caption: 'a 60second game',
          description: 'hat in 60 sekunden ' + this.correctAnswers + " Freunde erkannt und dabei " + this.points + " Punkte erspielt! Kannst Du mehr Freunde erkennen ?"
        };

        function callback(response) {
          console.log(response);
        }

        FB.ui(obj, callback); 
}