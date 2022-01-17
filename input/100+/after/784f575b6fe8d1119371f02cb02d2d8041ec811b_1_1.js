function() {
    var nav = document.id('nav');
	foo = new moostrapScrollspy('sections', {
		onReady: function() {
			this.scroll();
		},
		onActive: function(el) {
		    var g = el.getParents("li").getLast();
			g.addClass('active');
			nav.scrollTo(0, g.getPosition(this.element).y);
		},
		onInactive: function() {
			this.element.getElements('li.active').removeClass('active');
		}
	});

	prettyPrint();

}