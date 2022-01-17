function (data) {
			//data is the path object
			$("#goals").toggle();
			$("#path-form").toggle();
			$("#path-name-saved").html(data.name);
			$("#path-id").val(data.id);


		}