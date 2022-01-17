function (pluginHTML, plugin, opts, cloneJs) {
		var tmp, radios;
		cloneJs = cloneJs === false ? false : true;
		var td = new Element('td');
		var str  = '';
		this.plugins.each(function (aPlugin) {
			if (aPlugin.name === plugin) {
				str += pluginHTML;
			} else {
				str += aPlugin.options.html;
			}
			
		}.bind(this));
		
		// Set radio buttons ids, names and labels
		tmp = new Element('div').set('html', str);
		radios = tmp.getElements('input[type=radio]');
		radios.each(function (rad) {
			var label, radid;
			rad.name = rad.name.replace(/\[0\]/gi, '[' + this.counter + ']');
			label = tmp.getElement('label[for=' + rad.id + ']');
			radid = rad.id.split('-');
			radid[1] = this.counter;
			rad.id = radid.join('-');
			label.setAttribute('for', rad.id);
		}.bind(this));

		td.set('html', tmp.get('html'));
		var display = 'block';
		opts.counter = this.counter;
		var c = new Element('div', {'class': 'actionContainer'}).adopt(
		new Element('table', {'class': 'adminform', 'id': 'formAction_' + this.counter, 'styles': {'display': display}}).adopt(
			new Element('tbody', {'styles': {'width': '100%'}}).adopt([
				this.getPluginTop(plugin, opts),
				new Element('tr').adopt(td),
				new Element('tr').adopt(
					new Element('td', {}).adopt(
						new Element('a', {'href': '#', 'class': 'delete removeButton'}).appendText(Joomla.JText._('COM_FABRIK_DELETE'))
					)
				)
			])
		)
	);
		
		c.inject(document.id('plugins'));
		
		// Update params ids
		if (this.counter !== 0) {
			c.getElements('input[name^=params]', 'select[name^=params]').each(function (i) {
				if (i.id !== '') {
					var a = i.id.split('-');
					a.pop();
					i.id = a.join('-') + '-' + this.counter;
				}
			}.bind(this));
			
			c.getElements('img[src=components/com_fabrik/images/ajax-loader.gif]').each(function (i) {
				i.id = i.id.replace('-0_loader', '-' + this.counter + '_loader');
			}.bind(this));
			if (cloneJs === true) {
				this.plugins.each(function (plugin) {
					// clone js controller
					var newPlugin = new CloneObject(plugin, true, []);
					newPlugin.cloned(this.counter);
				}.bind(this));
			}
		}

		// Show the active plugin 
		var formaction = document.id('formAction_' + this.counter);
		formaction.getElements('.' + this.opts.type + 'Settings').hide();
		var activePlugin = formaction.getElement(' .page-' + plugin);
		if (activePlugin) {
			activePlugin.show();
		}
		
		// Watch the drop down
		formaction.getElement('.elementtype').addEvent('change', function (e) {
			e.stop();
			var id = e.target.getParent('.adminform').id.replace('formAction_', '');
			document.id('formAction_' + id).getElements('.' + this.opts.type + 'Settings').hide();
			var s = e.target.get('value');
			if (s !== Joomla.JText._('COM_FABRIK_PLEASE_SELECT') && s !== '') {
				document.id('formAction_' + id).getElement('.page-' + s).show();
			}
		}.bind(this));
		this.watchDelete();
		
		// Show any tips (only running code over newly added html)
		var myTips = new Tips($$('#formAction_' + this.counter + ' .hasTip'), {});
		this.counter ++;
	}