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
        var y = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y");
        var transform = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("transform");
        current_svg = array[1];
        $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y", y);
        $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("transform", transform);
        $(".tab_svg #"+current_svg).css("display", "block");
    
        var goTo = $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y");
        res = ((($($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr("y") - 20) / 90) % 3);
        console.log("nouveau res = "+ res);
        console.log("scroll:" + scroll);
        $(".overflow_svg").scrollTo(goTo, 1000, {axis:"y"});
    }