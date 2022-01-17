function(event) {
					var $img = $(this),
						pixelOffsetX = event.pageX - $img.offset().left,
						pixelOffsetY = event.pageY - $img.offset().top;

					var offsetX = (pixelOffsetX / imageWidth) * 100,
						offsetY = (pixelOffsetY / imageHeight) * 100;

					$("img.crosshair", $img.parent()).css({
						marginLeft: pixelOffsetX - 16,
						marginTop: pixelOffsetY - 16
					});

					$("input[type=hidden]", $img.closest('label')).val(offsetX + ',' + offsetY);

					return false;
				}