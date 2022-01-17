function(){
			this.loader = new Backbone.Notifier({
				el: this.$el,
				position: 'center',
				loader: true,
				message: 'loading...',
				ms: null,
				modal: true,
				theme: 'plastic',
				fadeInMs: 600,
				fadeOutMs: 1200,
				'out': function(el, inner, options, duration, callback){
					el.fadeOut(duration, callback);
				},
				'in': function(el, inner, options, duration, callback){
					el.fadeIn(duration, callback);
				}
			});
			this.loader.notify();
			window.parseCommitHistory = $.proxy(this.parseResponse, this);
			jQuery.ajax({
				url: 'https://api.github.com/repos/ewebdev/backbone.notifier/commits?callback=parseCommitHistory',
				dataType: "jsonp",
				jsonp: true
			});
		}