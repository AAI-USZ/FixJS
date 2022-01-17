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
				handle_text = function (link) {
					// show and spin progress indicator
					$('#progress_wrapper').removeClass('hidden').addClass('spinning');
					
					console.log('getting link from instapaper');
					hide_popover();
					ip.getArticle(link, instapaperText);
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
				handle_text($(that).attr('href'));
			}
		}