function( event, ui ) {
					    ui.item.option.selected = true;
					    self._trigger( "selected", event, {
						    item: ui.item.option
					    });
					    // Make sure it's white in case it wasn't
					    if($(this).css('background') == 'orange') $(this).css('background','white');
					    // Update date on select tech on modif CTRL when tech not selected
					    if(select.attr('id') == "technicien" && $('#CTRL').hasClass('modifCtrl') && prerempli){
						console.log("prerempli = "+prerempli);
						$("#CTRL #date").val(getFormatedDate());
						$("#CTRL #date").change();
					    }
				    }