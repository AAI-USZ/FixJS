function(){

        Player.seekTo(_selector.val());



        //Once the user has seeked to the new value let our update function run again.

        //Wrapped in a set timeout because there is some delay before the seekTo and the equivalent of flickering happens.

        setTimeout(function(){

            _userChangingValue = false;

        }, 1500);

    }