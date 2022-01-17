function(element){
    var selectedPrice;
    var childProducts = this.config.childProducts;
    
    try {
        //Don't update elements that have a selected option
        if(element.options[element.selectedIndex].config){
            return;
        }
    } catch(e){}

    for(var i=0;i<element.options.length;i++){
        if(element.options[i].config){
            var cheapestPid = this.getProductIdOfCheapestProductInScope("finalPrice", element.options[i].config.allowedProducts);
            var mostExpensivePid = this.getProductIdOfMostExpensiveProductInScope("finalPrice", element.options[i].config.allowedProducts);
            var cheapestFinalPrice = childProducts[cheapestPid]["finalPrice"];
            var mostExpensiveFinalPrice = childProducts[mostExpensivePid]["finalPrice"];
            element.options[i].text = this.getOptionLabel(element.options[i].config, cheapestFinalPrice, mostExpensiveFinalPrice);
        }
    }
}