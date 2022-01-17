function( evt ) {

			var self = this,
				contents = self._container.find('.content').children(),
				target = $(evt.currentTarget);

			if( !target.hasClass('current') ) {
				target.siblings('.current').removeClass('current');
				target.addClass('current');
				contents.removeClass('current');
				contents.eq( target.index() ).addClass('current');
			}

		}