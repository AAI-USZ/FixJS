function(search) {
		var matches, regexp, matches_found, i, v, count, extra_elems_count, special_add_el;
		
		this.autoholder.setStyle({'display': 'block'});
		this.autoholder.descendants().each(function(e) { e.hide(); });
		
		if (!search || !search.strip() || (!search.length || search.length < this.loptions.get('autocomplete').minchars)) {
			if (this.autoholder.select('.default').first()) {
				this.autoholder.select('.default').first().setStyle({'display': 'block'});
			}
			this.resultsshown = false;
			
		} else {
			this.resultsshown = true;
			this.autoresults.setStyle({'display': 'block'}).update('');
			
			if (!this.options.get('regexSearch')) {
				matches = new Array();
				if (search) {
					if (!this.options.get('caseSensitive')) {
						search = search.toLowerCase();
					}
					
					for (matches_found = 0, i = 0, len = this.data_searchable.length; i < len; i++) {
						if (this.data_searchable[i].indexOf(search) >= 0) {
							v = this.data[i];
							if (v !== undefined) {
								matches[matches_found++] = v;
							}
						}
					}
					
				}
				
			} else {
				if (this.options.get('wordMatch')) {
					regexp = new RegExp("(^|\\s)"+RegExp.escape(search),(!this.options.get('caseSensitive') ? 'i' : ''));
				} else {
					regexp = new RegExp(RegExp.escape(search),(!this.options.get('caseSensitive') ? 'i' : ''));
				}
				
				matches = this.data.filter(
					function(str) {
						return str ? regexp.test(str.evalJSON(true).caption) : false;
					}
				);
			}
			
			if (this.options.get('sortResults')) {
				matches = matches.sortBy(function(el) { return el.evalJSON(true).caption });
			}
			
			count = 0;
			extra_elems_count = 0;
			special_add_el = null;
			
			// "Add **search**" element
			if (this.isSearchInsertable(search)) {
				count++;
				extra_elems_count++;
				
			 	special_add_el = new Element('li');
				special_add_el.addClassName('add-value-special-element');
				special_add_el.cacheData('result', { caption: search, value: search, newValue: true })
				special_add_el.cacheData('input', this.inputElem);
				special_add_el.observe('click', function(e) { 
					e.stop();
					this.current_input = "";
					this.autoAdd(special_add_el);
				}.bindAsEventListener(this)).observe('mouseover',function() { 
					this.autoFocus(special_add_el); 
				}.bindAsEventListener(this)).update("Add <b>" + search + "</b>");
				this.autoresults.insert(special_add_el);
			}
			
			// Handle matches...
			matches.each(
				function(result, ti) {
					var that = this,
						el, caption;
						
					count++;
					if (ti >= ((this.options.get('maxResults') ? this.options.get('maxResults') : this.loptions.get('autocomplete').maxresults) - extra_elems_count)) return;
					
					el = new Element('li');
					caption = result.evalJSON(true).caption;
					
					el.observe('click', function(e)
						{
							e.stop();
							that.current_input = "";
							that.autoAdd(this);
						})
						.observe('mouseover', function() { that.autoFocus(this); } )
						.update(this.autoHighlight(caption, search));
					
					this.autoresults.insert(el);
					el.cacheData('result', result.evalJSON(true));
					if (ti == 0) this.autoFocus(el);
				}, this
			);
			
			if (extra_elems_count == count) {
				this.autoFocus(special_add_el);
			}
		}
	
		if (count == 0) {
			// if there are no results, hide everything so that KEY_RETURN has no effect
			this.autocurrent = false;
			this.autoHide();
		} else {
			if (this.autoresults.firstDescendant()) {
				var autoresult_height = this.autoresults.firstDescendant().offsetHeight + 1;

				if (count > this.options.get('results')) {
					this.autoresults.setStyle({'height': (this.options.get('results') * autoresult_height) + 'px'});
				} else {
					this.autoresults.setStyle({'height': (count ? (count * autoresult_height) : 0) + 'px'});
				}
			}
		}
		
		return this;
	}