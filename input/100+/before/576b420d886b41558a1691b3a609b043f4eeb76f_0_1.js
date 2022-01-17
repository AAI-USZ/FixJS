function(catsToClear) {
      var $this = $(this),
          data = $this.data('onesearchbox');
      		catsToClear = catsToClear || [];
      
      function removeSelection(cat){
				var sel = data.options.selection;
				for (var i=0; i<sel.length; i++){
					if (!cat || sel[i].category === cat){ 
						$this.data('onesearchbox').options.selection.splice(i, 1);
						i--;
					}
				}
				
				if (cat) 
					$('li.' + catsToClear[j], $(data.options.tags)).remove();
				else $('li', $(data.options.tags)).remove(); 
			}
			
			if(!catsToClear.length){
				removeSelection();
			}
			else {
				for (var j=0; j< catsToClear.length; j++){
					removeSelection(catsToClear[j]);
				}
			}
			
			return this;
    }