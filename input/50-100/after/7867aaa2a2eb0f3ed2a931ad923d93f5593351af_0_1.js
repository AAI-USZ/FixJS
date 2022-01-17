function (name) {
			if (name) {
				socket.name(name);
				this.switchView(new ChatView());				
			} else {
				this.navigate('', { trigger: true });
			}
		}