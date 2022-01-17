function(user){
				if(user){
					req.session.user = user;			
					res.redirect('/admin/main');
				}
				else{ // Guest or login fail.
					var alert_script = alert.makeAlert('존재하지 않는 계정입니다.')
					res.render('alert', {
						title : 'error',
						alert : alert_script
					});	
				}
			}