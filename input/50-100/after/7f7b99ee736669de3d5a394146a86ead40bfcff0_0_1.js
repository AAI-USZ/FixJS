function() {
		this.home();
		this.whyView = new Thefrontend.Views.why({
			el: '#homeInfoPanel'
		});
		this.homeView.$el.find('#homeInfoButtons a').removeClass('active');
		this.homeView.$el.find('.why').addClass('active');		
		this.whyView.render().$el.css('opacity', 1);
	}