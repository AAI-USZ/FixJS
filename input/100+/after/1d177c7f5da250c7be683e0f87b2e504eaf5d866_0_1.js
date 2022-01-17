function(option) {
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
							dojo.forEach(parts, function(part) {
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
		}