function(result, ti) {
					count++;
					if (ti >= ((this.options.get('maxResults') ? this.options.get('maxResults') : this.loptions.get('autocomplete').maxresults) - extra_elems_count)) return;
					
					var that = this;
					var el = new Element('li');
					var caption = result.evalJSON(true).caption;
					
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
				}