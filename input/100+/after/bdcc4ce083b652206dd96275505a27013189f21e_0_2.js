function(e){
					var offsetX = e.pageX - $(this).offset().left;
					var offsetY = e.pageY - $(this).offset().top;
					$("img.crosshair", $(this).parent()).css({marginLeft: offsetX - 16, marginTop: offsetY - 16});
					$("input[type=hidden]", $(this).parent().parent()).val(Math.round(offsetX / ratio) + ',' + Math.round(offsetY / ratio));
					// console.log($("input[type=hidden]", $(this).parent().parent()).val());
					return false;
				}