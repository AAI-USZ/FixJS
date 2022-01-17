function() {
			var events = ['dragStart', 'dragMove', 'dragEnd'];
			var _this = this;
			events.forEach(function(ev){
			    view.bind(Events[ev], _this[ev]);		
			});
		}