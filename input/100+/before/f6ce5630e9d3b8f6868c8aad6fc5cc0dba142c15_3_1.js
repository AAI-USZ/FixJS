function friendlywelcomeCallback( uid ) {
	if( uid === mw.config.get('wgUserName') ){
		alert( 'आपका बहुत बहुत स्वागत है!' );
		return;
	}	
	var Window = new Morebits.simpleWindow( 600, 400 );
	Window.setTitle( "सदस्य स्वागत" );
	Window.setScriptName( "Twinkle" );
	//Window.addFooterLink( "Welcoming Committee", "WP:WC" );
	Window.addFooterLink( "Twinkle help", "WP:TW/DOC#welcome" );

	var form = new QuickForm( Twinkle.welcome.callback.evaluate, 'change' );

	form.append( {
			type: 'input',
			name: 'article',
			label: 'सम्बन्धित लेख (यदि साँचे द्वारा स्वीकृत)',
			value:( QueryString.exists( 'vanarticle' ) ? QueryString.get( 'vanarticle' ) : '' ),
			tooltip: 'स्वागत में एक लेख की कड़ी जोड़ी जा सकती है, यदि स्वागत साँचे द्वारा स्वीकृत हो। ऐसे साँचों के आगे * लगा है। किसी भी लेख की कड़ी न जोड़ने के लिये खाली छोड़ दें।',
			event: function( event ) {
				event.stopPropagation();
			}
		} );

	form.append( { type:'header', label:'मानक स्वागत' } );
	form.append( { type: 'radio', name: 'Standard', list: Twinkle.welcome.StandardList } );
 
	form.append( { type:'header', label:'संक्षिप्त स्वागत' } );
	form.append( { type: 'radio', name: 'short', list: Twinkle.welcome.shortList } );

	form.append( {type:'header', label:'मूल जानकारी सहित स्वागत' } );
	form.append( {type: 'radio', name: 'basic', list: Twinkle.welcome.basicList } );

	form.append( {type:'header', label:'ग्राफ़िक मेन्यू सहित स्वागत' } );
	form.append( {type:'radio', name: 'graphic', list: Twinkle.welcome.graphicList } );
	
	if( Twinkle.getFriendlyPref('customWelcomeList').length ) {
		form.append( { type:'header', label:'Custom templates' } );
		form.append( { type: 'radio', name: 'custom', list: Twinkle.getFriendlyPref('customWelcomeList') } );
	}

	form.append( { type:'header', label:'Potential problem user templates' } );
	form.append( { type: 'radio', name: 'problem', list: Twinkle.welcome.problemList } );

	form.append( { type:'header', label:'IP सदस्य स्वागत' } );
	form.append( { type: 'radio', name: 'anonymous', list: Twinkle.welcome.anonymousList } );

	var result = form.render();
	Window.setContent( result );
	Window.display();

}