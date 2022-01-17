function(){

        Player.seekTo(selector.val());



        //Once the user has seeked to the new value let our update function run again.

        //Wrapped in a set timeout because there is some delay before the seekTo and the equivalent of flickering happens.

        setTimeout(function(){

            userChangingValue = false;

        }, 1500);

    }