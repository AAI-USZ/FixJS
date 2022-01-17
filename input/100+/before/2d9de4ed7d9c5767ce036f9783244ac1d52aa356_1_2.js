function(input){

        var rows = [];

		var row = input.getParent('.formRow');
			rowClone = row.clone(true, true),
			add = function(event){
				event.preventDefault();

				var newRow = rowClone.clone(true, true),
					inputID = String.uniqueID(),
					label = newRow.getElement('label');

				newRow.getElement('input').set('id', inputID).grab(new Element('a.delInputRow', {
					text: 'x',
					events: {click: function(event){
						event.preventDefault();
						newRow.destroy();
					}}
				}), 'after');

				if (label) label.set('for', inputID);
				newRow.inject(row, 'after');
                rows.push(newRow);
			};

		new Element('a.addInputRow', {
			text: '+',
			events: {click: add}
		}).inject(input, 'after');

        this.reset = function() {
            for (var i = 0; i < rows.length; i++) {
                rows[i].destroy();
            }
            rows = [];
        };

	}