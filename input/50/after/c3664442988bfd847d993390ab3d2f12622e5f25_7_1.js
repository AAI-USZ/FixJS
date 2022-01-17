function () {
		this.$el.append('<h2>'+this.title+'</h2>');
		$( '.video-list' ).append( this.$el );
	}