function(obj){
			//新しいオブジェクトが追加された
			//クライアント側に追加する
			//console.log(window[obj.constructorName]);
			var o=game._old_add(window[obj.constructorName],executeJSON(game,obj.param));
			o._id=obj._id;
			//入れる
			game.objectsmap[o._id]=o;
		}