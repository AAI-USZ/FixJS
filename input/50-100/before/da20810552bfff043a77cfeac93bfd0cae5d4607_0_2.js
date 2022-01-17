function(){
		// deselectionner l'onglet selectionné
		$(".onglets_selected")
			.removeClass('onglets_selected')
		// sélectionner l'onglet sur lequel on a cliqué
		$(this)
			.addClass('onglets_selected')

        var id = $(this).attr("id");
        var array = id.split('_');
        $(".tab_svg #"+current_svg).css("display", "none");
      
        current_svg = array[1];
        
        $(".tab_svg #"+current_svg).css("display", "block");   
        onglet = true;
    }