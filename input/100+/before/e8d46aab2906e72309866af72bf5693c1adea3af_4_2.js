function() {
		this.obj.removeClass(this.get('className'));
		if (jQuery.trim(this.obj.attr('class')) == '') {
			this.obj.removeAttr('class');
		}
		this.obj.removeAttr('contenteditable');
	//	this.obj.removeAttr('id');

		// unwrap the selectionLeft-div if available
		if (this.obj.parents('.' + this.get('classTableWrapper')).length){
			this.obj.unwrap();
		}

		// remove the selection row
		this.obj.find('tr.' + this.get('classSelectionRow') + ':first').remove();
		// remove the selection column (first column left)
		var that = this;
		jQuery.each(this.obj.context.rows, function(){
			jQuery(this).children('td.' + that.get('classSelectionColumn')).remove();
		});

		// remove the "selection class" from all td and th in the table
		this.obj.find('td, th').removeClass(this.get('classCellSelected'));

		this.obj.unbind();
		// wrap the inner html of the contentEditable div to its outer html
		for (var i = 0; i < this.cells.length; i++) {
			var Cell = this.cells[i];
			Cell.deactivate();
		}

		// remove editable span in caption (if any)
		this.obj.find('caption div').each(function() {
			jQuery(this).contents().unwrap();
		});

		// better unset ;-) otherwise activate() may think you're activated.
		this.isActive = false;
	}