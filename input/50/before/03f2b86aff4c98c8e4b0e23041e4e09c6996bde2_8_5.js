function(){

        if(!_userChangingValue) {

            var currentTime = Player.getCurrentTime();

            progressbar.setElapsedTime(currentTime);



            var totalTime = Player.getTotalTime();

            progressbar.setTotalTime(totalTime);

        }

    }