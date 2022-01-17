function() {
			var events = ['dragStart', 'dragMove', 'dragEnd'];
			var thisHandler = this;
			events.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});
		}