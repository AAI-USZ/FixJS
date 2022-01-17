function(currentTimeInSeconds){

            //If told to update to a specific time (by user interaction) then use that time, otherwise get the players current time (automatic update)

            var currentTime = currentTimeInSeconds ? currentTimeInSeconds : Player.getCurrentTime();

             _currentTimeLabel.text(Date.secondsToPrettyPrintTime(currentTime));



            var totalTime = Player.getTotalTime();

            _totalTimeLabel.text(Date.secondsToPrettyPrintTime(totalTime));

        }