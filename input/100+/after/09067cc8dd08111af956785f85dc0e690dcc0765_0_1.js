function() {
				var self = this;

				// Turn off autocomplete to fix the access tab randomly switching radio buttons in Firefox
				// when refresh the page with an anchor tag in the URL. E.g: /admin#Root_Access.
				// Autocomplete in the CMS also causes strangeness in other browsers,
				// filling out sections of the form that the user does not want to be filled out,
				// so this turns it off for all browsers.
				// See the following page for demo and explanation of the Firefox bug:
				//  http://www.ryancramer.com/journal/entries/radio_buttons_firefox/
				this.attr("autocomplete", "off");
			
				this._setupChangeTracker();

				// Catch navigation events before they reach handleStateChange(),
				// in order to avoid changing the menu state if the action is cancelled by the user
				// $('.cms-menu')
				
				// Optionally get the form attributes from embedded fields, see Form->formHtmlContent()
				for(var overrideAttr in {'action':true,'method':true,'enctype':true,'name':true}) {
					var el = this.find(':input[name='+ '_form_' + overrideAttr + ']');
					if(el) {
						this.attr(overrideAttr, el.val());
						el.remove();
					}
				}

				// TODO
				// // Rewrite # links
				// html = html.replace(/(<a[^>]+href *= *")#/g, '$1' + window.location.href.replace(/#.*$/,'') + '#');
				// 
				// // Rewrite iframe links (for IE)
				// html = html.replace(/(<iframe[^>]*src=")([^"]+)("[^>]*>)/g, '$1' + $('base').attr('href') + '$2$3');
				
				// Show validation errors if necessary
				if(this.hasClass('validationerror')) {
					// TODO validation shouldnt need a special case
					statusMessage(ss.i18n._t('ModelAdmin.VALIDATIONERROR', 'Validation Error'), 'bad');

					// Ensure the first validation error is visible
					var firstTabWithErrors = this.find('.message.validation:first').closest('.tab');
					$('.cms-container').clearCurrentTabState(); // clear state to avoid override later on
					firstTabWithErrors.closest('.tabset').tabs('select', firstTabWithErrors.attr('id'));
				}
				
				// Move navigator to preview if one is available.
				// If not, just leave the links in the form.
				var previewEl = $('.cms-preview');
				if(previewEl.length) {
					// TODO Relies on DOM element order (the second .cms-navigator is the "old" one)
					previewEl.find('.cms-preview-controls').html(this.find('.cms-navigator').detach());
				}
			
				this._super();
			}