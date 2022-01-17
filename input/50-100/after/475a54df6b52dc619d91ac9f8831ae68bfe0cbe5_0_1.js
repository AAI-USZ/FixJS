function (data) {
			//data is the path object
			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

			$("#path-id").val(data.id);
			window.location = "/" + data.id + "/edit";

		}