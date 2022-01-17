function(){
			this.table.render(this.get('container'));
			this.get('container').prepend('<div>' +
											'<button class="save">Save</button>' + 
											'<button class="print">Print</button>' +
										'</div>');
		}