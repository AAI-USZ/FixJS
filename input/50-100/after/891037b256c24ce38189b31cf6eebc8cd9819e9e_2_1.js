function(user){
		console.log(user);
		
		if(user){
			console.log('auth_success');
			req.session.user = user;
			res.redirect('/board');
		}
		else{
			var alert_script = alert.makeAlert('존재하지 않는 계정이거나 계정 정보가 잘못되었습니다.');
			res.render('alert',{
				title : 'error'
				,alert : alert_script
			});
		}
	}