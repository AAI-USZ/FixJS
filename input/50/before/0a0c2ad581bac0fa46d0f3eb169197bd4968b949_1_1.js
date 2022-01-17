function(){
        var score = japanese_score.calculate_score();
        equal(score.black_points,5);
        equal(score.white_points,4);
    }