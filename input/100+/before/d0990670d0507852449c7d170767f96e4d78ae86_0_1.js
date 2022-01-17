function(event) {
		this.newsTickerContainer = $('xNewsTickerContainer');

		if(!this.newsTickerContainer.hasClass('xNewsTickerHidden')) {
			this.newsTickerContainer.addClass('xNewsTickerHidden');
			
			var topPanel = $('xTopPanel');
			var editorMenu = $('xEditorMenu');
			var totalWidth = 0;

			editorMenu.getElements('li').each(function(el) {
				totalWidth += el.getSize().x;
			});
			totalWidth += parseInt(editorMenu.getStyle('padding-left')) + parseInt(editorMenu.getStyle('padding-right'));

			new Fx.Slide(this.newsTickerContainer, { duration: 800, transition: Fx.Transitions.Quint.easeInOut }).show().slideOut();
			topPanel.set('tween', {duration: 800, transition: Fx.Transitions.Quint.easeInOut });
			topPanel.tween('width', totalWidth + 'px');

			Cookie.write('_berta_newsticker_hidden', 1 /*,{ domain: window.location.host, path: window.location.pathname }*/);
		}
	}