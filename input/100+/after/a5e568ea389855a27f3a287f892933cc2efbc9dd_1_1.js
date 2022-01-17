function() {
			  
				var elem = selectedElement;
				// If element has just been deleted, consider it null
				if(elem != null && !elem.parentNode) elem = null;
				var currentLayerName = svgCanvas.getCurrentDrawing().getCurrentLayerName();
				var currentMode = svgCanvas.getMode();
				var unit = curConfig.baseUnit !== 'px' ? curConfig.baseUnit : null;
				
				var is_node = currentMode == 'pathedit'; //elem ? (elem.id && elem.id.indexOf('pathpointgrip') == 0) : false;
				var menu_items = $('#cmenu_canvas li');
				$('#selected_panel, #multiselected_panel, #g_panel, #path_panel, #rect_panel, #canvas_panel, #circle_panel,\
					#ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel').hide();
				$('.menu_item', '#edit_menu').addClass('disabled');
				$('.menu_item', '#object_menu').addClass('disabled');
				if (!elem && !multiselected) $("#canvas_panel").show();
				if (elem != null) {
					var elname = elem.nodeName;
					var angle = svgCanvas.getRotationAngle(elem);
					$('#angle').val(Math.round(angle));
					
					var blurval = svgCanvas.getBlur(elem);
					$('#blur').val(blurval);
					
					if(!is_node && currentMode != 'pathedit') {
						$('#selected_panel').show();
						$('.action_selected').removeClass('disabled');
						// Elements in this array already have coord fields
            var x, y
						if(['g', 'polyline', 'path'].indexOf(elname) >= 0) {
							var bb = svgCanvas.getStrokedBBox([elem]);
							if(bb) {
								x = bb.x;
								y = bb.y;
							}
						}
						
						if(unit) {
							x = svgedit.units.convertUnit(x);
							y = svgedit.units.convertUnit(y);
						}
						
						$("#" + elname +"_x").val(Math.round(x))
						$("#" + elname +"_y").val(Math.round(y))
											
					  // Elements in this array cannot be converted to a path
  					var no_path = ['image', 'text', 'path', 'g', 'use'].indexOf(elname) == -1;
  					if (no_path) $('.action_path_convert_selected').removeClass('disabled');
  					if (elname === "path") $('.action_path_selected').removeClass('disabled');
  
					} else {
						var point = path.getNodePoint();
						$('#tool_add_subpath').removeClass('push_button_pressed').addClass('tool_button');
						$('#tool_node_delete').toggleClass('disabled', !path.canDeleteNodes);
						
						// Show open/close button based on selected point
						setIcon('#tool_openclose_path', path.closed_subpath ? 'open_path' : 'close_path');
						
						if(point) {
							var seg_type = $('#seg_type');
							if(unit) {
								point.x = svgedit.units.convertUnit(point.x);
								point.y = svgedit.units.convertUnit(point.y);
							}
							$('#path_node_x').val(Math.round(point.x));
							$('#path_node_y').val(Math.round(point.y));
							if(point.type) {
								seg_type.val(point.type).removeAttr('disabled');
							} else {
								seg_type.val(4).attr('disabled','disabled');
							}
						}
						return;
					}
					
					var link_href = null;
					if (el_name === 'a') {
						link_href = svgCanvas.getHref(elem);
						$('#g_panel').show();
					}
					
					if(elem.parentNode.tagName === 'a') {
						if(!$(elem).siblings().length) {
							$('#a_panel').show();
							link_href = svgCanvas.getHref(elem.parentNode);
						}
					}
					
					// Hide/show the make_link buttons
					$('#tool_make_link, #tool_make_link').toggle(!link_href);
					
					if(link_href) {
						$('#link_url').val(link_href);
					}
					
					// update contextual tools here
					var panels = {
						g: [],
						a: [],
						rect: ['rx','width','height', 'x', 'y'],
						image: ['width','height', 'x', 'y'],
						circle: ['cx','cy','r'],
						ellipse: ['cx','cy','rx','ry'],
						line: ['x1','y1','x2','y2'], 
						text: ['x', 'y'],
						'use': []
					};
					
					var el_name = elem.tagName;
					
 					if($(elem).data('gsvg')) {
 						$('#g_panel').show();
 					}
 					
 					if (el_name == "path") {
 					  $('#path_panel').show();
 					}
					
					if(panels[el_name]) {
						var cur_panel = panels[el_name];
						$('#' + el_name + '_panel').show();
			      
			      // corner radius has to live in a different panel
			      // because otherwise it changes the position of the 
			      // of the elements
			      if(el_name == "rect") $("#cornerRadiusLabel").show()
			      else $("#cornerRadiusLabel").hide()
						
						$.each(cur_panel, function(i, item) {
							var attrVal = elem.getAttribute(item);
							if(curConfig.baseUnit !== 'px' && elem[item]) {
								var bv = elem[item].baseVal.value;
								attrVal = svgedit.units.convertUnit(bv);
							}
							
							//update the draginput cursors
						  var name_item = document.getElementById(el_name + '_' + item);
							name_item.value = Math.round(attrVal) || 0;
							if (name_item.getAttribute("data-cursor") === "true") {
      				  $.fn.dragInput.updateCursor(name_item );
      				}
						});
						
						if(el_name == 'text') {
							$('#text_panel').css("display", "inline");	
							if (svgCanvas.getItalic()) {
								$('#tool_italic').addClass('push_button_pressed').removeClass('tool_button');
							}
							else {
								$('#tool_italic').removeClass('push_button_pressed').addClass('tool_button');
							}
							if (svgCanvas.getBold()) {
								$('#tool_bold').addClass('push_button_pressed').removeClass('tool_button');
							}
							else {
								$('#tool_bold').removeClass('push_button_pressed').addClass('tool_button');
							}
							$('#font_family').val(elem.getAttribute("font-family"));
							$('#font_size').val(elem.getAttribute("font-size"));
							$('#text').val(elem.textContent);
							if (svgCanvas.addedNew) {
								// Timeout needed for IE9
								setTimeout(function() {
									$('#text').focus().select();
								},100);
							}
						} // text
						else if(el_name == 'image') {
							setImageURL(svgCanvas.getHref(elem));
						} // image
						else if(el_name === 'g' || el_name === 'use') {
							$('#container_panel').show();
							$('.action_group_selected').removeClass('disabled');
							var title = svgCanvas.getTitle();
							var label = $('#g_title')[0];
							label.value = title;
							setInputWidth(label);
							var d = 'disabled';
							if(el_name == 'use') {
								label.setAttribute(d, d);
							} else {
								label.removeAttribute(d);
							}
						}
					}
					menu_items[(el_name === 'g' ? 'en':'dis') + 'ableContextMenuItems']('#ungroup');
					menu_items[((el_name === 'g' || !multiselected) ? 'dis':'en') + 'ableContextMenuItems']('#group');
				} // if (elem != null)
				else if (multiselected) {
					$('#multiselected_panel').show();
					$('.action_multi_selected').removeClass('disabled');
					menu_items
						.enableContextMenuItems('#group')
						.disableContextMenuItems('#ungroup');
				} else {
					menu_items.disableContextMenuItems('#delete,#cut,#copy,#group,#ungroup,#move_front,#move_up,#move_down,#move_back');
				}
				
				// update history buttons
				if (undoMgr.getUndoStackSize() > 0) {
					$('#tool_undo').removeClass( 'disabled');
				}
				else {
					$('#tool_undo').addClass( 'disabled');
				}
				if (undoMgr.getRedoStackSize() > 0) {
					$('#tool_redo').removeClass( 'disabled');
				}
				else {
					$('#tool_redo').addClass( 'disabled');
				}
				
				svgCanvas.addedNew = false;
			}