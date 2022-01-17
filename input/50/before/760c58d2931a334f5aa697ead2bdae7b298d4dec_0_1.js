function(e) {
		if (e.success) {
			var user = e.users[0];
			alert('Welcome to ShootNSell!');
			homeWin.open();
		} else {
			//alert('2 Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}