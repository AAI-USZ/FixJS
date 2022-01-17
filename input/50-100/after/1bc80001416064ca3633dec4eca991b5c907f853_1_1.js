function(key, val)
						{
							val = val.picture
							var img = $('<img src="' + val.thumb + '" rel="' + val.image + '" />');
							$('#redactor_image_box').append(img);
							$(img).click($.proxy(this.imageSetThumb, this));
							
						}