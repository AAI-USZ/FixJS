function(currentTimeInSeconds){

            //If told to update to a specific time (by user interaction) then use that time, otherwise get the players current time (automatic update)

            var currentTime = currentTimeInSeconds ? currentTimeInSeconds : Player.getCurrentTime();

             currentTimeLabel.text(Helpers.prettyPrintTime(currentTime));



            var totalTime = Player.getTotalTime();

            totalTimeLabel.text(Helpers.prettyPrintTime(totalTime));

        }