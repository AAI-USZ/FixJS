function(data, status, xhr) {
				var self = this, url, selectedTabs;

				// Pseudo-redirects via X-ControllerURL might return empty data, in which
				// case we'll ignore the response
				if(!data) return;

				// Update title
				var title = xhr.getResponseHeader('X-Title');
				if(title) document.title = title;

				var newFragments = {}, newContentEls;
				if(xhr.getResponseHeader('Content-Type') == 'text/json') {
					newFragments = data;
				} else {
					// Fall back to replacing the content fragment if HTML is returned
					newFragments['Content'] = data;
				}

				// Replace each fragment individually
				$.each(newFragments, function(newFragment, html) {
					var contentEl = $('[data-pjax-fragment]').filter(function() {
						return $.inArray(newFragment, $(this).data('pjaxFragment').split(' ')) != -1;
					}), newContentEl = $(html);

					// Add to result collection
					if(newContentEls) newContentEls.add(newContentEl);
					else newContentEls = newContentEl;
					
					// Update panels
					if(newContentEl.find('.cms-container').length) {
						throw 'Content loaded via ajax is not allowed to contain tags matching the ".cms-container" selector to avoid infinite loops';
					}
					
					// Set loading state and store element state
					var origStyle = contentEl.attr('style');
					var origVisible = contentEl.is(':visible');
					var layoutClasses = ['east', 'west', 'center', 'north', 'south'];
					var elemClasses = contentEl.attr('class');
					var origLayoutClasses = [];
					if(elemClasses) {
						origLayoutClasses = $.grep(
							elemClasses.split(' '),
							function(val) { return ($.inArray(val, layoutClasses) >= 0);}
						);
					}
					
					newContentEl
						.removeClass(layoutClasses.join(' '))
						.addClass(origLayoutClasses.join(' '));
					if(origStyle) newContentEl.attr('style', origStyle);
					newContentEl.css('visibility', 'hidden');

					// Allow injection of inline styles, as they're not allowed in the document body.
					// Not handling this through jQuery.ondemand to avoid parsing the DOM twice.
					var styles = newContentEl.find('style').detach();
					if(styles.length) $(document).find('head').append(styles);

					// Replace panel completely (we need to override the "layout" attribute, so can't replace the child instead)
					contentEl.replaceWith(newContentEl);

					// Unset loading and restore element state (to avoid breaking existing panel visibility, e.g. with preview expanded)
					if(origVisible) newContentEl.css('visibility', 'visible');
				});

				// Re-init tabs (in case the form tag itself is a tabset)
				var newForm = newContentEls.filter('form');
				if(newForm.hasClass('cms-tabset')) newForm.removeClass('cms-tabset').addClass('cms-tabset');

				this.redraw();

				this.restoreTabState();

				return newContentEls;
			}