function(e){
			var section = e.originalEvent.state.section,
				content = e.originalEvent.state.href;

			clickMode = 'history';
			$('a[data-section=' + section +'][href=' + content + ']').trigger('click');
			
		}