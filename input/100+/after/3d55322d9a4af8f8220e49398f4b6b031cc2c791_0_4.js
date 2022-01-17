function(attributesLong, id, rowData, parentSettings) {
			//console.log(rowData);
			var headRow = $('<tr>');
			var bodyRow = $('<tr>');
			var settings = {
				prefix: parentSettings.prefix + rowData.name+'.0.',
				namePrefix: rowData.name+'.0.'
			};
			$(rowData.columns).each( function() {
				this.classes = ''
				headRow.append('<th>'+this.label+(this.mandatory ? '<span class="mandatory">*</span>' : '')+'</th>');
				var input = $('<td class="control-group">').append(formJs.makeInput(this, settings));
				bodyRow.append(input);
			});
			
			var table = $('<table class="table table-striped table-bordered" id="'+rowData.id+'"><thead></thead></table>');
			table.find('thead').html(headRow);
			var tbody = $('<tbody>').html(bodyRow);
			table.append(tbody);
			// Set values if set + add more rows if necessary
			$(rowData.columns).each( function() {
				if (this.values && this.values.length) {
					var column = this;
					$(this.values).each( function(key, val) {
						var name = column.name.replace(/\.[0-9]+\./, '.'+key+'.');
						var input = tbody.find(':input[name="'+name+'"]');
						var i = 0;
						while (!input.length && i++ < 100) {
							formJs.addChildRow(table);
							input = tbody.find(':input[name="'+name+'"]');
						}
						input.val(val);
					});
				}
			});
			
			var row = $('<div>').html(table);
			row.append('<div style="float:right;margin-top:-14px;">\
				<a href="javascript:void(0)" onclick="formJs.addChildRow(\'#'+rowData.id+'\');" class="btn btn-mini" style="width:10px;">+</a>\
				<a href="javascript:void(0)" onclick="formJs.removeChildRow(\'#'+rowData.id+'\');" class="btn btn-mini" style="margin-left:1px;width:10px;">-</a>\
			</div>');
			return row;
		}