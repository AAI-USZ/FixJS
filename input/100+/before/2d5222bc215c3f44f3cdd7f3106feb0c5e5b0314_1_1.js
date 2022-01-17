function(stage){
        var xml_manager = stage.getManager("xml"), player_score = stage.getPanel().score_label, opponent_score = stage.getManager("opponent").panel.score_label;
        game.memory.player.data = {is_survival : game.is_survival};
        game.memory_update();
        
        var result_texts = xml_manager.getText("texts").common.results[game.mode.split("_")[0]];
        var evalVersus = function(diff_score, diff_time){
            if(diff_score == 0){return (diff_time > 0) ? result_texts[0] : result_texts[1];}
            return (diff_score > 0) ? result_texts[0] : result_texts[1];
        };
        var evalScoreSlow = function(score){
            return (score < 5000) ? result_texts[0] :
                   (score < 15000) ? result_texts[1] :
                   (score < 30000) ? result_texts[2] : 
                   (score < 60000) ? result_texts[3] :
                   (score < 100000) ? result_texts[4] :
                   (score < 200000) ? result_texts[5] : result_texts[6];
        };
        var evalScoreFast = function(score){
            return evalScoreSlow(Math.floor(score * 2));
        };
        
        var diff_score = player_score.getScore() - opponent_score.getScore(), diff_time = player_score.getRemainingTime() - opponent_score.getRemainingTime();
        var label = new enchant.Label(xml_manager.getText("texts")[system_lang].end.wait_message);
        label.font = "normal x-large 'うずらフォント', serif";
        setRulerStyle(" font: " + label.font);
        var size = label.text.getExpansion();
        label.moveTo(game.width / 2 - size.width / 2, 280);
        label.width = size.width;
        stage.addChild(label);
        game.end(player_score.getScore(), (game.mode.search("vs") != -1) ? evalVersus(diff_score, diff_time) :
            (game.is_survival) ? evalScoreFast(player_score.getScore()) : evalScoreSlow(player_score.getScore()));
	}