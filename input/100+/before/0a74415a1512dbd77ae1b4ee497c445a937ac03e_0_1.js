function()
		{
			var editor = this.getParentEditor(),
				selection = editor.getSelection(),
				element = null,
				data = { page : '' };

			// Fill in all the relevant fields if there's already one link selected.
			if ( ( element = pagelink_plugin.getSelectedLink( editor ) )
					&& element.hasAttribute( 'href' ) )
				selection.selectElement( element );
			else
				element = null;
			if( element )
			{
				this._.selectedElement = element;
				data.page = decodeURIComponent(element.getAttribute( 'href' ));
				if(element.hasClass('includepage_showtitle'))
					data.showtitle = true;
				if(element.hasClass('includepage_left'))
					data.align = 'left';
				if(element.hasClass('includepage_right'))
					data.align = 'right';
				var width = element.getStyle('width');
				if(width)
					data.width = width;
			}
			this.setupContent( data );
			// Set up autocomplete.
			var urlField = this.getContentElement( 'info', 'page' );
            $('#' + urlField.domId + ' input').autocomplete({source: '/api/pages/suggest'});
		}