function(e) {
		var form = $("#" + this.id + "_form");
		var error_free = true;
		var missing_input = null;
		var controller = this;
		form.find("input.required").each(function() {

			$(this).removeClass('error');

			if ($(this).val() == '') {
				if (missing_input == null)
					missing_input = $(this);
				$(this).addClass('error');
				 $(controller.target + " .options .run_status").html("Require").css("color", "red");
				error_free = false;
			}

		});

		if (error_free) {
			var invocationUrl = this.invocationUrl(form.serializeArray());
			$(".request_url", this.target + "_content_sandbox_response")
					.html("<pre>" + invocationUrl + "</pre>");

			if (this.http_method == "get") {
				$.getJSON(invocationUrl, this.proxy(this.showResponse))
						.complete(this.proxy(this.showCompleteStatus)).error(
								this.proxy(this.showErrorStatus));
			} else {
				var postParams = this.invocationPostParam(form
						.serializeArray());
//				params="params={\"realid\":\"07e36240-6845-11e1-850d-005056a70023\",\"group_type\":\"Friend\",\"msg\":\"I love you\"}"
//					
//				$.post("http://api.sgcharo.com/mobion/real/shout/7527de50c99611e18479005056a70023",(params),
//						this.proxy(this.showResponse)).complete(this.proxy(this.showCompleteStatus))
//						.error(this.proxy(this.showErrorStatus));
//				
				var version = "v2";
				var data;
				if(version == "v1"){
					data = "params=" + postParams ;
				}else{
					data = $.parseJSON(postParams);
				}
		
				$.post(invocationUrl, (data),
						this.proxy(this.showResponse)).complete(this.proxy(this.showCompleteStatus))
						.error(this.proxy(this.showErrorStatus));
			}

		}
		
	
	}