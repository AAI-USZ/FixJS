function inputsToList() {
			var html = '<ul class="tagedit-list '+options.additionalListClass+'">';

			elements.each(function() {
				var element_name = $(this).attr('name').match(baseNameRegexp);
				if(element_name && element_name.length == 4 && (options.deleteEmptyItems == false || $(this).val().length > 0)) {
					if(element_name[1].length > 0) {
						var elementId = typeof element_name[2] != 'undefined'? element_name[2]: '';

						html += '<li class="tagedit-listelement tagedit-listelement-old">';
						html += '<span dir="'+options.direction+'">' + $(this).val() + '</span>';
						html += '<input type="hidden" name="'+baseName+'['+elementId+']" value="'+$(this).val()+'" />';
						html += '<a class="tagedit-close" title="'+options.texts.removeLinkTitle+'">x</a>';
						html += '</li>';
					}
				}
			});

			// replace Elements with the list and save the list in the local variable elements
			elements.last().after(html)
			var newList = elements.last().next();
			elements.remove();
			elements = newList;

			// Check if some of the elementshav to be marked as deleted
			if(options.deletedPostfix.length > 0) {
				elements.find('input[name$="'+options.deletedPostfix+'\]"]').each(function() {
					markAsDeleted($(this).parent());
				});
			}

			// put an input field at the End
			// Put an empty element at the end
			html = '<li class="tagedit-listelement tagedit-listelement-new">';
			html += '<input type="text" name="'+baseName+'[]" value="" id="tagedit-input" disabled="disabled" class="tagedit-input-disabled" dir="'+options.direction+'"/>';
			html += '</li>';
			html += '</ul>';

			elements
				.append(html)
				.attr('tabindex', options.tabindex) // set tabindex to <ul> to recieve focus

				// Set function on the input
				.find('#tagedit-input')
					.attr('tabindex', options.tabindex)
					.each(function() {
						$(this).autoGrowInput({comfortZone: 15, minWidth: 15, maxWidth: 20000});

						// Event ist triggert in case of choosing an item from the autocomplete, or finish the input
						$(this).bind('transformToTag', function(event, id) {
							var oldValue = (typeof id != 'undefined' && id.length > 0);

							var checkAutocomplete = oldValue == true? false : true;
							// check if the Value ist new
							var isNewResult = isNew($(this).val(), checkAutocomplete);
							if(isNewResult[0] === true || (isNewResult[0] === false && typeof isNewResult[1] == 'string')) {

								if(oldValue == false && typeof isNewResult[1] == 'string') {
									oldValue = true;
									id = isNewResult[1];
								}

								if(options.allowAdd == true || oldValue) {
									// Make a new tag in front the input
									html = '<li class="tagedit-listelement tagedit-listelement-old">';
									html += '<span dir="'+options.direction+'">' + $(this).val() + '</span>';
									var name = oldValue? baseName + '['+id+options.addedPostfix+']' : baseName + '[]';
									html += '<input type="hidden" name="'+name+'" value="'+$(this).val()+'" />';
									html += '<a class="tagedit-close" title="'+options.texts.removeLinkTitle+'">x</a>';
									html += '</li>';

									$(this).parent().before(html);
								}
							}
							$(this).val('');

							// close autocomplete
							if(options.autocompleteOptions.source) {
								$(this).autocomplete( "close" );
							}

						})
						.keydown(function(event) {
							var code = event.keyCode > 0? event.keyCode : event.which;

							switch(code) {
								case 8: // BACKSPACE
									if($(this).val().length == 0) {
										// delete Last Tag
										var elementToRemove = elements.find('li.tagedit-listelement-old').last();
										elementToRemove.fadeOut(options.animSpeed, function() {elementToRemove.remove();})
										event.preventDefault();
										return false;
									}
									break;
								case 9: // TAB
									if($(this).val().length > 0 && $('ul.ui-autocomplete #ui-active-menuitem').length == 0) {
										$(this).trigger('transformToTag');
										event.preventDefault();
										return false;
									}
								break;
							}
							return true;
						})
						.keypress(function(event) {
							var code = event.keyCode > 0? event.keyCode : event.which;
							if($.inArray(code, options.breakKeyCodes) > -1) {
								if($(this).val().length > 0 && $('ul.ui-autocomplete #ui-active-menuitem').length == 0) {
									$(this).trigger('transformToTag');
								}
							event.preventDefault();
							return false;
							}
							return true;
						})
						.bind('paste', function(e){
							var that = $(this);
							if (e.type == 'paste'){
								setTimeout(function(){
									that.trigger('transformToTag');
								}, 1);
							}
						})
						.blur(function() {
							if($(this).val().length == 0) {
								// disable the field to prevent sending with the form
								$(this).attr('disabled', 'disabled').addClass('tagedit-input-disabled');
							}
							else {
								// Delete entry after a timeout
								var input = $(this);
								$(this).data('blurtimer', window.setTimeout(function() {input.val('');}, 500));
							}
						})
						.focus(function() {
							window.clearTimeout($(this).data('blurtimer'));
						});

						if(options.autocompleteOptions.source != false) {
							$(this).autocomplete(options.autocompleteOptions);
						}
					})
				.end()
				.click(function(event) {
					switch(event.target.tagName) {
						case 'A':
							$(event.target).parent().fadeOut(options.animSpeed, function() {
								$(event.target).parent().remove();
								});
							break;
						case 'INPUT':
						case 'SPAN':
						case 'LI':
							if($(event.target).hasClass('tagedit-listelement-deleted') == false &&
							$(event.target).parent('li').hasClass('tagedit-listelement-deleted') == false) {
								// Don't edit an deleted Items
								return doEdit(event);
							}
						default:
							$(this).find('#tagedit-input')
								.removeAttr('disabled')
								.removeClass('tagedit-input-disabled')
								.focus();
					}
					return false;
				})
				// forward focus event (on tabbing through the form)
				.focus(function(e){ $(this).click(); })
		}