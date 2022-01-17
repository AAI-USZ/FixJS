function(xml_manager, y, field_height){
		enchant.Group.call(this);

        var back = new enchant.Sprite(game.width, game.height);
        back.backgroundColor = "rgba(100, 100, 100, 0.6)";
        this.addChild(back);
        
        this.moveTo(0, 0);
        this.width = game.width;
        this.height = game.height;
        
        var pause_label = new enchant.Label("PAUSED");
		pause_label.font = "bold xx-large 'うずらフォント',serif";
		pause_label.y = (y + 100) + field_height / 2 + 40;
		setRulerStyle(" font: " + pause_label.font);
		pause_label.width = pause_label.text.getExpansion().width;
        pause_label.x = game.width / 2 - pause_label.width / 2;
		pause_label.backgroundColor = "#ffffff";
		pause_label.color = "#ff1512";

        var pause_texts = xml_manager.getText("texts")[system_lang].pause;
		var explain_label = new enchant.Label(pause_texts.explanation);
		explain_label.x = 0;
		explain_label.y = pause_label.y + 40;
		explain_label.font = "bold large 'うずらフォント', serif";
		explain_label.width = game.width;
		explain_label.backgroundColor = "#ffffff";
		explain_label.color = "#000000";
        
        var ranking_label = new enchant.Label("");
    	ranking_label.x = 0;
		ranking_label.y = y + 100;
		ranking_label.width = game.width;
		ranking_label.backgroundColor = "#ffffff";

		var ranking_list = document.createElement("div");
		ranking_list.setAttribute("style", "height: " + field_height / 2 + "px; border: inset 5px #ff1012; overflow: hidden");
		ranking_list.setAttribute("id", "ranking");
		var ranking_title = document.createElement("p");
		ranking_title.setAttribute("style", "text-align: center; font: bold large 'うずらフォント', serif");
		ranking_title.textContent = "RANKING";
		ranking_list.appendChild(ranking_title);
		ranking_list.appendChild(document.createElement("br"));
        
        var user_name = game.memory.player.screen_name, json_obj = game.memories.ranking;
        for(var i = 0; i < json_obj.length; ++i){
        	var line = document.createElement("span"), obj = json_obj[i];
			var mode_name = (obj.data.is_survival) ? "（サバイバル）" : 
                            (obj.data.is_vs) ? "（対CPU）" : "（ゆったり）";
			line.textContent = (i + 1) + " " + obj.screen_name + " " + obj.score + " " + mode_name;
			var style;
			if(user_name && obj.screen_name.search(user_name.replace(/[\(\)\$\[\]\.\?\*\+\^\!\{\}\\\|\/]/g, "\\$&")) != -1){
				style = "color: #ff1012; font: bold large 'うずらフォント'";
			}else{
				style = "color: #000000; font: italic large 'うずらフォント'";
			}
			line.setAttribute("style", style);
			ranking_list.appendChild(line);
			ranking_list.appendChild(document.createElement("br"));
		}

		ranking_label._element.appendChild(ranking_list);
        this.addChild(ranking_label);

		this.addChild(explain_label);
		this.addChild(pause_label);

		var touched = false;
		this.addEventListener('touchstart', function(){
			touched = true;
		});

		this.addEventListener('touchend', function(){
			if(touched && !game.input.b){
				game.input["b"] = true;
				touched = false;
			}
		});

		this.addEventListener('enterframe', function(){
    		if(ranking_list != null){
				if(ranking_list.scrollTop != ranking_list.scrollHeight - ranking_list.clientHeight){
					++ranking_list.scrollTop;	//ランキングを少しずつスクロールさせる
				}else{
					ranking_list.scrollTop = 0;
				}
			}
		});
	}