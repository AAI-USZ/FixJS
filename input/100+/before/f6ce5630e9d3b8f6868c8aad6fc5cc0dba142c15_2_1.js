function friendlytalkbackCallback( uid ) {
	if( uid === mw.config.get('wgUserName') ){
		alert( 'Is it really so bad that you\'re talking back to yourself?' );
		return;
	}

	var Window = new SimpleWindow( 600, 350 );
	Window.setTitle( "सन्देश" );
	Window.setScriptName( "Twinkle" );
	Window.addFooterLink( "{{सन्देश}} पर जानकारी", "साँचा:सन्देश" );
	Window.addFooterLink( "Twinkle help", "WP:TW/DOC#talkback" );

	var form = new QuickForm( Twinkle.talkback.callback.evaluate );

	form.append( { type: 'radio', name: 'tbtarget',
				list: [ {
						label: 'मेरे वार्ता पृष्ठ पर',
						value: 'mytalk',
						checked: 'true' },
					{
						label: 'किसी अन्य सदस्य के वार्ता पृष्ठ पर',
						value: 'usertalk' },
					{
						label: 'प्रबंधक सूचनापट',
						value: 'an' },
					{
						label: 'किसी अन्य पृष्ठ पर',
						value: 'other' } ],
				event: Twinkle.talkback.callback.change_target
			} );

	form.append( {
			type: 'field',
			label: 'Work area',
			name: 'work_area'
		} );

	form.append( { type:'submit' } );

	var result = form.render();
	Window.setContent( result );
	Window.display();

	// We must init the
	var evt = document.createEvent( "Event" );
	evt.initEvent( 'change', true, true );
	result.tbtarget[0].dispatchEvent( evt );
}