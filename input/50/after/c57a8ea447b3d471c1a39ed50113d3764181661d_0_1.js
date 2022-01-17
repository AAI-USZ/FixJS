function (e) {
				if (e.keyCode == 27) {
					return handler.call(viewModel, e);
				}
			}