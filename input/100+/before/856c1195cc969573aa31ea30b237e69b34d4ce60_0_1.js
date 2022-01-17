function(mdTa){
			var headline, toggleHtmlPreview, toggleLivePreview, livePreview, htmlPreview;
			
			var togglePreview = function(e){
				var htmlMode = e.target.hasClass('toggle_html_preview');
				livePreview.toggleClass('hide', htmlMode);
				htmlPreview.toggleClass('hide', !htmlMode);
				toggleLivePreview.toggleClass('active', !htmlMode);
				toggleHtmlPreview.toggleClass('active', htmlMode);
			};
			
			headline = new Element('h6.preview_switch', {text: 'Preview'});
			
			toggleHtmlPreview = new Element('span.toggle_html_preview', {text: 'HTML'})
				.addEvent('click', togglePreview)
				.inject(headline);
			toggleLivePreview = new Element('span.toggle_live_preview.active', {text: 'Live'})
				.addEvent('click', togglePreview)
				.inject(headline);

			headline.inject(mdTa, 'after');
			
			livePreview = new Element('div.wmd-preview').inject(headline, 'after');
			htmlPreview = new Element('div.wmd-output.hide').inject(livePreview, 'after');
			
			new WMDEditor({
				input: mdTa,
				button_bar: new Element('div').inject(mdTa, 'before'),
				preview: livePreview,
				output: htmlPreview,
				buttons: "bold italic link image  ol ul heading hr  undo redo help",
				modifierKeys: false,
				autoFormatting: false
			});
		}