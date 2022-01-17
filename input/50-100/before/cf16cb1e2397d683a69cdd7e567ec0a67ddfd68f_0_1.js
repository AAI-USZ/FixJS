function (e) {
			    if (e.target.is('input'))
			        return;
			    
				if (_isNumericKey(e.which)) {
				    e.preventDefault();
				    _append($this, _getNumericValue(e.which));
				} else if (e.which == 13) {
				    e.preventDefault();
					_complete($this);
				} else {
					_clear($this);
				}
			}