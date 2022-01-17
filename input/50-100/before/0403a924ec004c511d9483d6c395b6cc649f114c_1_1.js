function(){
					// ユーザーを教えてあげる
					//（サーバー側用ユーザーオブジェクト作成）
					user=game.newUser(event);
					game.event.emit("entry",user);
					game._users.push(user);
					//ここでユーザーに現在の状況を教える
					var env=game.wholeEnvironment();
					socket.emit("init",{
						env:env,
						user_id:user._id,
					});
				}