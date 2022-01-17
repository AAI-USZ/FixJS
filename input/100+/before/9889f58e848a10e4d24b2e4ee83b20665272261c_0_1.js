function(event) {
        var summary = JSON.parse(event.data);
        // Handle scores
        var scores = summary.scores;
        $('#leaderBoard').empty(); // empty lines to ensure remove of players that left
        for (var i = 0; i < scores.length; i++) {
            var playerName = scores[i].player;
            var score = scores[i].score;
            if (score < 1) {
                score = '-';
            }

            var id = "score_" + playerName;
            if ($("#" + id).length > 0) {
                $("#best_" + id).text(score);
            } else {
                $('#leaderBoard').append('<tr id="' + id + '"><th>' + playerName + '</th><td><span id="best_score_' + playerName + '">' + score
                    + '</span></td></tr>');
            }
        }
    }