function() {

		// Get the stored dfp commands
		var commands = window.googletag.cmd;

		// SetTimeout is a bit dirty but the script does not execute in the correct order without it
		setTimeout(function(){

			// overwrite the dfp object - replacing the command array with a function and defining missing functions
			window.googletag = {
				'cmd': {
					'push': function(callback){
						callback.call(dfpScript);
					}
				},
				'ads':[],
				'pubads':function() {return this;},
				'enableSingleRequest':function() {return this;},
				'setTargeting':function() {return this;},
				'collapseEmptyDivs':function() {return this;},
				'enableServices':function() {return this;},
				'defineSlot':function(name,dimensions,id) {
					window.googletag.ads.push(id);
					window.googletag.ads[id] = {
						'renderEnded':function(){},
						'addService':function() {return this;}
					};
					return window.googletag.ads[id];
				},
				'display':function(id) {
					window.googletag.ads[id].renderEnded.call(dfpScript);
					return this;
				}

			};

			// Execute any stored commands
			$.each(commands,function(k,v){
				window.googletag.cmd.push(v);
			});

		},50);

	}