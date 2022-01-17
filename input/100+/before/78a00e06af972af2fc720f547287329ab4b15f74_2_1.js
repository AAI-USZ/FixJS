function() {
		if ($("#testcase_" + this.id + " .endpoints .endpoint").size() == 0) {
			var controller = this;
			console.log("/api_in_testcase/" + this.id);
			$.get("/api_in_testcase/" + this.id, null, function(res) {
				controller.endpoints.empty();
				controller.endpoints.append(res);
				controller.toggleEndpoints();

			});
		} else {
			this.toggleEndpoints();
		}
	}