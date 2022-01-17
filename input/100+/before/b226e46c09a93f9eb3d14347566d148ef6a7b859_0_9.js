function(){
			this.loader = new Backbone.Notifier({
				el: this.$el,
				position: 'center',
				loader: true,
				message: 'loading...',
				ms: null,
				modal: true
			});
			this.loader.notify({});
			window.parseCommitHistory = $.proxy(this.parseResponse, this);
			jQuery.ajax({
				url: 'https://api.github.com/repos/ewebdev/backbone.notifier/commits?callback=parseCommitHistory',
				dataType: "jsonp",
				jsonp: true
			});
		}