function(res) {
				controller.endpoints.empty();
				$('.img_loading').css("display","none");
				controller.endpoints.append(res);
				controller.toggleEndpoints();

			}