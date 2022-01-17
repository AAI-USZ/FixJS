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

			//move selection of combo to All
			var $select = $('.ui-combobox').prev();
			$select.change(function() {
        var $this = $(this),
            $input = $this.next().children('input'),
            $el = $this.find('option:selected');
            
        $input.val($this.children(':selected').text());
        $input.trigger('autocompleteselect', {item: {label: $el.text(), option: $el[0], value: $el.val()}} );
			});
			
			$select.val('Todos').trigger('change');
			
			return this;
    }