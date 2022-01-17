function() {
		this.no_results_clear();
		
		var results = 0,
			searchText = dojo.getAttr(this.search_field, 'value') === this.default_text ? "" : dojo.getAttr(this.search_field, 'value').trim(),
			regex = new RegExp('^' + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i'),
			zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
		
		_this = this;
					
		this.results_data.forEach(function(option) {
			if (!option.disabled && !option.empty) {
				if (option.group) {		
					dojo.setStyle(dojo.byId(option.dom_id), 'display', 'none');
				} else if (!(_this.is_multiple && option.selected)) {
					var found = false,
						result_id = option.dom_id,
						result = dojo.byId(result_id);
					if (regex.test(option.html)){
						found = true;
						results += 1;
					} else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0){
						var parts = option.html.replace(/\[|\]/g, "").split(" ");
	
						if (parts.length) {
							parts.forEach(function(part) {
								if (regex.test(part)) {
									found = true;
									results += 1;
								}
							});
						}	
					}
		
					if (found) {
						var text;
						if (searchText.length) {
							var startpos = option.html.search(zregex);
							text = option.html.substr(0, startpos + searchText.length) + '</em>' + option.html.substr(startpos + searchText.length);
							text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
						} else {
							text = option.html;
						}
	
						result.innerHTML = text;
						_this.result_activate(result);
	
						if (option.group_array_index != null) {
							dojo.setStyle(dojo.byId(_this.results_data[option.group_array_index].dom_id), 'display', 'list-item');
						}

					} else {
						if (_this.result_highlight && result_id === _this.result_highlight.id) {
							_this.result_clear_highlight();
						}
	
						_this.result_deactivate(result);
					}
				}
			}
		});
		
		if (results < 1 && searchText.length) {
			this.no_results(searchText);
		} else {
			this.winnow_results_set_highlight();
		}
    }