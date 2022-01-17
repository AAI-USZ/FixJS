function(io,socket,data){
                var config = require('config')
	        var model =  require(' ../../../' + config.server.modelDir + 'player.js');
		item = data['item'];
		attr = { x: item.x, y: item.y, HP: item.HP, MP: item.MP }
		model.update({_id: data.id }, attr, function(err){});
	 	//current_userを返却＆checkする
		attr = { x: item.x, y: item.y, HP: item.HP, MP: item.MP, id: data.id, c_id: data.id, _id: data.id }

		socket.broadcast.emit(data.clientEvent, attr);
	}