function () {
			var content, loadingBay, current = F.current,
				type = current.type;

			switch (type) {
			case 'inline':
			case 'ajax':
			case 'html':
				if (type === 'inline') {
					content = current.content.show().detach();

					if (content.parent().hasClass('fancybox-inner')) {
						content.parents('.fancybox-wrap').trigger('onReset').remove();
					}

					$(F.wrap).bind('onReset', function () {
						content.appendTo('body').hide();
					});

				} else {
					content = current.content;
				}

				if (current.autoSize) {
					loadingBay = $('<div class="fancybox-tmp"></div>').appendTo($("body")).append(content);

					current.width = loadingBay.outerWidth();
					current.height = loadingBay.outerHeight(true);

					content = loadingBay.children().detach();

					loadingBay.remove();
				}

				break;

			case 'image':
				content = current.tpl.image.replace('{url}', current.url);

				current.aspectRatio = true;
				break;

			case 'swf':
				content = current.tpl.swf.replace(/\{width\}/g, current.width).replace(/\{height\}/g, current.height).replace(/\{url\}/g, current.url);
				break;

			case 'iframe':
				content = current.tpl.iframe.replace('{url}', current.url).replace('{scrolling}', current.scrolling).replace('{rnd}', new Date().getTime());
				break;
			}

			if ($.inArray(type, ['image', 'swf', 'iframe']) > -1) {
				current.autoSize = false;
				current.scrolling = false;
			}

			F.current = current;

			F.inner.append(content);
		}