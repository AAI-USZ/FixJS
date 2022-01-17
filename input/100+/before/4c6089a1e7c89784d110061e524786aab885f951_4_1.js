function(_) {
	
	var _frames = [];
	
	return {
		begin: function(callback) {
			_frames.push({ callback: callback, distictDependencies: []});
		},
		
		end: function() {
			_frames.pop();
		},
		
		registerDependency: function(subscribable) {
			if(!_.isSubscribable(subscribable))
				throw new Error("Only subscribable things can act as dependencies");
			if(_frames.length > 0) {
				var topFrame = _frames[_frames.length - 1];
				if(_.indexOf(topFrame.distinctDependencies, subscribable) >= 0)
					return;
				topFrame.distinctDependencies.push(subscribable);
				topFrame.callback(subscribable);
			}
		}
	}
}