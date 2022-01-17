function(e) {
		Ti.API.info('Function entered')
		if (e.success) {
			var user = e.users[0];
			
			Ti.App.Properties.setString('userid', user.id);

			alert('Welcome to ShootNSell!');
			loginWin.close();
			homeWin.open();

		} else {
			//alert('1 Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));

			//login function
			login(email);
		}
	}