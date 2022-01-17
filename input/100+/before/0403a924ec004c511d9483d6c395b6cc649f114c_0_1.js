function(obj){
		var env=obj.env;
		game.user._id=obj.user_id;
		game.objectsmap[obj.user_id]=game.user;
		//現在の状況すべて
		//console.log(JSON.stringify(env));
		game.objects.length=0;
		for(var i=0,l=env.length;i<l;i++){
			//ひとつずつ追加
			executeJSON(game,env[i]);
		}

		//全部
		socket.on("events",function(arr){
			for(var i=0,l=arr.length;i<l;i++){
				socket.$emit(arr[i].name,arr[i].obj);
			}
		});
		//メッセージを受け取りはじめる
		socket.on("add",function(obj){
			//新しいオブジェクトが追加された
			//クライアント側に追加する
			//console.log(window[obj.constructorName]);
			var o=game._old_add(window[obj.constructorName],executeJSON(game,obj.param));
			o._id=obj._id;
			//入れる
			game.objectsmap[o._id]=o;
		});
		socket.on("die",function(_id){
			//オブジェクトを削除する
			//console.log("dyyyyy!",_id,game.objectsmap[_id]);
			if(!game.objectsmap[_id])return;
			game.objectsmap[_id]._flg_dying=true;
			delete game.objectsmap[_id];
		});
		socket.on("event",function(obj){
			//イベントがきた
			var o=game.objectsmap[obj._id];
			if(!o)return;
			o.event.emit.apply(o.event,[obj.name].concat(obj.args));
		});
		socket.on("gameevent",function(obj){
			//イベントがきた
			game.event._old_emit.apply(game.event,[obj.name].concat(obj.args));
		});
		socket.on("userevent",function(obj){
			var u=game.objectsmap[obj._id];
			if(!u)return;
			u.event.emit.apply(u.event,[obj.name].concat(obj.args));
		});

	}