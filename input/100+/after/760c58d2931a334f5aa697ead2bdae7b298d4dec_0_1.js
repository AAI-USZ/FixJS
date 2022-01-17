function(e) {

		try {
			loadingIndicator.show();

			if (ivleloginWeb.url.indexOf('/api/login/login_result.ashx') > 0) {
				if (ivleloginWeb.url.indexOf('&r=0') > 0) {

					var string = e.source.html;

					var token = string.substring(string.indexOf('<body>') + 6, string.indexOf('</body>'));
					Ti.App.Properties.setString("token", token);

					// verify user and get username and email
					// get username
					var xhr = Ti.Network.createHTTPClient();
					xhr.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserName_Get?APIKey=" + apikey + "&Token=" + token);
					xhr.onload = function() {
						var output = this.responseText;
						Ti.App.Properties.setString("name", output.substring(1, output.length - 1));

						//alert(Ti.App.Properties.getString('name'));

						// get email
						var xhr2 = Ti.Network.createHTTPClient();
						xhr2.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserEmail_Get?APIKey=" + apikey + "&Token=" + token);
						xhr2.onload = function() {
							var output2 = this.responseText;
							Ti.App.Properties.setString("email", output2.substring(1, output2.length - 1));

							//alert(Ti.App.Properties.getString('email'));

							createUser(Ti.App.Properties.getString('name'), Ti.App.Properties.getString('email'));
						};
						xhr2.onerror = function() {
							alert('error getting email');
						};
						xhr2.timeout = 10000;
						xhr2.send();
					};
					xhr.onerror = function() {
						alert('error getting username');
					};
					xhr.timeout = 10000;
					xhr.send();

				}
			} else
				loadingIndicator.hide();

		} catch(err) {
			loadingIndicator.hide();
			alert('Pls retry (Error in IVLE login)');
			ivleloginWeb.goBack();
			return;
		}
	}