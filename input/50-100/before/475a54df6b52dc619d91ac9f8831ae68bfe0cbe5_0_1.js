function (data) {
			//data is the path object
			$("#path-id").val(data.id);
			window.location = "/" + data.id + "/edit";

		}