function more(more){
		var id = $(more).parent().attr("id"); 
		var current = findReq(id);
		alert(current.mHTML());
						    if($(more).parent().hasClass("open")){
						        $(more).parent().animate({"height":125}).removeClass("open");
							$("#more").remove();
						        $(more).html("More...");
						    }else{
						        $(more).parent().animate({"height":300}).addClass("open");
							 $(more).html("Less...");
							 $(more).parent().append(current.mHTML());
														    
}
						    e.preventDefault();
						}