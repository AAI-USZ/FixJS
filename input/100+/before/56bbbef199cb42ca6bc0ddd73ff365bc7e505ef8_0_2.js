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
				
			templates.imageEditor = function template_imageEditor () {
				var controls = INNERCONTEXT.TEMPLATES.CONTROLS
				  , crop     = controls.crop
				  , flip     = controls.flip
				  , mask     = controls.mask
		          , button   = 'button'
				  , div      = 'div'
				  , fieldset = 'fieldset'
				  , input    = 'input'
				  , label    = 'label'
				  , legend   = 'legend'
				  ;
	
				return [ { ele: div, id:'CAAoverlay', hide: true, 'class': 'ie' }
					   , { ele: div, id: 'ie', hide: true, 'class': 'ie' }
					   ,	[ controls.closeButton
							, { ele: div, id: 'ieDiv' }
							,	[ { ele: div, id: 'ieCanvasDiv' }
								,	[ mask('Left', 'Horizontal')
									, mask('Right', 'Horizontal')
									, mask('Top', 'Vertical')
									, mask('Bottom', 'Vertical')
									, { ele: 'canvas', id: 'ieCanvas' }
									]
								, { ele: div, id: 'ieMenu' }
								,	[ { ele: fieldset }
									,	[ { ele: legend, text: $.l('Rotate image') }
										, { ele: label, title: $.l('How many degrees'), 'for': 'ImageEditor‿input‿number‿ieRotateControl' }
										,	[ { ele: input, id: 'ieRotateControl', max: 360, min: -360, step: 1, type: 'number', value: 0 }
											, $.l('degrees')
											]
										]
									, { ele: fieldset }
									,	[ { ele: legend, text: $.l('Flip image') }
										, flip('Vertical')
										, flip('Horizontal')
										]
									, { ele: fieldset }
									,	[ { ele: legend, text: $.l('Crop image') }
										, crop('Top')
										, crop('Bottom')
										, crop('Left')
										, crop('Right')
										, { ele: label, 'class': 'cropLabel', title: $.l('Crop mask color'), 'for': 'ImageEditor‿input‿color‿ieMaskColorControl'}
										,	[ { ele: input, 'class': 'cropControl', id: 'ieMaskColorControl', type: 'color', value: INNERCONTEXT.UTILITY.getColor('MASK') }
											, $.l('Crop mask color')
											]
										, { ele: input, id: 'ieApplyCropBtn', title: $.l('Apply'), type: button, value: $.l('Apply') }
										]
									, { ele: fieldset }
									,	[ { ele: input, id: 'ieSaveImageBtn', title: $.l('Save changes'), type: button, value: $.l('Save') }
										, { ele: input, id: 'ieCancelBtn', title: $.l('Cancel'), type: button, value: $.l('Cancel') }
										]
									]
								]
							]
					   ];
			};
			templates.imageEditor = templates.imageEditor();
		}