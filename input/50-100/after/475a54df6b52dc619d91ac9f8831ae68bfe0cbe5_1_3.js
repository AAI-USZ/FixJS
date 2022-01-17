function (data) {

			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}
			//data is the path object
			$("#goals").toggle();
			$("#path-form").toggle();
			$("#path-name-saved").html(data.name);
			$("#path-id").val(data.id);


		}