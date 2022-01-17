function( self ) {
		var xmlDoc = self.responseXML;
		var revid = $(xmlDoc).find('rev').attr('revid');

		if( ! revid ) {
			self.statelem.error( 'no suitable earlier revision found, or ' + self.params.user + ' is the only contributor. Aborting.' );
			return;
		}
		var query = {
			'title': mw.config.get('wgPageName'),
			'oldid': revid,
			'diff': mw.config.get('wgCurRevisionId')
		};
		window.location = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?' + QueryString.create( query );
	}