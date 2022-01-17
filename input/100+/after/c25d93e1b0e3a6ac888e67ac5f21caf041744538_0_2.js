function setLSValue (e) {
			var value = ''
			  , key   = (e.data && e.data.key) || e.key
			  , $self = $.single( this )
			  ;

			if (void 0 !== e.data) {
				switch (e.data.type) {
					case 'text'     : value = $self.val(); break;
					case 'checkbox' : value = $self.is(':checked'); break;
					case 'select'   : value = $self.find(':selected').val();
				}
			} else {
				value = e.val;
			}
			localStorage.setItem([INNERCONTEXT.CONSTANTS.NAMESPACE, '_', key].join(''), value);
			INNERCONTEXT.DATA[key] = value;
		}