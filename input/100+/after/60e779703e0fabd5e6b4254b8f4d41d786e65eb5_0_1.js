function( ev )
	{
		var tab, field, name = ev.data.name,
			definition = ev.data.definition,
			editor = CKEDITOR.instances.message || CKEDITOR.instances.signature;
			ckeditorImageWidth = editor.config.ckeditorImageWidth;

		if ( name == 'link' )
		{
			definition.height = 100;
			definition.resizable = false;
			definition.removeContents( 'target' );
			definition.removeContents( 'upload' );
			definition.removeContents( 'advanced' );
			tab = definition.getContents( 'info' );
			field = tab.get( 'linkType' );
			field['items'].splice( 1, 1 );
			tab.remove( 'emailSubject' );
			tab.remove( 'emailBody' );
			tab.remove( 'htmlPreview' );
		}
		else if ( name == 'image' )
		{
			definition.height = 75;
			definition.resizable = false;
			definition.removeContents( 'advanced' );
			definition.removeContents( 'Link' );
			tab = definition.getContents( 'info' );
			field = tab.get( 'txtWidth' );
			if ( ckeditorImageWidth > 0 )
				field['default'] = ckeditorImageWidth + 'px';
			field.style = 'display: none';
			field = tab.get( 'htmlPreview' );
			field.style = 'display: none';
			tab.remove( 'txtHeight' );
			tab.remove( 'ratioLock' );
			tab.remove( 'txtBorder' );
			tab.remove( 'txtHSpace' );
			tab.remove( 'txtVSpace' );
			tab.remove( 'cmbAlign' );
			tab.remove( 'txtAlt' );
		}
		else if ( name == 'specialchar' )
		{
			definition.resizable = false;
		}
		else if ( name == 'colordialog' )
		{
			definition.resizable = false;
		}
	}