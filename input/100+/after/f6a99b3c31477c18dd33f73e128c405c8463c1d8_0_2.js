function add_product_category(product_id, category_id){    
    var success = true;
    url = base_url + "category/add_product_category/" + product_id + "/" +category_id;
    jQuery.ajax({
        url: url,
        async: false,
        complete: function(objeto, exito){
            if(exito=="success"){
            }
        },
        error: function(objeto, quepaso, otroobj){
            success =  false;
        }
    });	
    $("#" + product_id).addClass(category_id.toString());
    $('.producto').children('.options-producto').fadeOut('normal');
    return success;
}