function ( ) {
   // calling the API ...
  // console.log(this.facebook.getUserName() );
        var obj = {
          method: 'feed',
          link: 'http://kayschneider.github.com/friendGuess/',
          picture: 'http://kayschneider.github.com/friendGuess/img/logo128.png',
          name: 'friendGuess!',
          caption: 'a 60second game',
          description: 'hat in 60 sekunden ' + this.correctAnswers + " Freunde erkannt und dabei " + this.points + " Punkte erspielt! Kannst Du mehr Freunde erkennen ?"
        };

        function callback(response) {
          console.log(response);
        }

        FB.ui(obj, callback); 
}