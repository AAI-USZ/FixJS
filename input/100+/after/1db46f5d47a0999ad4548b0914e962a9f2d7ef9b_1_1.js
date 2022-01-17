function twinklespeedyInitDialog(callbackfunc, firstTime, oldDialog) {
	var dialog;
	if (oldDialog) {
		dialog = oldDialog;
	} else {
		Twinkle.speedy.dialog = new Morebits.simpleWindow( Twinkle.getPref('speedyWindowWidth'), Twinkle.getPref('speedyWindowHeight') );
		dialog = Twinkle.speedy.dialog;
		dialog.setTitle( "Choose criteria for speedy deletion" );
		dialog.setScriptName( "Twinkle" );
		dialog.addFooterLink( "Speedy deletion policy", "WP:CSD" );
		dialog.addFooterLink( "Twinkle help", "WP:TW/DOC#speedy" );
	}

	var form = new Morebits.quickForm( callbackfunc, (Twinkle.getPref('speedySelectionStyle') === 'radioClick' ? 'change' : null) );
	if( firstTime && Morebits.userIsInGroup( 'sysop' ) ) {
		form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Tag page only, don\'t delete',
						value: 'tag_only',
						name: 'tag_only',
						tooltip: 'If you just want to tag the page, instead of deleting it now',
						checked : Twinkle.getPref('deleteSysopDefaultToTag'),
						event: function( event ) {
							// enable/disable notify checkbox
							event.target.form.notify.disabled = !event.target.checked;
							event.target.form.notify.checked = event.target.checked;
							// enable/disable talk page checkbox
							if (event.target.form.talkpage) {
								event.target.form.talkpage.disabled = event.target.checked;
								event.target.form.talkpage.checked = !event.target.checked && Twinkle.getPref('deleteTalkPageOnDelete');
							}
							// enable/disable redirects checkbox
							event.target.form.redirects.disabled = event.target.checked;
							event.target.form.redirects.checked = !event.target.checked;
							// enable/disable multiple
							$(event.target.form).find('input[name="csd"][value="multiple"]')[0].disabled = !event.target.checked;
							event.stopPropagation();
						}
					}
				]
			} );
		form.append( { type: 'header', label: 'Delete-related options' } );
		if (mw.config.get('wgNamespaceNumber') % 2 === 0 && (mw.config.get('wgNamespaceNumber') !== 2 || (/\//).test(mw.config.get('wgTitle')))) {  // hide option for user pages, to avoid accidentally deleting user talk page
			form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Also delete talk page',
						value: 'talkpage',
						name: 'talkpage',
						tooltip: "This option deletes the page's talk page in addition. If you choose the F8 (moved to Commons) criterion, this option is ignored and the talk page is *not* deleted.",
						checked: Twinkle.getPref('deleteTalkPageOnDelete'),
						disabled: Twinkle.getPref('deleteSysopDefaultToTag'),
						event: function( event ) {
							event.stopPropagation();
						}
					}
				]
			} );
		}
		form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Also delete all redirects',
						value: 'redirects',
						name: 'redirects',
						tooltip: "This option deletes all incoming redirects in addition. Avoid this option for procedural (e.g. move/merge) deletions.",
						checked: true,
						disabled: Twinkle.getPref('deleteSysopDefaultToTag'),
						event: function( event ) {
							event.stopPropagation();
						}
					}
				]
			} );
		form.append( { type: 'header', label: 'Tag-related options' } );
	}

	// don't show this notification checkbox for db-multiple, as the value is ignored
	// XXX currently not possible to turn off notification when using db-multiple
	if (firstTime) {
		form.append( {
				type: 'checkbox',
				list: [
					{
						label: 'Notify page creator if possible',
						value: 'notify',
						name: 'notify',
						tooltip: "A notification template will be placed on the talk page of the creator, IF you have a notification enabled in your Twinkle preferences " +
							"for the criterion you choose AND this box is checked. The creator may be welcomed as well.",
						checked: !Morebits.userIsInGroup( 'sysop' ) || Twinkle.getPref('deleteSysopDefaultToTag'),
						disabled: Morebits.userIsInGroup( 'sysop' ) && !Twinkle.getPref('deleteSysopDefaultToTag'),
						event: function( event ) {
							event.stopPropagation();
						}
					}
				]
			}
		);
	} else {
		form.append( { type:'header', label: 'Tagging with {{db-multiple}}: Criterion ' + (Twinkle.speedy.dbmultipleCriteria.length + 1) } );
	}

	if (firstTime) {
		form.append( { type: 'radio', name: 'csd',
			list: [
				{
					label: 'Tag with multiple criteria',
					value: 'multiple',
					tooltip: 'Opens a series of further dialogs, allowing you to specify all the criteria you want to tag this page with.',
					disabled: Morebits.userIsInGroup('sysop') && !Twinkle.getPref('deleteSysopDefaultToTag')
				}
			]
		} );
	} else if (Twinkle.speedy.dbmultipleCriteria.length > 0) {
		form.append( { type: 'radio', name: 'csd',
			list: [
				{
					label: 'No more criteria apply - finish tagging',
					value: 'multiple-finish'
				}
			]
		} );
	}

	var namespace = mw.config.get('wgNamespaceNumber');
	if (namespace % 2 === 1 && namespace !== 3) {  // talk pages, but not user talk pages
		form.append( { type: 'header', label: 'Talk pages' } );
		form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.talkList } );
	}

	switch (namespace) {
		case 0:  // article
		case 1:  // talk
			form.append( { type: 'header', label: 'Articles' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getArticleList(!firstTime) } );
			break;

		case 2:  // user
		case 3:  // user talk
			form.append( { type: 'header', label: 'User pages' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.userList } );
			break;

		case 6:  // file
		case 7:  // file talk
			form.append( { type: 'header', label: 'Files' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getFileList(!firstTime) } );
			form.append( { type: 'div', label: 'Tagging for CSD F4 (no license), F5 (orphaned fair use), F6 (no fair use rationale), and F11 (no permission) can be done using Twinkle\'s "DI" tab.' } );
			break;

		case 10:  // template
		case 11:  // template talk
			form.append( { type: 'header', label: 'Templates' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getTemplateList(!firstTime) } );
			break;

		case 14:  // category
		case 15:  // category talk
			form.append( { type: 'header', label: 'Categories' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.categoryList } );
			break;

		case 100:  // portal
		case 101:  // portal talk
			form.append( { type: 'header', label: 'Portals' } );
			form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getPortalList(!firstTime) } );
			break;

		default:
			break;
	}

	form.append( { type: 'header', label: 'General criteria' } );
	form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.getGeneralList(!firstTime) });

	form.append( { type: 'header', label: 'Redirects' } );
	form.append( { type: 'radio', name: 'csd', list: Twinkle.speedy.redirectList } );

	if( Twinkle.getPref( 'speedySelectionStyle' ) !== 'radioClick' ) {
		form.append( { type: 'submit', label: ( firstTime ? undefined : "Continue" ) } );
	}

	var result = form.render();
	dialog.setContent( result );
	if (!oldDialog) {
		dialog.display();
	}
	result.dialog = dialog;  // expando property
}