function(attributesLong, id, rowData) {
			var headRow = $('<tr>');
			var bodyRow = $('<tr>');
			var idx = 0;
			$(rowData.columns).each( function() {
				headRow.append('<th>'+this.label+'</th>');
				bodyRow.append('<td class="formJs-input"><input type="text" name="'+rowData.name+'.'+idx+'.'+this.name+'"></td>');
			});
			var table = $('<table class="table table-striped table-bordered"><thead></thead><tbody></tbody></table>');
			table.find('thead').html(headRow);
			table.find('tbody').html(bodyRow);
			return table;
		}