function(){
					// ユーザーを教えてあげる
					//（サーバー側用ユーザーオブジェクト作成）
					//ここでユーザーに現在の状況を教える
					var env=game.wholeEnvironment();
					socket.emit("init",{
						env:env,
						user_id:user._id,
					},function(){
						user=game.newUser(event);
						game.event.emit("entry",user);
						game._users.push(user);
					});
				}