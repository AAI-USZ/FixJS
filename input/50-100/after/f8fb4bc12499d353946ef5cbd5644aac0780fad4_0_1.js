function(){

			// Uncheck all selected, and remove selected class.
			$('.facet-choice input[type=checkbox]:checked', $(this.el)).each(function(i,e){
				$(e).prop('checked', false);
				choice_id = $(e).data('choice_id');
				facet_choice_el = $('#facet-choice--' + choice_id);
				facet_choice_el.removeClass('selected');
			});
			this.selected_choices = {};
			this.updateFilters();
		}