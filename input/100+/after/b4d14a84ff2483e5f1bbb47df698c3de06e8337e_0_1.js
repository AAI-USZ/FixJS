function cleanEditable($editable) {
		var $blocks = $editable.find('.aloha-captioned-image');
		var j = $blocks.length;
		var block;
		var $img;

		while (j) {
			block = BlockManager.getBlock($blocks[--j]);

			if (!block) {
				continue;
			}

			if (block.attr('aloha-captioned-image-tag') === 'img') {
				$img = block.$_image;

				$img.attr('src', block.attr('source'));

				var alt = block.attr('alt');
				var width = block.attr('width');
				var height = block.attr('height');
				var caption = block.attr('caption');
				var floating = block.attr('position');

				if (alt) {
					$img.attr('alt', alt);
				} else {
					$img.removeAttr('alt');
				}

				if (typeof width !== 'undefined') {
					$img.attr('width', width);
				} else {
					$img.removeAttr('width');
				}

				if (typeof height !== 'undefined') {
					$img.attr('height', height);
				} else {
					$img.removeAttr('height');
				}

				if (caption) {
					$img.attr('caption', caption);
				} else {
					$img.removeAttr('caption');
				}

				$img.attr('float',
					(!floating || 'none' === floating) ? '' : floating);

				$img.addClass('aloha-captioned-image');
				block.$element.replaceWith($img);
			} else {
				block.$element.html('')
				     .removeClass('aloha-captioned-image-hidden')
				     .removeClass('aloha-block');
			}
		}
	}