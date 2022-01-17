function(event) {
					var img = $(this),
						offsetX = event.pageX - img.offset().left,
						offsetY = event.pageY - img.offset().top;

					$("img.crosshair", img.parent()).css({
						marginLeft: offsetX - 16,
						marginTop: offsetY - 16
					});

					$("input[type=hidden]", img.closest('label')).val(Math.round(offsetX / ratio) + ',' + Math.round(offsetY / ratio));

					return false;
				}