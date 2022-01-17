function (ev, ui) {
		var $target = $(this).data().sortable.currentItem;
		var $source = $(ui.sender);
		$target.data('z_sort_tag', $source.data('z_drag_tag')); 
	}