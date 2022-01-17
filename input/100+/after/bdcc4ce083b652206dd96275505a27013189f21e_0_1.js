function(e){
					var pixelOffsetX = e.pageX - $(this).offset().left;
			        var pixelOffsetY = e.pageY - $(this).offset().top;

					var offsetX = (pixelOffsetX / imageWidth) * 100;
			        var offsetY = (pixelOffsetY / imageHeight) * 100;
					
					// var cursorSize = (3.2 * ratio) / 2;

					// $("img.crosshair", $(this).parent()).css({left: (offsetX - cursorSize) + '%', top: (offsetY - cursorSize) + '%'});
                    $("img.crosshair", $(this).parent()).css({marginLeft: pixelOffsetX - 16, marginTop: pixelOffsetY - 16});
					$("input[type=hidden]", $(this).parent().parent()).val(offsetX + ',' + offsetY);
					// console.log($("input[type=hidden]", $(this).parent().parent()).val());
					return false;
				}