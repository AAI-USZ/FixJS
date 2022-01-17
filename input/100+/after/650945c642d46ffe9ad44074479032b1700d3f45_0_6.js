function(e){
			// optgroup label toggle support
			if(cssColorToHex($(this).css("color")) == "#ffffff")
			{
				$(this).css("color", "rgb(255,144,0)");
			}
			else
			{
				$(this).css("color", "rgb(255,255,255)");
			}

			var $checkboxes = $(this).parent().nextUntil('li.ui-multiselect-optgroup-label').find('input');

			$options.trigger('toggleChecked', [ ($checkboxes.filter(':checked').length === $checkboxes.length) ? false : true, $checkboxes]);
			o.onOptgroupToggle.call(this, $checkboxes.get());
			e.preventDefault();
		}