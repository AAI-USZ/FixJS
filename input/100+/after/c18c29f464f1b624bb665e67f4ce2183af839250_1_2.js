function() {
				$('.cms-container').unbind('afterstatechange.tree');
				$('.cms-content').unbind('reloadeditform.tree');
				this._super();
			}