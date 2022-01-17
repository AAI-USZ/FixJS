function(){
        if(game._debug){console.log("max end time:"+this.end_time);}
        if(game.frame > this.end_time){    	//エフェクトをかけおわるフレームになったので、その後処理をする
			this.targets.forEach(function(piece){
				this.panel.field.removePiece(piece);
				if(game._debug){
                    console.log(["[", game.frame, "] the piece at", piece.logPosition(), " which is a(n) \"", getPropertyName(PieceTypes, piece.type),
						"\" is going to disappear."].join(""));			
				}
			}, this);
            this.panel.removePieces(this.targets);

			this.targets.splice(0);
			if(game.is_survival && this.panel.score_label.getScore() >= this.panel.next_speed_up_score && this.panel.pieces_moving_rate > 10){
				this.panel.pieces_moving_rate -= 4;
				this.panel.next_speed_up_score = this.score_label.getScore() + 10000;
			}
			
            var next_task;
            if(this.moving_pieces.length){   //動くピースリストが空でなければまずそれらを落下させる
                next_task = new DropPiecesTask(this.task_manager, this.moving_pieces, this.panel);
            }else{    //それ以外なら次のピースを出現させる
                next_task = new CreateShapeTask(this.task_manager, this.panel, new PieceFactory());
            }
            this.task_manager.add(next_task);
		}else{
    	    this.task_manager.add(this);
		}
    }