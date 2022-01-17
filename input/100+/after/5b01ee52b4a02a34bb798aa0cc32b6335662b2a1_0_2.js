function(_tuneId){
				return function(event){
					
					// get resource search tool
					var optionsBox = $('#newSheetMusic').find('[name=resourceOptionsBox]');
					optionsBox.empty();
					addSearchOptions(optionsBox.get(0), 'newSheetMusic', tunesArr[_tuneId])
					
					var nsm = new FloatingContainer(null, null, $('#newSheetMusic').get(0));
					nsm.addContentElement($('#newSheetMusic').css({'height':500}).get(0));
					nsm.setTitle("<span style='color:lightgray'>Sheetmusic Search </span>");
					nsm.show(event, 1000, 500, 
						FC_CLOSE_ON_OUTSIDE_CLICK | FC_AUTO_POSITION_CENTER | FC_CLOSE_ON_ESC | FC_RESTORE_CONTENT_ELEM);
					return false;
				}
			}