function(theme){
		console.log(theme);
		this.set('theme', theme);
		_.each(this.current, function(a){
			a.settings.theme = theme;
			a.$el.attr('class', notifier.getWrapperCls(a.settings));
			notifier.transitions[a.settings.position].in.call(a, a.$el, a.$el.find('>div'), a.settings, a.settings.fadeInMs);
			a.screenEl && a.screenEl.attr('class', a.settings.baseCls + '-screen ' + a.settings.baseCls + '-theme-' + theme);
		});
	}