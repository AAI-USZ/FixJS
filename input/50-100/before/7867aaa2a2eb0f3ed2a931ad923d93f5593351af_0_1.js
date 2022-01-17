function (name) {
			if (name) {
				socket.name(name);
				this.switchView(new ChatView({ router: this }));				
			} else {
				this.navigate('', { trigger: true });
			}
		}