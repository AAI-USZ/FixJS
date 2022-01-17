function(event) {
		var dropdown = $(event.target);
		var dropdownPos=dropdown.getPosition();
		var dropdownSize=dropdown.getSize();		

		var entry=dropdown.getParent().getParent();
		var entryPos=parseInt(entry.getParent().getStyle('left'));
		entryPos=isNaN(entryPos)?0:entryPos;
		
		dropdownBox=entry.getElement('.xEntryDropdownBox');
		var dropdownBoxSize=dropdownBox.getDimensions();
		
		dropdownBox.toggleClass('xVisible', true);

	
		if (dropdownBox.hasClass('xVisible')){

			dropdown.addClass('xEntryDropdowHover');
		
			var mainColumn_margin_padding=0;
			var mainColumn = $('mainColumn');
			
			if (mainColumn) {
				mainColumn_margin_padding = parseInt(mainColumn.getStyle('padding-left')) + parseInt(mainColumn.getStyle('margin-left'));
			}

            if(this.container.hasClass('xCentered')) {
                var dropdownBoxLeftPos = dropdownPos.x - dropdownBoxSize.width + parseInt(dropdownSize.x/2+1) - mainColumn_margin_padding - entryPos - ((window.getSize().x - this.container.getSize().x) / 2);
            } else {
                var dropdownBoxLeftPos = dropdownPos.x - dropdownBoxSize.width + parseInt(dropdownSize.x/2+1) - mainColumn_margin_padding - entryPos;
            }

			dropdownBox.setStyle('left', dropdownBoxLeftPos + 'px');
		}else{
			dropdown.removeClass('xEntryDropdowHover');
		}
	}