function(event) {
				event.stop();
				new Fx.Slide(this.newsTickerContainer, { duration: 800, transition: Fx.Transitions.Quint.easeInOut }).show().slideOut();
				Cookie.write('_berta_newsticker_hidden', 1 /*,{ domain: window.location.host, path: window.location.pathname }*/);
			}