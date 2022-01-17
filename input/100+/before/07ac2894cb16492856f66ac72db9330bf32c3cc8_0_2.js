function(){
        var start_searching_pieces = this.moving_pieces.slice(0), self = this;    		//探索の起点とするピースたち
        var exploreAround = function(pieces, level){
            if(level > 3){return;}
            pieces.forEach(function(piece){
                if(!piece){return;}
                this.panel.field.addNeighborsReference(piece);
                piece.neighbors_buffer = piece.neighbors.slice(0);
                if(!start_searching_pieces.contains(piece) && !this.moving_pieces.contains(piece)){
                    start_searching_pieces.push(piece);
                }
                exploreAround(piece.neighbors, level + 1);
            }, self);
        }
		
        exploreAround(this.moving_pieces, 0);    //動いてきたピースの３つ隣のピースまで探索の起点にする

        var candidates = [];
		start_searching_pieces.forEach(function(piece, i, array){		//同じ種類のピースの塊を探す
			var group = [];
			piece.searchForSameTypeOfPiece(group, array, this.effect_manager);

			if(group.length >= 3){candidates.push(group);}
		}, this);
		this.moving_pieces.splice(0);

		var pieces_searching_for_couple = [], couple_indices = [], disappearing_pieces = [];
		candidates.sort(function(lhs, rhs){	    //同一種のグループを優先して探せるように並べ替えを行う
			return (lhs.length > rhs.length) ? 1 :
				(lhs.length == rhs.length) ? 0 : -1;
		}).forEach(function(group, cur_index){
			if(group.length >= 4){		    //4個以上は同一種からのみなるグループを探す
				group.forEach(function(piece, i, array){
					disappearing_pieces.push(piece);

					var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
					if(index != -1){delete this.moving_pieces[index];}

					piece.makeUnconnected();
					this.effect_manager.remove(piece);

					for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
                        //自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
    					//同時に2カ所以上で消えるピースが出てくる可能性があるため
						if(!upper || array.contains(upper) || disappearing_pieces.contains(upper)){break;}

						this.moving_pieces.push(upper);
					}
				}, this);

				var score_diff = 100 * Math.pow(2, this.panel.num_successive_scoring) * group.length;
				this.panel.score_label.addScore(score_diff);	//スコアを追加する
                if(game.mode.search("vs") != -1){
                    var time_diff = score_diff / 133.3333;
                    this.panel.score_label.addRemainingTime(time_diff);         //残り時間を追加する
                }
                
				var average_coords = this.panel.calcPiecesAverageCoordinates(group), piece_type = getPropertyName(PieceTypes, group[0].type);
				this.xml_manager.getVarStore().addVar("average_coords", average_coords, true);
				this.xml_manager.getVarStore().addVar("score", this.panel.score_label.getScore(), true);
                var effects = this.createBasicEffects(piece_type, average_coords, score_diff);
				effects = effects.concat(this.chooseAppropriateEffects(group));
                this.tag_manager.interpret(group.slice(0), {average_coords : average_coords, panel_center_y : this.panel.field.y + this.panel.field.height / 2,
                    panel_right : this.panel.field.x + this.panel.field.width}, effects);
				if(game._debug){console.log(["score added! ", score_diff, "points added!"].join(""));}
			}else if(group.length == 3){		//3個の場合はカップリングを探す
				group.forEach(function(piece){
					pieces_searching_for_couple.push(piece);		//カップリングを探すピース
					couple_indices.push(cur_index);					//上記のピースが所属するグループ番号
				});
			}
		}, this);

		pieces_searching_for_couple.forEach(function(piece_info, cur_index, couples_array){
			if(disappearing_pieces.contains(piece_info)){return;}   //すでに消えてしまうピースは探索対象外

			piece_info.neighbors.every(function(neighbor){
				if(neighbor == null){return true;}
				var result = true;
				var index0 = couples_array.indexOf(neighbor);	//pieceの周りにカップリングを探しているピースがいないか調べる
				if(index0 != -1 && couple_indices[cur_index] != couple_indices[index0] 	//同じグループに存在しておらず、すでにカップリングが見つかったピースではない
				&& !disappearing_pieces.contains(neighbor)){
					result = false;
					var target_index = couple_indices[index0];
					var disappearing_pieces2 = candidates[couple_indices[cur_index]].concat(candidates[couple_indices[index0]]);
					disappearing_pieces2.forEach(function(piece, i, array){
						disappearing_pieces.push(piece);

						var index = this.moving_pieces.indexOf(piece);	//動くピースに指定されていたらその指定を外す
						if(index != -1){delete this.moving_pieces[index];}

						piece.makeUnconnected();
						this.effect_manager.remove(piece);

						for(var upper = piece.neighbors[2];; upper = upper.neighbors[2]){
                            //自分の上にいるピースの中で消えてしまうもの以外をこれから動くピースリストに追加する
    						//同時に2カ所以上で消えるピースが出てくる可能性があるため
							if(!upper || array.contains(upper) || disappearing_pieces.contains(upper)){break;}

							this.moving_pieces.push(upper);
						}
					}, this);

					var score_diff = Math.floor(75 * Math.pow(1.5, this.panel.num_successive_scoring) * disappearing_pieces2.length);
					this.panel.score_label.addScore(score_diff);		//スコアを追加する
                    if(game.mode.search("vs") != -1){
                        var time_diff = score_diff / 133.3333;
                        this.panel.score_label.addRemainingTime(time_diff);     //残り時間を追加する
                    }
                    
					var pieces = candidates[couple_indices[cur_index]].slice(0), targets = candidates[target_index].slice(0);
					var average_coords = this.panel.calcPiecesAverageCoordinates(pieces), average_coords2 = this.panel.calcPiecesAverageCoordinates(targets);
					var section_x = (average_coords.x < average_coords2.x) ? this.panel.field.x : this.panel.field.x + this.panel.field.width / 2;
					var section_x2 = (average_coords.x < average_coords2.x) ? this.panel.field.x + this.panel.field.width / 2 : this.panel.field.x;
					this.xml_manager.getVarStore().addVar("average_coords", average_coords, true);
					this.xml_manager.getVarStore().addVar("average_coords2", average_coords2, true);
					this.xml_manager.getVarStore().addVar("score", this.panel.score_label.getScore(), true);
                    var double_average_coords = {x : (average_coords.x + average_coords2.x) / 2, y : (average_coords.y + average_coords2.y) / 2};
                    var effects = this.createBasicEffects("COUPLING", double_average_coords, score_diff);
                    this.tag_manager.interpret(null, double_average_coords, effects);
					var selected_effects = this.chooseAppropriateEffects(pieces, targets);
                    
                    //それぞれのグループのピースの種類に対応するエフェクトを追加する
                    var info = {x : section_x, width : this.panel.field.width / 2, average_coords : average_coords, panel_right : this.panel.field.x + this.panel.field.width,
                        panel_center_y : this.panel.field.y + this.panel.field.height};
                    this.tag_manager.interpret(pieces, info, selected_effects);
                    info.x = section_x2;
                    this.tag_manager.interpret(targets, info, selected_effects);
					if(game._debug){console.log(["score added! ", score_diff, "points added!"].join(""));}
				}

				return result;
			}, this);
		}, this);

		if(disappearing_pieces.length){	        //消えるピースがあったら連鎖数を増やしてピースを消すタスクを設定
			++this.panel.num_successive_scoring;
            this.task_manager.add(new UpdateDisappearingPiecesTask(this.task_manager, disappearing_pieces, this.moving_pieces, 
                this.panel, this.tag_manager.getMaxEndTime()));
            this.tag_manager.resetMaxEndTime();
		}else{
    	    this.task_manager.add(new CreateShapeTask(this.task_manager, this.panel, new PieceFactory()))
		}
    }