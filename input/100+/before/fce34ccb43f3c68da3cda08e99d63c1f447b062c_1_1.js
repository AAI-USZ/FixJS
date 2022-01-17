function(ed, o) {
				var content = $(o.content);

				content.find('img').filter(function() {
					return $(this).data('mediaId') || ($(this).data('media') || {}).id;// || $(this).attr('src').substr(0, 12) == 'nos://media/';
				}).replaceWith(function() {
					var $img = $(this);
					var media = $img.data('media');
                    var media_id = (media && media.id) ? media.id : $img.data('media-id');
					var src = 'nos://media/' + media_id;

					if ($img.attr('width') && $img.attr('height')) {
						src += '/' + $img.attr('width') + '/' + $img.attr('height');
					}
					var $new_img = $('<img />').attr({
						src:    src,
						title:  $img.attr('title'),
						alt:    $img.attr('alt'),
						style:  $img.attr('style')
					});
                    return $new_img;
				});
				o.content = $('<div></div>').append(content).html();
			}