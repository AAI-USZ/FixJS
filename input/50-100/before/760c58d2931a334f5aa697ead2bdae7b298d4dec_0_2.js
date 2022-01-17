function(e) {
		Ti.API.info('Function entered')
		if (e.success) {
			var user = e.users[0];

			alert('Welcome to ShootNSell!');
			homeWin.open();

		} else {
			//alert('1 Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));

			//login function
			login(email);
		}
	}