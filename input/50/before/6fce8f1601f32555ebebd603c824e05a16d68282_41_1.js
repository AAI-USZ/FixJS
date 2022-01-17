function (event, index) {
			if (scrollable.getIndex() != index) {
				$('#service-add-wizard .steps li.active').removeClass('active');
				$('#service-add-wizard .steps li').eq(index).addClass('active');
			}
		}