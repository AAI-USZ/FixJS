function(e) {
		
		var obj = self.$masonry[0];
		var $obj = $(obj);
		
		//var mason = self.instance
		//var mason = $.data(self.$masonry[0], 'masonry');
		var mason = self.instance;
		if (!mason) return;
		
		var x = event.pageX;
		var y = event.pageY;

		var col = Math.max(0, Math.floor((x - $obj.offset().left)/mason.columnWidth));
		col = Math.min(mason.cols - 1, col);
			
		// Placeholder coordinates
		var phX = $obj.offset().left + col * mason.columnWidth;
		var phY = $obj.offset().top;
		
		var i, len;
		for (i=0, len=mason.colBricks[col].length; i<len; i++) {
			var block = mason.colBricks[col][i];
			
			// If the placeholder has to be before this block, break
			if (y < (block.offset().top + block.height()/2)) break;
			
			phY = block.offset().top + block.height() + 10;
		}
		self.destinationCol = col;
		self.destinationPos = i;
		
		var $ph = $('#block-placeholder');
		
		$ph.height($(self.obj).height());
		
		if (!$ph.length) {
			// Create the placeholder
			var ph = document.createElement('div');
			ph.setAttribute('id', 'block-placeholder');
			$(document.body).append(ph);
			
			$ph = $(ph);
		}
		
		var phHeight = $ph.outerHeight(true);

		// Update the placeholder if the position has changed.
		if ($ph.position().top != phY || $ph.position().left != phX) {
			$('#block-placeholder').css('top', phY + 'px').css('left', phX + 'px');
			$('.after-placeholder').each(function() {
				$(this).removeClass('after-placeholder');
				$(this).css('top', $(this).position().top - phHeight + 'px');
			});
			
			// Update the blocks after the placeholder (re-using i and len here)
			for (; i<len; i++) {
				var block = mason.colBricks[col][i];
				
				if (!block.hasClass('after-placeholder')) {
					block.css('top', block.position().top + phHeight + 'px');
					block.addClass('after-placeholder');
				}
			}
		}
	}