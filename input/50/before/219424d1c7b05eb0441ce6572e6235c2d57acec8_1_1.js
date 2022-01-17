function() {

		$('body').addClass('apple-fixed-layout');

		// wipe the html
		this.$('#container').html("");
		this.setContainerSize();

		// add the current section
		//this.addPage( this.model.getCurrentSection(), 1 );
		//currentPage = this.model.set("current_page", [1]);
		
		return this.renderPages();
	}