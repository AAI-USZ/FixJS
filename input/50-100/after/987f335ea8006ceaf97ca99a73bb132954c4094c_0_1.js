function(jQuerySelection, parent, child){
    console.log("WHYYY");
    if (jQuerySelection.children().length === 0){
	if(jQuerySelection.hasClass("Numbers")){
	    addClickableLiteralBoxHelper(jQuerySelection, new ExprNumber(), parent, child);
	}
	else if (jQuerySelection.hasClass("Strings")){
	    addClickableLiteralBoxHelper(jQuerySelection, new ExprString(), parent, child);
	}
    }
}