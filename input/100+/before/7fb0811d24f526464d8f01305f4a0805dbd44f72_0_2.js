function (event, that, loc_left) {
			var body_width = $('#content .body_text').width(),
				show_detail = function () {
					//bind_deselect();
					// highlight link
					$(that).addClass('selected');
					// make sure the view is scrolled to the top
					$('#detail_popover .content').scrollTop = 0;

					$('#detail_popover .content a').attr('target', '_blank');
					$('#detail_popover .content a').attr('rel', 'noreferrer');

					$('#detail_popover .content').removeClass('hidden');
				},
				handle_text = function (data) {
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
				},
				handle_footnote = function () {
					/*
					Footnotes popover based on FOOTNOTIFY bookmarklet.
					By Hans Petter Eikemo, http://openideas.ideon.co http://twitter.com/hpeikemo.
					No rights reserved, please use attribution if deriving on my work.
					Web: https://gist.github.com/1046538
					Heavily modified by Luke Hagan for PlainReader 2012-03-17, 2012-04-09
					*/
					var target = $(that),
						href = target.attr('href'),
						rel = href.split('#'),
						footnote_el,
						selectorRegExp = /[!"#\$%&'\(\)\*\+,\.\/:;<=>\?@\[\\\]\^`{\|}~]/g;

					if (rel.length >= 2) {
						rel = '#' + rel[1].replace(selectorRegExp,'\\$&');
						footnote_el = $(rel);
						if (footnote_el.length > 0) {
							$('#detail_popover .content').html(footnote_el.html());
							$('#detail_popover').css({ left: 56, width: body_width });
							$('#detail_popover .arrow').css({ right: body_width - loc_left - 3 });
							$('#detail_popover .content').css({ height: 'auto' });
							show_detail();
						} else {
							hide_popover();
						}
					}
				};

			if ($(that).parent().is('sup')) {
				handle_footnote();
			} else {
				$(event.target).parent().addClass('spinning');
				ip.getArticle($(that).attr('href'), handle_text);
			}
		}