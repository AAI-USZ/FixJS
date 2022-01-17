function (data) {

			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

            $("#token-label").text(data.Token);
        }