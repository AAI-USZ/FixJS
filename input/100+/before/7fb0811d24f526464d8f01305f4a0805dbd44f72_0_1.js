function (data) {
					$('#detail_popover .content').css({ 'margin-top': -10 });
					// remove images from content
					$('img', $(data.title)).remove();
					$('img', $(data.article)).remove();

					$('#detail_popover .toolbar .title').html(data.title);
					$('#detail_popover .toolbar .title').removeClass('hidden');
					$('#detail_popover .content').html(data.article);

					// stop spinning
					$(event.target).parent().removeClass('spinning');

					console.log('previewing link');

					$('#detail_popover').animate({ left: 56, width: body_width }, { duration: 750, complete: function () {
						show_detail();
						$('#detail_popover .content').animate({ height: 75 }, { duration: 750 });
					}});
					$('#detail_popover .arrow').animate({ right: body_width - loc_left }, { duration: 750 });
				}