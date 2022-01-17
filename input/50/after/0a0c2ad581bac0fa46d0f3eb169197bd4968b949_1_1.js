function(){
        var score = japanese_score.calculate_score();
        equal(score.black_points,7);
        equal(score.white_points,5);
    }