function defineTemplates (templates, ui, util) {

			/* These are separated from the other templates, they do more work than just defining an object, and there
			   is no need to assemble these templates on page load, rather than when the script is actually being run. */

			templates.main =
				[ { ele: 'h1', id: 'imageHeader', text: $.l('Images') }
				, { ele: 'div', id: 'about_control', title: $.l('About') }
				,	ui.$makeIcon('about')
				, { ele: 'div', id: 'image_size' }
				,	[ { ele: 'div', 'class': 'imageSizeControl', id: 'imageMagnify', title: $.l('Magnify image') }
					,	ui.$makeIcon('zoomOut')
					, { ele: 'div', 'class': 'imageSizeControl', id: 'imageShrink', title: $.l('Shrink image') }
					,	ui.$makeIcon('zoomIn')
					]
				, { ele: 'div', id: 'options_control', title: $.l('Options') }
				,	ui.$makeIcon('options')
				, { ele: 'div', id: 'imageContainer' }
				,	[ { ele: 'div', id: 'imageHolder' }
					,	util.assemble('AboutElement', templates.MENUS.about)
					,	util.assemble('OptionsElement', templates.MENUS.options)
					, { ele: 'div', id: 'previewContainer' }
					,	util.assemble('PreviewElement', templates.image_preview)
					]
				];
		}