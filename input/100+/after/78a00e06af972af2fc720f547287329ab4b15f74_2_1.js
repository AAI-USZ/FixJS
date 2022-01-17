function() {
		if ($("#testcase_" + this.id + " .endpoints .endpoint").size() == 0) {
			var controller = this;
			$('.img_loading').css("display","block");
			$.get("/api_in_testcase/" + this.id, null, function(res) {
				controller.endpoints.empty();
				$('.img_loading').css("display","none");
				controller.endpoints.append(res);
				controller.toggleEndpoints();

			});
		} else {
			this.toggleEndpoints();
		}
	}