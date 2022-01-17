function createFilter(el, hide, options){
    console.log("Create filter init");
    
    var line = $(el).parent("li");
    
    if(hide == true){
        line.addClass("hidden");
    }
  
    var uniqueid = calculateUniqueFilterId();
    var newitem = $('<li>').attr('class', 'filterline').append($("#filterdummyline").html());
    
    if(hide == true){
    	line.after(newitem);
    } else {
    	line.before(newitem);
    }
    
    
    
    newitem.find(".uniquefilterid").val(uniqueid);
    newitem.find(".filterdummy").val(line.find(".filterselect").val());
    updateOptions(newitem.find(".filterdummy"), options);
    
    if(hide == true){
        newitem.removeClass("hidden");
        line.find("select").val("");
    } else {
        newitem.slideDown();
    }

    return false;
}