function(){
		var self = this;
		self.initialized = self.initialized ? self.initialized+1 : 1;

		var value = self.getValue();
		var matches = value.match(/<([^>]*)>/g);

		self.tag_input = new Element('ul.inlay', {
			'events': {
				'click': function(e){
					if(e.target == self.tag_input){
						var input = self.tag_input.getElement('li:last-child input');
						input.fireEvent('focus');
						input.focus();
						input.setCaretPosition(input.get('value').length);
					}

					self.el.addEvent('outerClick', function(){
						self.reset();
						self.el.removeEvents('outerClick');
					})
				}
			}
		}).inject(self.input, 'after');
		self.el.addClass('tag_input');

		var mtches = []
		if(matches)
			matches.each(function(match, mnr){
				var pos = value.indexOf(match),
					msplit = [value.substr(0, pos), value.substr(pos, match.length), value.substr(pos+match.length)];

				msplit.each(function(matchsplit, snr){
					if(msplit.length-1 == snr){
						value = matchsplit;

						if(matches.length-1 == mnr)
							mtches.append([value]);

						return;
					}
					mtches.append([value == matchsplit ? match : matchsplit]);
				});
			});

		mtches.each(self.addTag.bind(self));

		self.addLastTag();

		// Sortable
		self.sortable = new Sortables(self.tag_input, {
			'revert': true,
			'handle': '',
			'opacity': 0.5,
			'onComplete': function(){
				self.setOrder();
				self.reset();
			}
		});

		// Calc width on show
		var input_group = self.tag_input.getParent('.tab_content');
		input_group.addEvent('activate', self.setAllWidth.bind(self));
	}