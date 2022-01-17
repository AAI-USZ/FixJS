function(){
		var self = this;
		
		// Dimensions
		var dimensions = this.options.dimensions || this.textarea.getSize();
		
		// Build the container
		this.container = new Element('div', {
			id: (this.textarea.id) ? this.textarea.id + '-mooeditable-container' : null,
			'class': 'mooeditable-container',
			styles: {
				width: dimensions.x
			}
		});

		// Override all textarea styles
		this.textarea.addClass('mooeditable-textarea').setStyle('height', dimensions.y);
		
		// Build the iframe
		this.iframe = new IFrame({
			'class': 'mooeditable-iframe',
			frameBorder: 0,
			src: 'javascript:""', // Workaround for HTTPs warning in IE6/7
			styles: {
				height: dimensions.y
			}
		});
		
		this.toolbar = new MooEditable.UI.Toolbar({
			onItemAction: function(){
				var args = Array.from(arguments);
				var item = args[0];
				self.action(item.name, args);
			}
		});
		this.attach.delay(1, this);
		
		// Update the event for textarea's corresponding labels
		if (this.options.handleLabel && this.textarea.id) $$('label[for="'+this.textarea.id+'"]').addEvent('click', function(e){
			if (self.mode != 'iframe') return;
			e.preventDefault();
			self.focus();
		});

		// Update & cleanup content before submit
		if (this.options.handleSubmit){
			this.form = this.textarea.getParent('form');
			if (this.form) {
				this.form.addEvent('submit', function(){
					if (self.mode == 'iframe') self.saveContent();
				});
			}
		}
		
		this.fireEvent('render', this);
	}