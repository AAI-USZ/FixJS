function setLSValue (e) {
			var value = ''
			  , $self = $.single( this )
			  ;

			switch (e.data.type) {
				case 'text'     : value = $self.val(); break;
				case 'checkbox' : value = $self.is(':checked'); break;
				case 'select'   : value = $self.find(':selected').val();
			}
			localStorage.setItem([INNERCONTEXT.CONSTANTS.NAMESPACE, '_', e.data.key].join(), value);
			INNERCONTEXT.DATA[e.data.key] = value;
		}