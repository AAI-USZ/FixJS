function(e) {
					// track last key pressed
					lastKeyPressCode = e.keyCode;
					first_focus = false;
					switch(e.keyCode) {
						case 38: // up
							e.preventDefault();
							moveSelection("up");
							break;
						case 40: // down
							e.preventDefault();
							moveSelection("down");
							break;
						case 8:  // delete
							if(input.val() == ""){							
								var last = values_input.val().split(",");
								last = last[last.length - 2];
								selections_holder.children().not(org_li.prev()).removeClass("selected");
								if(org_li.prev().hasClass("selected")){
									values_input.val(values_input.val().replace(","+last+",",","));
									opts.selectionRemoved.call(this, org_li.prev());
								} else {
									opts.selectionClick.call(this, org_li.prev());
									org_li.prev().addClass("selected");		
								}
							}
							if(input.val().length == 1){
								results_holder.hide();
								 prev = "";
							}
							if($(":visible",results_holder).length > 0){
								if (timeout){ clearTimeout(timeout); }
								timeout = setTimeout(function(){ keyChange(); }, opts.keyDelay);
							}
							break;
						case 9: case 188:  // tab or comma
						  case 13: // return
              if( (opts.enterAsTab && lastKeyPressCode == 13) || lastKeyPressCode == 9 || lastKeyPressCode == 188)
              {
                tab_press = true;
  							var i_input = input.val().replace(/(,)/g, "");
  							var active = "";
  							if((opts.tabUsesSearchValue && (lastKeyPressCode == 9 || lastKeyPressCode == 188))
  							   || (opts.enterAsTab && lastKeyPressCode == 13))  {
  							  active = $("li.active:first", results_holder);
                }
  							if(active.length == 0 && i_input != "" && values_input.val().search(","+i_input+",") < 0 && i_input.length >= opts.minChars){	
  								e.preventDefault();
  								var n_data = {};
  								n_data[opts.selectedItemProp] = i_input;
  								n_data[opts.selectedValuesProp] = i_input;																				
  								var lis = $("li", selections_holder).length;
  								add_selected_item(n_data, "00"+(lis+1));
  								input.val("");
  								results_holder.hide();
  							}
							}
							tab_press = false;
							var active = $("li.active:first", results_holder);
							if(active.length > 0){
								input.val("");
								active.click();
								results_holder.hide();
							}
							if(opts.neverSubmit || active.length > 0){
								e.preventDefault();
							}
							break;
						default:
							if(opts.showResultList){
								if(opts.selectionLimit && $("li.as-selection-item", selections_holder).length >= opts.selectionLimit){
									results_ul.html('<li class="as-message">'+opts.limitText+'</li>');
									results_holder.show();
								} else {
									if (timeout){ clearTimeout(timeout); }
									timeout = setTimeout(function(){ keyChange(); }, opts.keyDelay);
								}
							}
							break;
					}
				}