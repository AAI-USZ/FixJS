function(jQuerySelection, parent, child){
    console.log("WHYYY");
    if(jQuerySelection.hasClass("Numbers") && jQuerySelection.children().length === 0){
	addClickableLiteralBoxHelper(jQuerySelection, new ExprNumber(), parent, child);
    }
    else if (jQuerySelection.hasClass("Strings")){
	addClickableLiteralBoxHelper(jQuerySelection, new ExprString(), parent, child);
    }
}