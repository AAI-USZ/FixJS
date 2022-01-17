function(answer, e) {
            // hack for code talk
		    //if (self.isAudience()) return;

			var dtoAnswer = ko.mapping.toJS(answer);
			self.hub.sendShowAnswer(dtoAnswer).done(function() {
				console.log('Sent Answer!');
			}).fail(function(e) {
				console.warn(e);
			});
			;
		}