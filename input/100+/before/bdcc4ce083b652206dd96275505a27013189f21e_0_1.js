function(e){
					var pixelOffsetX = e.pageX - $(this).offset().left;
			        var pixelOffsetY = e.pageY - $(this).offset().top;
			        
					var offsetX = (pixelOffsetX / imageWidth)*100;
			        var offsetY = (pixelOffsetY / imageHeight)*100;
					
					var cursorSize = (3.2 * ratio) / 2;
					
					$("img.crosshair", $(this).parent()).css({left: (offsetX - cursorSize) + '%', top: (offsetY - cursorSize) + '%'});
					$("input[type=hidden]", $(this).parent().parent()).val(offsetX + ',' + offsetY);
					console.log($("input[type=hidden]", $(this).parent().parent()).val());
					return false;
				}