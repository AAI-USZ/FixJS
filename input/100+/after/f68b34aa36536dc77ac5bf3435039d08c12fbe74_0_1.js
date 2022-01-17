function twinklebatchprotectCallback() {
	var Window = new Morebits.simpleWindow( 800, 400 );
	Window.setTitle( "Batch protection" );
	Window.setScriptName( "Twinkle" );
	//Window.addFooterLink( "Protection templates", "Template:Protection templates" );
	Window.addFooterLink( "Protection policy", "WP:PROT" );
	Window.addFooterLink( "Twinkle help", "WP:TW/DOC#protect" );

	var form = new Morebits.quickForm( Twinkle.batchprotect.callback.evaluate );
	form.append({
			type: 'checkbox',
			name: 'editmodify',
			event: Twinkle.protect.formevents.editmodify,
			list: [
				{
					label: 'Modify edit protection',
					value: 'editmodify',
					tooltip: 'Only for existing pages.',
					checked: true
				}
			]
		});
	var editlevel = form.append({
			type: 'select',
			name: 'editlevel',
			label: 'Edit protection:',
			event: Twinkle.protect.formevents.editlevel
		});
	editlevel.append({
			type: 'option',
			label: 'All',
			value: 'all'
		});
	editlevel.append({
			type: 'option',
			label: 'Autoconfirmed',
			value: 'autoconfirmed'
		});
	editlevel.append({
			type: 'option',
			label: 'Sysop',
			value: 'sysop',
			selected: true
		});
	form.append({
			type: 'select',
			name: 'editexpiry',
			label: 'Expires:',
			event: function(e) {
				if (e.target.value === 'custom') {
					Twinkle.protect.doCustomExpiry(e.target);
				}
			},
			list: [
				{ label: '1 hour', value: '1 hour' },
				{ label: '2 hours', value: '2 hours' },
				{ label: '3 hours', value: '3 hours' },
				{ label: '6 hours', value: '6 hours' },
				{ label: '12 hours', value: '12 hours' },
				{ label: '1 day', value: '1 day' },
				{ label: '2 days', selected: true, value: '2 days' },
				{ label: '3 days', value: '3 days' },
				{ label: '4 days', value: '4 days' },
				{ label: '1 week', value: '1 week' },
				{ label: '2 weeks', value: '2 weeks' },
				{ label: '1 month', value: '1 month' },
				{ label: '2 months', value: '2 months' },
				{ label: '3 months', value: '3 months' },
				{ label: '1 year', value: '1 year' },
				{ label: 'indefinite', value:'indefinite' },
				{ label: 'Custom...', value: 'custom' }
			]
		});

	form.append({
			type: 'checkbox',
			name: 'movemodify',
			event: Twinkle.protect.formevents.movemodify,
			list: [
				{
					label: 'Modify move protection',
					value: 'movemodify',
					tooltip: 'Only for existing pages.',
					checked: true
				}
			]
		});
	var movelevel = form.append({
			type: 'select',
			name: 'movelevel',
			label: 'Move protection:',
			event: Twinkle.protect.formevents.movelevel
		});
	movelevel.append({
			type: 'option',
			label: 'All',
			value: 'all'
		});
	movelevel.append({
			type: 'option',
			label: 'Autoconfirmed',
			value: 'autoconfirmed'
		});
	movelevel.append({
			type: 'option',
			label: 'Sysop',
			value: 'sysop',
			selected: true
		});
	form.append({
			type: 'select',
			name: 'moveexpiry',
			label: 'Expires:',
			event: function(e) {
				if (e.target.value === 'custom') {
					Twinkle.protect.doCustomExpiry(e.target);
				}
			},
			list: [
				{ label: '1 hour', value: '1 hour' },
				{ label: '2 hours', value: '2 hours' },
				{ label: '3 hours', value: '3 hours' },
				{ label: '6 hours', value: '6 hours' },
				{ label: '12 hours', value: '12 hours' },
				{ label: '1 day', value: '1 day' },
				{ label: '2 days', selected: true, value: '2 days' },
				{ label: '3 days', value: '3 days' },
				{ label: '4 days', value: '4 days' },
				{ label: '1 week', value: '1 week' },
				{ label: '2 weeks', value: '2 weeks' },
				{ label: '1 month', value: '1 month' },
				{ label: '2 months', value: '2 months' },
				{ label: '3 months', value: '3 months' },
				{ label: '1 year', value: '1 year' },
				{ label: 'indefinite', value:'indefinite' },
				{ label: 'Custom...', value: 'custom' }
			]
		});

	form.append({
			type: 'checkbox',
			name: 'createmodify',
			event: function twinklebatchprotectFormCreatemodifyEvent(e) {
				e.target.form.createlevel.disabled = !e.target.checked;
				e.target.form.createexpiry.disabled = !e.target.checked || (e.target.form.createlevel.value === 'all');
				e.target.form.createlevel.style.color = e.target.form.createexpiry.style.color = (e.target.checked ? "" : "transparent");
			},
			list: [
				{
					label: 'Modify create protection',
					value: 'createmodify',
					tooltip: 'Only for pages that do not exist.',
					checked: true
				}
			]
		});
	var createlevel = form.append({
			type: 'select',
			name: 'createlevel',
			label: 'Create protection:',
			event: Twinkle.protect.formevents.createlevel
		});
	createlevel.append({
			type: 'option',
			label: 'All',
			value: 'all'
		});
	createlevel.append({
			type: 'option',
			label: 'Autoconfirmed',
			value: 'autoconfirmed'
		});
	createlevel.append({
			type: 'option',
			label: 'Sysop',
			value: 'sysop',
			selected: true
		});
	form.append({
			type: 'select',
			name: 'createexpiry',
			label: 'Expires:',
			event: function(e) {
				if (e.target.value === 'custom') {
					Twinkle.protect.doCustomExpiry(e.target);
				}
			},
			list: [
				{ label: '1 hour', value: '1 hour' },
				{ label: '2 hours', value: '2 hours' },
				{ label: '3 hours', value: '3 hours' },
				{ label: '6 hours', value: '6 hours' },
				{ label: '12 hours', value: '12 hours' },
				{ label: '1 day', value: '1 day' },
				{ label: '2 days', value: '2 days' },
				{ label: '3 days', value: '3 days' },
				{ label: '4 days', value: '4 days' },
				{ label: '1 week', value: '1 week' },
				{ label: '2 weeks', value: '2 weeks' },
				{ label: '1 month', value: '1 month' },
				{ label: '2 months', value: '2 months' },
				{ label: '3 months', value: '3 months' },
				{ label: '1 year', value: '1 year' },
				{ label: 'indefinite', selected: true, value: 'indefinite' },
				{ label: 'Custom...', value: 'custom' }
			]
		});

	form.append( {
			type: 'textarea',
			name: 'reason',
			label: 'Reason (for protection log): '
		} );

	var query;

	if( mw.config.get( 'wgNamespaceNumber' ) === 14 ) {  // categories
		query = {
			'action': 'query',
			'generator': 'categorymembers',
			'gcmtitle': mw.config.get( 'wgPageName' ),
			'gcmlimit' : Twinkle.getPref('batchMax'), // the max for sysops
			'prop': 'revisions',
			'rvprop': 'size'
		};
	} else if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Prefixindex' ) {
		query = {
			'action': 'query',
			'generator': 'allpages',
			'gapnamespace': Morebits.queryString.exists('namespace') ? Morebits.queryString.get( 'namespace' ) : document.getElementById('namespace').value,
			'gapprefix': Morebits.queryString.exists('from') ? Morebits.string.toUpperCaseFirstChar(Morebits.queryString.get( 'from' ).replace('+', ' ')) :
				Morebits.string.toUpperCaseFirstChar(document.getElementById('nsfrom').value),
			'gaplimit' : Twinkle.getPref('batchMax'), // the max for sysops
			'prop': 'revisions',
			'rvprop': 'size'
		};
	} else {
		query = {
			'action': 'query',
			'gpllimit' : Twinkle.getPref('batchMax'), // the max for sysops
			'generator': 'links',
			'titles': mw.config.get( 'wgPageName' ),
			'prop': 'revisions',
			'rvprop': 'size'
		};
	}

	var statusdiv = document.createElement("div");
	statusdiv.style.padding = '15px';  // just so it doesn't look broken
	Window.setContent(statusdiv);
	Morebits.status.init(statusdiv);
	Window.display();

	var statelem = new Morebits.status("Grabbing list of pages");

	var wikipedia_api = new Morebits.wiki.api( 'loading...', query, function(apiobj) {
			var xml = apiobj.responseXML;
			var $pages = $(xml).find('page');
			var list = [];
			$pages.each(function(index, page) {
				var $page = $(page);
				var title = $page.attr('title');
				var isRedir = $page.attr('redirect') === ""; // XXX ??
				var missing = $page.attr('missing') === ""; // XXX ??
				var size = $page.find('rev').attr('size');

				var metadata = [];
				if (missing) {
					metadata.push("page does not exist");
				} else {
					if (isRedir) {
						metadata.push("redirect");
					}
					metadata.push(size + " bytes");
				}
				list.push( { label: title + (metadata.length ? (' (' + metadata.join('; ') + ')') : '' ), value: title, checked: true });
			});
			form.append({ type: 'header', label: 'Pages to protect' });
			form.append( {
					type: 'checkbox',
					name: 'pages',
					list: list
				} );
			form.append( { type:'submit' } );

			var result = form.render();
			Window.setContent( result );
		}, statelem );

	wikipedia_api.post();
}