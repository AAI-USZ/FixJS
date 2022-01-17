function(index, row) {
				console.log($table.one($.support.transition.end, $table.children('tbody').append(row)))
				row.sortText = null
			}