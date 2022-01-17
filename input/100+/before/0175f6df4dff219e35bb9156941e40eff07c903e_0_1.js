function (chatTemplate, TitleView, UsersView, me, users, socket) {
	return Backbone.View.extend({

		initialize: function () {
			socket.on('message', function (message) {
				this.append(message.from + ': ' + message.text, 'message');
			}, this);
			socket.on('welcome', function (user) {
				this.append('welcome, ' + user + '!');
				me.fetch();
				users.fetch();
			}, this);
			socket.on('connected', function (user) {
				this.append(user + ' connected.')
				users.fetch();
			}, this);
			socket.on('disconnected', function (user) {
				this.append(user + ' disconnected.');
				users.fetch();
			}, this);
		},

		render: function () {
			this.renderSubview(new TitleView());
			this.$el.append(Mustache.render(chatTemplate, {}));
			this.renderSubview(new UsersView());
			this.$('input').focus();
		},

		onClose: function () {
			socket.off(null, null, this);
		},

		events: {
			'keypress input': 'send'
		},

		send: function (event) {
			if (event.which == 13) {
				var input = this.$('input');
				socket.send(input.val());
				input.val(null);
			}
		},

		append: function (message, className) {
			var messages = this.$('.messages');
			messages.append(
				'<li' + (className ? ' class="' + className + '"' : '') + '>' +
				_.escape(message) +
				'</li>'
			);
			messages[0].scrollTop = messages[0].scrollHeight;
		}

	});
}