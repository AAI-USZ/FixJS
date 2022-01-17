function (options) {
		this.filters = $H({});
		this.setOptions(options);
		this.advancedSearch = false;
		this.container = document.id(this.options.container);
		this.filterContainer = this.container.getElement('.fabrikFilterContainer');
		var b = this.container.getElement('.toggleFilters');
		if (typeOf(b) !== 'null') {
			b.addEvent('click', function (e) {
				var dims = b.getPosition();
				e.stop();
				var x = dims.x - this.filterContainer.getWidth();
				var y = dims.y + b.getHeight();
				var rx = this.filterContainer.getStyle('display') === 'none' ? this.filterContainer.show() : this.filterContainer.hide();
				this.filterContainer.fade('toggle');
				this.container.getElements('.filter, .listfilter').toggle();
			}.bind(this));

			if (typeOf(this.filterContainer) !== 'null') {
				this.filterContainer.fade('hide').hide();
				this.container.getElements('.filter, .listfilter').toggle();
			}
		}

		if (typeOf(this.container) === 'null') {
			return;
		}
		this.getList();
		var c = this.container.getElement('.clearFilters');
		if (typeOf(c) !== 'null') {
			c.removeEvents();
			c.addEvent('click', function (e) {
				var plugins;
				e.stop();
				this.container.getElements('.fabrik_filter').each(function (f) {
					if (f.get('tag') === 'select') {
						f.selectedIndex = 0;
					} else {
						f.value = '';
					}
				});
				plugins = this.getList().plugins;
				if (typeOf(plugins) !== 'null') {
					plugins.each(function (p) {
						p.clearFilter();
					});
				}
				new Element('input', {
					'name': 'resetfilters',
					'value': 1,
					'type': 'hidden'
				}).inject(this.container);
				if (this.options.type === 'list') {
					this.list.submit('list.clearfilter');
				} else {
					this.container.getElement('form[name=filter]').submit();
				}
			}.bind(this));
		}
		if (advancedSearchButton = this.container.getElement('.advanced-search-link')) {
			advancedSearchButton.addEvent('click', function (e) {
				e.stop();
				var url = Fabrik.liveSite + "index.php?option=com_fabrik&view=list&tmpl=component&layout=_advancedsearch&listid=" + this.options.id;
				url += '&listref=' + this.options.ref;
				this.windowopts = {
					'id': 'advanced-search-win' + this.options.ref,
					title: Joomla.JText._('COM_FABRIK_ADVANCED_SEARCH'),
					loadMethod: 'xhr',
					evalScripts: true,
					contentURL: url,
					width: 690,
					height: 300,
					y: this.options.popwiny,
					onContentLoaded: function (win) {
						var list = Fabrik.blocks['list_' + this.options.ref];
						list.advancedSearch = new AdvancedSearch(this.options.advancedSearch);
					}.bind(this)
				};
				var mywin = Fabrik.getWindow(this.windowopts);
			}.bind(this));
		}
	}