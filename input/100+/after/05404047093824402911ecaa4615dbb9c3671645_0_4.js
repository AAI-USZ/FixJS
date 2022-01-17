function( event, ui ) {
					    ui.item.option.selected = true;
					    self._trigger( "selected", event, {
						    item: ui.item.option
					    });
					    // Make sure it's white in case it wasn't
					    $(this).css('background','white');
					    // Update date on select tech on modif CTRL when tech not selected
					    if(select.attr('id') == "technicien" && $('#CTRL').hasClass('modifCtrl') && prerempli){
						console.log("prerempli = "+prerempli);
						var today = new Date();
						var month = today.getMonth() + 1;
						if(month < 10) month = "0" + month.toString();
						today = today.getDate()  + '-' + month + '-' + today.getFullYear();
						$("#CTRL #date").val(today);
					    }
				    }