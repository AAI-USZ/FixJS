function(callback) {
			$.lang.init(function() {
				var wait = function() {

					if(window.lang == undefined) {
						window.setTimeout(function() { wait(); },100);	
					} else 
						callback();
				};
				wait();
			});
		}