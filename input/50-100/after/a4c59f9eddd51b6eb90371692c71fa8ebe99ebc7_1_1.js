function() {
			  if (window.event.type === "keydown") flash($('#edit_menu'));
				var zoom = svgCanvas.getZoom();				
				var x = (workarea[0].scrollLeft + workarea.width()/2)/zoom  - svgCanvas.contentW; 
				var y = (workarea[0].scrollTop + workarea.height()/2)/zoom  - svgCanvas.contentH;
				svgCanvas.pasteElements('point', x, y); 
			}