function( event, ui ) {
					    ui.item.option.selected = true;
					    self._trigger( "selected", event, {
						    item: ui.item.option
					    });
					    // Make sure it's white in case it wasn't
					    $(this).css('background','white');
					    if(select.attr('id') == "technicien"){
						console.log("prerempli = "+prerempli);
						var today = new Date();
						today = today.getDate() + today.getFullYear().toString().slice(2) + '-' + (today.getMonth() + 1) + '-' + today.getDate();
						$("#CTRL #date").val(today); 
					    }

				    }