function (event) {
			if (event.which == 13) {
				var input = this.$('input');
				socket.send(input.val());
				input.val(null);
			}
		}