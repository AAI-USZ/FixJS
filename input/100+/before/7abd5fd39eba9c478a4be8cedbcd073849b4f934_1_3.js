function() {
					tr.data('content').deleteFile();
					// update numbers displayed below row to be deleted.
					var rowIndex = tr[0].sectionRowIndex;
					var rows = tr.parent().children();
					for (var i = rowIndex+1; i < rows.length; i++){
						var tRow = rows[i];
						$(tRow).find('input.numbering').val(parseInt($(tRow).find('input.numbering').val())-1);
					}
					tr.remove();
					manifest.updateStatus(false);
					manifest.save();
					$( this ).dialog( "close" );
				}