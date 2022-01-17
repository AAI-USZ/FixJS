function( e )
		{
			this.$el.find('.open').removeClass('open');
			this.model.visual.$el.css( 'fontSize', $(e.target).data('fontSize')+'%' );
			this.model.update({ fontSize : $(e.target).data('fontSize') });
			return false;
		}