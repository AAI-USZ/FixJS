function refreshScores(){
        jsRoutes.controllers.Gaming.gameScores($("#roomId").val(), $("#gameId").val()).ajax({
            cache:false,
            success: function(data, textStatus, jqXHR){
                //refill the leaderboard table
                var $tbody = $("tbody#leaderBoard");
                $tbody.empty();
                $.each(data.scores, function(index, playerScore){
                    $tbody.append("<tr><th>" + playerScore.player +  "</th><td><span>"+ playerScore.score + "</span></td></tr>");
                });
            }
        });
    }