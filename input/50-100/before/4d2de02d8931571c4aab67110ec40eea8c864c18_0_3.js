function(e) {
				
				var x = e.offsetX, y = e.offsetY;
				var output = '';
				var region = getClickedKey(x, y);

				if(region)
				{
					toggleKeyboardRegion(region);
					drawKeyboard(canvasEl,context, divIndex);
				}
				
				var indxStr = highlightedIndexArrayToString(getHighlightedKeyIndexes(),divIndex); 
				output += "Selected Indexes: " + indxStr;

				canvasParaEl.innerHTML = output;

			}