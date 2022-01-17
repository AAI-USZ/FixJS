function() {
				// sel:'selector', fn:function, evt:'event', key:[key, preventDefault, NoDisableInInput]
				var tool_buttons = [
					{sel:'#tool_select', fn: clickSelect, evt: 'click', key: ['V', true]},
					{sel:'#tool_fhpath', fn: clickFHPath, evt: 'click', key: ['Q', true]},
					{sel:'#tool_line', fn: clickLine, evt: 'click', key: ['L', true]},
					{sel:'#tool_rect', fn: clickRect, evt: 'click', key: ['R', true], icon: 'rect'},
					{sel:'#tool_ellipse', fn: clickEllipse, evt: 'mouseup', key: ['C', true], icon: 'ellipse'},
					//{sel:'#tool_circle', fn: clickCircle, evt: 'mouseup', icon: 'circle'},
					//{sel:'#tool_fhellipse', fn: clickFHEllipse, evt: 'mouseup', parent: '#tools_ellipse', icon: 'fh_ellipse'},
					{sel:'#tool_path', fn: clickPath, evt: 'click', key: ['P', true]},
					{sel:'#tool_text', fn: clickText, evt: 'click', key: ['T', true]},
					{sel:'#tool_image', fn: clickImage, evt: 'mouseup'},
					{sel:'#tool_zoom', fn: clickZoom, evt: 'mouseup', key: ['Z', true]},
					{sel:'#tool_clear', fn: clickClear, evt: 'mouseup', key: [modKey + 'N', true]},
					{sel:'#tool_save', fn: function() { editingsource?saveSourceEditor():clickSave()}, evt: 'mouseup', key: [modKey + 'S', true]},
					{sel:'#tool_export', fn: clickExport, evt: 'mouseup'},
					{sel:'#tool_open', fn: clickOpen, evt: 'mouseup'},
					{sel:'#tool_import', fn: clickImport, evt: 'mouseup'},
					{sel:'#tool_source', fn: showSourceEditor, evt: 'click', key: [modKey + 'U', true]},
					{sel:'#tool_wireframe', fn: clickWireframe, evt: 'click'},
					{sel:'#tool_rulers', fn: clickRulers, evt: 'click'},
					{sel:'#tool_source_cancel,#svg_source_overlay,#tool_docprops_cancel,#tool_prefs_cancel', fn: cancelOverlays, evt: 'click', key: ['esc', false, false], hidekey: true},
					{sel:'#tool_source_save', fn: saveSourceEditor, evt: 'click'},
					{sel:'#tool_docprops_save', fn: saveDocProperties, evt: 'click'},
					{sel:'#tool_docprops', fn: showDocProperties, evt: 'mouseup'},
					{sel:'#tool_prefs_save', fn: savePreferences, evt: 'click'},
					{sel:'#tool_prefs_option', fn: function() {showPreferences();return false}, evt: 'mouseup'},
					{sel:'#tool_delete,#tool_delete_multi', fn: deleteSelected, evt: 'click', key: ['del/backspace', true]},
					{sel:'#tool_reorient', fn: reorientPath, evt: 'click'},
					{sel:'#tool_node_link', fn: linkControlPoints, evt: 'click'},
					{sel:'#tool_node_clone', fn: clonePathNode, evt: 'click'},
					{sel:'#tool_node_delete', fn: deletePathNode, evt: 'click'},
					{sel:'#tool_openclose_path', fn: opencloseSubPath, evt: 'click'},
					{sel:'#tool_add_subpath', fn: addSubPath, evt: 'click'},
					{sel:'#tool_move_top', fn: moveToTopSelected, evt: 'click', key: modKey + 'shift+up'},
					{sel:'#tool_move_bottom', fn: moveToBottomSelected, evt: 'click', key: modKey + 'shift+down'},
					{sel:'#tool_move_up', fn: moveUpSelected, evt:'click', key: [modKey+'up', true]},
					{sel:'#tool_move_down', fn: moveDownSelected, evt:'click', key: [modKey+'down', true]},
					{sel:'#tool_topath', fn: convertToPath, evt: 'click'},
					{sel:'#tool_make_link,#tool_make_link_multi', fn: makeHyperlink, evt: 'click'},
					{sel:'#tool_undo', fn: clickUndo, evt: 'click', key: [modKey + 'Z', true]},
					{sel:'#tool_redo', fn: clickRedo, evt: 'click', key: ['Y', true]},
					{sel:'#tool_clone,#tool_clone_multi', fn: clickClone, evt: 'click', key: [modKey + 'D', true]},
					{sel:'#tool_group', fn: clickGroup, evt: 'click', key: [modKey + 'G', true]},
					{sel:'#tool_ungroup', fn: clickGroup, evt: 'click', key: modKey + 'shift+G'},
					{sel:'#tool_unlink_use', fn: clickGroup, evt: 'click'},
					{sel:'[id^=tool_align]', fn: clickAlign, evt: 'click'},
					{sel:'#tool_switch', fn: clickSwitch, evt: 'click', key: ['X', true]},
					// these two lines are required to make Opera work properly with the flyout mechanism
		// 			{sel:'#tools_rect_show', fn: clickRect, evt: 'click'},
		// 			{sel:'#tools_ellipse_show', fn: clickEllipse, evt: 'click'},
					{sel:'#tool_bold', fn: clickBold, evt: 'mousedown', key: [modKey + 'B', true]},
					{sel:'#tool_italic', fn: clickItalic, evt: 'mousedown',  key: [modKey + 'I', true]},
					//{sel:'#sidepanel_handle', fn: toggleSidePanel, key: ['X']},
					{sel:'#copy_save_done', fn: cancelOverlays, evt: 'click'},
					
					// Shortcuts not associated with buttons
					
					{key: 'ctrl+left', fn: function(){rotateSelected(0,1)}},
					{key: 'ctrl+right', fn: function(){rotateSelected(1,1)}},
					{key: 'ctrl+shift+left', fn: function(){rotateSelected(0,5)}},					
					{key: 'ctrl+shift+right', fn: function(){rotateSelected(1,5)}},
					{key: 'shift+O', fn: selectPrev},
					{key: 'shift+P', fn: selectNext},
					{key: [modKey+'+', true], fn: function(){zoomImage(2);}},
					{key: [modKey+'-', true], fn: function(){zoomImage(.5);}},
					{key: ['up', true], fn: function(){moveSelected(0,-1);}},
					{key: ['down', true], fn: function(){moveSelected(0,1);}},
					{key: ['left', true], fn: function(){moveSelected(-1,0);}},
					{key: ['right', true], fn: function(){moveSelected(1,0);}},
					{key: 'shift+up', fn: function(){moveSelected(0,-10)}},
					{key: 'shift+down', fn: function(){moveSelected(0,10)}},
					{key: 'shift+left', fn: function(){moveSelected(-10,0)}},
					{key: 'shift+right', fn: function(){moveSelected(10,0)}},
					{key: ['alt+up', true], fn: function(){svgCanvas.cloneSelectedElements(0,-1)}},
					{key: ['alt+down', true], fn: function(){svgCanvas.cloneSelectedElements(0,1)}},
					{key: ['alt+left', true], fn: function(){svgCanvas.cloneSelectedElements(-1,0)}},
					{key: ['alt+right', true], fn: function(){svgCanvas.cloneSelectedElements(1,0)}},
					{key: ['alt+shift+up', true], fn: function(){svgCanvas.cloneSelectedElements(0,-10)}},
					{key: ['alt+shift+down', true], fn: function(){svgCanvas.cloneSelectedElements(0,10)}},
					{key: ['alt+shift+left', true], fn: function(){svgCanvas.cloneSelectedElements(-10,0)}},
					{key: ['alt+shift+right', true], fn: function(){svgCanvas.cloneSelectedElements(10,0)}},	
					{key: modKey + 'A', fn: function(){svgCanvas.selectAllInCurrentLayer();}},

					// Standard shortcuts
					{key: modKey + 'z', fn: clickUndo},
					{key: modKey + 'shift+z', fn: clickRedo},
					{key: modKey + 'y', fn: clickRedo},
					{key: 'esc', fn: minimizeModal},
					{key: modKey+'x', fn: cutSelected},
					{key: modKey+'c', fn: copySelected},
					{key: modKey+'v', fn: pasteInCenter}
					

				];
				
				// Tooltips not directly associated with a single function
				var key_assocs = {
					'4/Shift+4': '#tools_rect_show',
					'5/Shift+5': '#tools_ellipse_show'
				};
			
				return {
					setAll: function() {
						var flyouts = {};
						
						$.each(tool_buttons, function(i, opts)  {				
							// Bind function to button
							if(opts.sel) {
								var btn = $(opts.sel);
								if (btn.length == 0) return true; // Skip if markup does not exist
								if(opts.evt) {
								  if (svgedit.browser.isTouch() && opts.evt === "click") opts.evt = "mousedown" 
									btn[opts.evt](opts.fn);
								}
		
								// Add to parent flyout menu, if able to be displayed
								if(opts.parent && $(opts.parent + '_show').length != 0) {
									var f_h = $(opts.parent);
									if(!f_h.length) {
										f_h = makeFlyoutHolder(opts.parent.substr(1));
									}
									
									f_h.append(btn);
									
									if(!$.isArray(flyouts[opts.parent])) {
										flyouts[opts.parent] = [];
									}
									flyouts[opts.parent].push(opts);
								}
							}
							
							
							// Bind function to shortcut key
							if(opts.key) {
								// Set shortcut based on options
								var keyval, shortcut = '', disInInp = true, fn = opts.fn, pd = false;
								if($.isArray(opts.key)) {
									keyval = opts.key[0];
									if(opts.key.length > 1) pd = opts.key[1];
									if(opts.key.length > 2) disInInp = opts.key[2];
								} else {
									keyval = opts.key;
								}
								keyval += '';
								if (svgedit.browser.isMac && keyval.indexOf("+") != -1) {
								  var modifier_key =  keyval.split("+")[0];
								  if (modifier_key == "ctrl") keyval.replace("ctrl", "cmd")
								}
								
								$.each(keyval.split('/'), function(i, key) {
									$(document).bind('keydown', key, function(e) {
										fn();
										if(pd) {
											e.preventDefault();
										}
										// Prevent default on ALL keys?
										return false;
									});
								});
								
								// Put shortcut in title
								if(opts.sel && !opts.hidekey && btn.attr('title')) {
									var new_title = btn.attr('title').split('[')[0] + ' (' + keyval + ')';
									key_assocs[keyval] = opts.sel;
									// Disregard for menu items
									if(!btn.parents('#main_menu').length) {
										btn.attr('title', new_title);
									}
								}
							}
						});
						
						// Setup flyouts
						setupFlyouts(flyouts);
						
						
						// Misc additional actions
						
						// Make "return" keypress trigger the change event
						$('.attr_changer, #image_url').bind('keydown', 'return', 
							function(evt) {$(this).change();evt.preventDefault();}
						);
						
						$(window).bind('keydown', 'tab', function(e) {
							if(ui_context === 'canvas') {
								e.preventDefault();
								selectNext();
							}
						}).bind('keydown', 'shift+tab', function(e) {
							if(ui_context === 'canvas') {
								e.preventDefault();
								selectPrev();
							}
						});
						
						$('#tool_zoom').dblclick(dblclickZoom);
					},
					setTitles: function() {
						$.each(key_assocs, function(keyval, sel)  {
							var menu = ($(sel).parents('#main_menu').length);
						
							$(sel).each(function() {
								if(menu) {
									var t = $(this).text().split(' [')[0];
								} else {
									var t = this.title.split(' [')[0];							
								}
								var key_str = '';
								// Shift+Up
								$.each(keyval.split('/'), function(i, key) {
									var mod_bits = key.split('+'), mod = '';
									if(mod_bits.length > 1) {
										mod = mod_bits[0] + '+';
										key = mod_bits[1];
									}
									key_str += (i?'/':'') + mod + (uiStrings['key_'+key] || key);
								});
								if(menu) {
									this.lastChild.textContent = t +' ['+key_str+']';
								} else {
									this.title = t +' ['+key_str+']';
								}
							});
						});
					},
					getButtonData: function(sel) {
						var b;
						$.each(tool_buttons, function(i, btn) {
							if(btn.sel === sel) b = btn;
						});
						return b;
					}
				};
			}