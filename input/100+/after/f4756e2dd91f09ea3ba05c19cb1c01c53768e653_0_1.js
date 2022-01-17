function() {
					var topPos = $(this).offset().top + 'px';
					var leftPos = $(this).offset().left + 'px';
					var width = $(this).width();
					var height = $(this).height();
					MINI_BRICK_MASK.empty();
					var brickId = $(this).attr('brick-id');
					var extName = $(this).attr('ext-name');
					MINI_BRICK_MASK.append("<div class='ext-name'>" + extName + "</div> <a href='#/admin/brick/edit/brick-id/" + brickId + "'>编辑模块</a>");
					MINI_BRICK_MASK.css({
						'top': topPos,
						'left': leftPos,
						'width': width,
						'height': height,
						'display': 'block',
						'zIndex': '99'
					});
					
					if($(this).attr('gearlinks') != undefined) {
						var gearLinks = jQuery.parseJSON($(this).attr('gearlinks'));
						
						if(gearLinks.length > 0) {
							var UL = $("<ul class='gearlinks'></ul>");
							for(i in gearLinks) {
								gl = gearLinks[i];
								UL.append("<li><a href='#" +  gl.href + "'>" + gl.label + "</a></li>");
							}
							MINI_BRICK_MASK.append(UL);
						}
					}
				}